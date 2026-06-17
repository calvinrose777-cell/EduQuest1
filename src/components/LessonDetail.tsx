import React, { useState } from "react";
import { 
  ArrowLeft, 
  Video, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Award, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  ChevronRight, 
  ExternalLink 
} from "lucide-react";
import { Student, Lesson, QuizAttempt, Question } from "../types";

interface LessonDetailProps {
  lesson: Lesson;
  student: Student;
  quizAttempts: QuizAttempt[];
  onBack: () => void;
  onSaveQuizAttempt: (lessonId: string, score: number, answers: number[]) => void;
  onLaunchMeet: (meetEvent: any) => void;
}

export default function LessonDetail({ 
  lesson, 
  student, 
  quizAttempts, 
  onBack, 
  onSaveQuizAttempt,
  onLaunchMeet 
}: LessonDetailProps) {
  // Check if they previously passed/answered this quiz
  const pastAttempt = quizAttempts.find((a) => a.lessonId === lesson.id);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(
    pastAttempt 
      ? lesson.questions.reduce((acc, q, idx) => ({ ...acc, [q.id]: pastAttempt.answers[idx] }), {})
      : {}
  );
  const [isSubmitted, setIsSubmitted] = useState(pastAttempt !== undefined);
  const [currentScore, setCurrentScore] = useState(pastAttempt ? pastAttempt.score : 0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Form selections handler
  const handleSelectAnswer = (questionId: string, optionIdx: number) => {
    if (isSubmitted && pastAttempt) return; // Prevent altering already submitted answers unless retrying
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIdx
    });
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check: Make sure all questions are answered
    const unanswered = lesson.questions.some((q) => selectedAnswers[q.id] === undefined);
    if (unanswered) {
      alert("Please answer all the questions in the lesson assessment before submitting!");
      return;
    }

    // Calculate score
    let correctCount = 0;
    const answersArray: number[] = [];

    lesson.questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      answersArray.push(selected);
      if (selected === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / lesson.questions.length) * 100);
    setCurrentScore(calculatedScore);
    setIsSubmitted(true);

    // Save to server/localStorage registry
    onSaveQuizAttempt(lesson.id, calculatedScore, answersArray);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentScore(0);
    setShowExplanation(false);
  };

  // Convert raw text with paragraphs and lists to custom styled nodes
  const renderTextParagraphs = (rawText: string) => {
    const blocks = rawText.split("\n\n");
    return blocks.map((block, bIdx) => {
      if (block.startsWith("- ") || block.startsWith("1. ") || block.startsWith("2. ") || block.startsWith("3. ") || block.startsWith("4. ")) {
        // List rendering
        const lines = block.split("\n");
        return (
          <ul key={bIdx} className="list-disc pl-5 my-3 space-y-1 text-slate-750 bg-slate-50/50 p-3.5 rounded-lg border border-slate-200">
            {lines.map((l, lIdx) => (
              <li key={lIdx} className="text-xs leading-relaxed">
                {l.replace(/^-\s+|^[0-9]+\.\s+/, "")}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={bIdx} className="text-xs leading-relaxed text-slate-600 mb-3 first-letter:float-left first-letter:text-2xl first-letter:font-sans first-letter:font-extrabold first-letter:text-emerald-600 first-letter:mr-1 first-letter:bg-clip-text">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Back Header Bar */}
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-1 cursor-pointer text-[10px] font-bold font-mono text-slate-500 hover:text-emerald-600 transition-all uppercase tracking-widest"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
        <span>Return to Lesson Directory</span>
      </button>

      {/* Grid of Lesson Body + Sidebar for Quick-Meet / Quiz scoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Lesson Articles Text Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
            
            {/* Header badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-[9px] text-emerald-700 font-bold border border-emerald-100 uppercase tracking-widest font-mono">
                {lesson.topic}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>{lesson.duration} tracks</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-2.5 font-sans text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {lesson.title}
            </h1>
            
            {/* Short review statement */}
            <p className="mt-2 text-xs text-slate-600 bg-slate-50 border-l-2 border-emerald-600 pl-3 py-1.5 max-w-3xl rounded-r font-sans leading-relaxed">
              <span className="font-bold text-slate-800 uppercase text-[9px] block mb-0.5 tracking-wider font-mono">Executive Summary:</span>
              "{lesson.summary}"
            </p>

            {/* Custom Paragraph contents rendering */}
            <div className="mt-4 border-t border-slate-100 pt-4 prose prose-slate max-w-none">
              {renderTextParagraphs(lesson.content)}
            </div>

          </div>
        </div>

        {/* Right Column: Simulated Live Meets & Study Assessments */}
        <div className="space-y-4">
          
          {/* Quick Simulated Class Meet Widget */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-xs">
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-emerald-600 text-white">
                <Video className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5 text-left">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Class Live Seminar</h3>
                <p className="text-[10px] text-slate-500 font-mono font-semibold">{lesson.meetTime}</p>
              </div>
            </div>

            <p className="mt-2.5 text-[11px] text-slate-500 leading-relaxed font-normal">
              Need peer support or teacher coaching? Meet with classmates directly in our live cyber meeting room.
            </p>

            <button
              onClick={() => onLaunchMeet({
                title: lesson.title,
                time: lesson.meetTime,
                duration: lesson.duration,
                lessonId: lesson.id,
                gradeId: student.gradeId
              })}
              className="mt-3.5 w-full cursor-pointer select-none py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-1 font-mono tracking-wide"
            >
              <span>Launch Live Lesson Meet</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Interactive automated marked quiz */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-1.5 mb-3.5 pb-2 border-b border-slate-105 border-slate-100">
              <Award className="h-4.5 w-4.5 text-slate-500" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">
                Lesson Quiz Answers
              </h3>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmitQuiz} className="space-y-3.5">
                {lesson.questions.map((question, qIdx) => (
                  <div key={question.id} className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-800 leading-tight font-sans">
                      Q{qIdx + 1}. {question.text}
                    </p>
                    
                    <div className="space-y-1">
                      {question.options.map((option, optIdx) => {
                        const isSelected = selectedAnswers[question.id] === optIdx;
                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectAnswer(question.id, optIdx)}
                            className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                              isSelected 
                                ? "border-emerald-605 border-emerald-605 bg-emerald-50/20 font-semibold text-emerald-800" 
                                : "border-slate-150 border-slate-100 bg-slate-50 hover:bg-slate-100/85 text-slate-650"
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-mono shrink-0 leading-none ${
                              isSelected ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-300 text-slate-450 bg-white"
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="font-sans text-[11.5px] text-slate-700">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
 
                <button
                  type="submit"
                  className="mt-4.5 w-full py-1.5 cursor-pointer select-none rounded bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  Submit Quiz Answers
                </button>
              </form>
            ) : (
              // Quiz Submission Results Section
              <div className="space-y-4 font-sans">
                <div className="text-center bg-slate-50 rounded-lg p-3.5 border border-slate-200 relative overflow-hidden">
                  {currentScore === 100 && (
                    <div className="absolute inset-0 pointer-events-none bg-emerald-500/5 animate-pulse"></div>
                  )}

                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-xs mb-1.5 border border-slate-100">
                    {currentScore === 100 ? (
                      <Sparkles className="h-5 w-5 text-emerald-505 text-emerald-600 animate-spin" />
                    ) : (
                      <Award className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>

                  <div className="text-[9px] font-bold font-mono uppercase tracking-widest text-slate-400">
                    Grading Performance
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
                    {currentScore}%
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500 font-sans">
                    {currentScore === 100 
                      ? "🏆 Flawless Score! Perfect Lesson Cleanse." 
                      : currentScore >= 50 
                      ? "👍 Passed! Good effort on this assessment." 
                      : "📖 Retake the text content to perfect your grade."}
                  </p>
                </div>

                {/* Score breakdown review */}
                <div className="space-y-2">
                  {lesson.questions.map((question, qIdx) => {
                    const selected = selectedAnswers[question.id];
                    const isCorrect = selected === question.correctAnswer;
                    return (
                      <div key={question.id} className="p-2.5 rounded-lg border border-slate-150/50 bg-slate-50/20 text-xs text-left">
                        <div className="flex items-start justify-between gap-1.5">
                          <p className="font-bold text-slate-800 leading-tight">
                            Q{qIdx + 1}. {question.text}
                          </p>
                          {isCorrect ? (
                            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                          )}
                        </div>

                        <div className="mt-2 space-y-1 font-medium font-mono text-[10px]">
                          <div className={`p-1 rounded ${
                            isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-rose-50/50 text-rose-800"
                          }`}>
                            Your Answer: {question.options[selected] || "Unanswered"}
                          </div>
                          {!isCorrect && (
                            <div className="p-1 rounded bg-slate-100 text-slate-600">
                              Correct Answer: {question.options[question.correctAnswer]}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-1.5 mt-1">
                  <button
                    onClick={handleResetQuiz}
                    className="w-full py-1.5 cursor-pointer select-none rounded border border-slate-200 hover:bg-slate-50 text-slate-605 text-[11px] font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 text-slate-600"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Try Quiz Again</span>
                  </button>
                  <button
                    onClick={onBack}
                    className="w-full py-1.5 cursor-pointer select-none rounded bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                  >
                    <span>Proceed to Course List</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
