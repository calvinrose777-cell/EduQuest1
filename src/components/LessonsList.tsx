import React, { useState } from "react";
import { BookOpen, Search, Clock, CheckCircle, Award, ChevronRight, Bookmark } from "lucide-react";
import { Student, Lesson, QuizAttempt } from "../types";
import { GRADES_LIST, LESSONS_DATA } from "../data/lessons";

interface LessonsProps {
  student: Student;
  quizAttempts: QuizAttempt[];
  onSelectLesson: (lessonId: string) => void;
}

export default function LessonsList({ student, quizAttempts, onSelectLesson }: LessonsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const currentGrade = GRADES_LIST.find((g) => g.id === student.gradeId) || GRADES_LIST[0];
  const allLessons = LESSONS_DATA[student.gradeId] || [];

  // Completed lessons checklist
  const completedLessonIds = quizAttempts.map((attempt) => attempt.lessonId);

  // Filter lessons based on search query
  const filteredLessons = allLessons.filter((lesson) => {
    const query = searchQuery.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(query) ||
      lesson.topic.toLowerCase().includes(query) ||
      lesson.summary.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      
      {/* Grade Level Title Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono">Current Syllabus</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-50 text-[9px] text-emerald-700 font-bold border border-slate-200 uppercase tracking-widest font-mono">
              10 Lesson Blocks
            </span>
          </div>
          <h2 className="mt-0.5 font-sans text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
            {currentGrade.name}
          </h2>
          <p className="mt-0.5 text-xs text-slate-550 max-w-xl leading-relaxed">
            {currentGrade.description}
          </p>
        </div>

        {/* Study Completion Badge */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/60 p-2.5 rounded-lg shrink-0 text-left">
          <div className="h-8 w-8 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-mono font-bold text-xs shrink-0">
            {completedLessonIds.length}
          </div>
          <div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono">Progress Badge</div>
            <div className="text-xs font-bold text-slate-800">
              {completedLessonIds.length === 10 ? "🎓 Graduate!" : `${10 - completedLessonIds.length} Chapters Remaining`}
            </div>
          </div>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <Search className="h-3.5 w-3.5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search lessons by keywords (e.g. 'jupiter', 'photosynthesis')..."
          className="w-full rounded border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-emerald-600"
        />
      </div>

      {/* Lessons Grid list */}
      {filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredLessons.map((lesson, idx) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const correspondingAttempt = quizAttempts.find((a) => a.lessonId === lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className="group select-none relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-350 hover:shadow-xs transition-all cursor-pointer duration-200 text-left"
              >
                <div>
                  
                  {/* Card Header progress tracker */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-dashed border-slate-200/60 mb-3">
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50/50 px-1.5 py-0.5 rounded border border-emerald-100 font-mono">
                      <Bookmark className="h-2.5 w-2.5" />
                      <span>{lesson.topic}</span>
                    </span>
                    
                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 font-mono uppercase tracking-widest">
                        <CheckCircle className="h-3 w-3" />
                        <span>Score: {correspondingAttempt?.score}%</span>
                      </div>
                    ) : (
                      <span className="text-[9px] text-slate-500 font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 font-mono uppercase tracking-wider">
                        CH {idx + 1}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-100 text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed font-normal">
                    {lesson.summary}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  {/* Meet indicator and period */}
                  <span className="flex items-center gap-1 text-[10px] font-bold font-mono uppercase text-slate-400 tracking-wider">
                    <Clock className="h-3 w-3" />
                    <span>{lesson.duration}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-widest font-mono group-hover:translate-x-0.5 transition-transform">
                    <span>Study Chapter</span>
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center bg-white border border-slate-200 rounded-lg py-10 px-4">
          <p className="text-slate-400 text-xs font-sans">No lessons match your search keyword. Try something else!</p>
          <button 
            onClick={() => setSearchQuery("")}
            className="mt-3.5 cursor-pointer select-none text-[10px] font-bold font-mono uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            Clear Search Filter
          </button>
        </div>
      )}

    </div>
  );
}
