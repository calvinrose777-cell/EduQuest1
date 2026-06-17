import React, { useState } from "react";
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  Video, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Percent, 
  MessageSquare, 
  Smile, 
  Volume2, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  UserPlus, 
  VolumeX, 
  Share2, 
  Send
} from "lucide-react";
import { Student, Lesson, QuizAttempt, ActiveMeetEvent } from "../types";
import { GRADES_LIST, LESSONS_DATA, MOCK_MEET_EVENTS } from "../data/lessons";

interface DashboardProps {
  student: Student;
  quizAttempts: QuizAttempt[];
  onSelectLesson: (lessonId: string) => void;
}

export default function Dashboard({ student, quizAttempts, onSelectLesson }: DashboardProps) {
  const [activeMeetSimulation, setActiveMeetSimulation] = useState<ActiveMeetEvent | null>(null);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: "Teacher Sarah", text: "Welcome to today's interactive session! Let me know if you can hear me.", time: "10:02 AM" },
    { sender: "Emma Lee (Classmate)", text: "Good morning! Clear audio on my end.", time: "10:03 AM" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const currentGrade = GRADES_LIST.find((g) => g.id === student.gradeId) || GRADES_LIST[0];
  const lessonsForGrade = LESSONS_DATA[student.gradeId] || [];

  // Computed metrics
  const completedLessonIds = quizAttempts.map((attempt) => attempt.lessonId);
  const totalCompleted = lessonsForGrade.filter((l) => completedLessonIds.includes(l.id)).length;
  const attemptedQuizzesCount = quizAttempts.length;

  const averageScore = attemptedQuizzesCount > 0 
    ? Math.round(quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / attemptedQuizzesCount) 
    : 0;

  const perfectScores = quizAttempts.filter((a) => a.score === 100).length;

  // Personalized Advice from Advisor
  const getAdvisorMessage = () => {
    if (totalCompleted === 0) {
      return {
        title: "Ready for Lift-off!",
        text: `Welcome to the academy, ${student.fullName}! Your adventure starts today. We recommend beginning with Lesson 1: "${lessonsForGrade[0]?.title || 'Introduction'}" to set a stellar foundation.`,
        actionLabel: "Start First Lesson",
        actionLessonId: lessonsForGrade[0]?.id
      };
    } else if (totalCompleted < 5) {
      const nextUnfinished = lessonsForGrade.find((l) => !completedLessonIds.includes(l.id));
      return {
        title: "Tremendous Momentum!",
        text: `You are making superb progress, ${student.fullName}! You have wrapped up ${totalCompleted} lessons already. Let's build onward. Next recommended is "${nextUnfinished?.title || 'Next'}"`,
        actionLabel: "Keep Going",
        actionLessonId: nextUnfinished?.id
      };
    } else if (totalCompleted < 10) {
      const nextUnfinished = lessonsForGrade.find((l) => !completedLessonIds.includes(l.id));
      return {
        title: "Almost there: Peak Perfection!",
        text: `Unbelievable focus! You are more than halfway through. Just ${10 - totalCompleted} lessons left to earn your Grade Graduation Badge. Let's tackle "${nextUnfinished?.title || 'Next'}"!`,
        actionLabel: "Resume Study",
        actionLessonId: nextUnfinished?.id
      };
    } else {
      return {
        title: "Graduation Masterclass Achievement!",
        text: `Outstanding! You have completed all 10 lessons for ${currentGrade.name}. Your quizzes are fully marked and scored with an average of ${averageScore}%. Explore another grade or review your stars!`,
        actionLabel: "Review Lesson 1",
        actionLessonId: lessonsForGrade[0]?.id
      };
    }
  };

  const advisor = getAdvisorMessage();

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages([
      ...chatMessages,
      { sender: `${student.fullName} (You)`, text: chatInput.trim(), time: timeStr }
    ]);
    setChatInput("");

    // Simulate teacher fast friendly response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { 
          sender: "Teacher Sarah", 
          text: `Great point, ${student.fullName}! Let's examine that closely in our slides next.`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }, 1200);
  };

  const getAccentClass = (color: string) => {
    switch (color) {
      case "emerald": return "from-emerald-50 to-emerald-100/30 text-emerald-850 border-emerald-100 bg-emerald-600 ring-emerald-500/10 hover:bg-emerald-700";
      case "amber": return "from-amber-50 to-amber-100/30 text-amber-850 border-amber-100 bg-amber-600 ring-amber-500/10 hover:bg-amber-600";
      default: return "from-emerald-50 to-emerald-100/30 text-emerald-850 border-emerald-100 bg-emerald-600 ring-emerald-500/15 hover:bg-emerald-700";
    }
  };

  const activeAccent = getAccentClass(currentGrade.accentColor);

  return (
    <div className="space-y-4">
      
      {/* 1. Welcome Card Banner */}
      <div className="relative rounded-xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-5 text-white border border-slate-800 shadow-sm overflow-hidden animate-fade-in">
        {/* Absolute Background Circles */}
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/5 blur-lg"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 tracking-wider uppercase border border-emerald-500/20 font-mono font-bold">
              <Sparkles className="h-3 w-3 text-emerald-450" />
              <span>Registered Student Portal</span>
            </div>
            <h2 className="mt-2 font-sans text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-250 via-slate-100 to-white">{student.fullName}</span>
            </h2>
            <p className="mt-1 text-xs text-slate-350 max-w-xl">
              Academic course tracks in <span className="font-semibold text-emerald-400">{currentGrade.name}</span>. Explore classes, launch cyber meets, and auto-mark final queries.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2 backdrop-blur-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600 text-white font-bold text-sm ring-2 ring-emerald-500/20">
              {student.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="text-left font-mono">
              <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">STUDENT</div>
              <div className="text-xs font-bold text-white max-w-[120px] truncate">{student.fullName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bento Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in">
        
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs hover:shadow-sm transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Lesson Progress</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100/50 text-emerald-700 border border-emerald-250/20">
              <CheckCircle className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <h3 className="text-xl font-bold font-mono text-slate-900">{totalCompleted} <span className="text-xs font-normal text-slate-400 font-mono">/ 10</span></h3>
            <div className="mt-1.5 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full transition-all duration-550" style={{ width: `${(totalCompleted / 10) * 100}%` }}></div>
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400 font-medium">Completed this grade level</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs hover:shadow-sm transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Quizzes Taken</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100/50 text-emerald-700 border border-emerald-250/20">
              <BookOpen className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <h3 className="text-xl font-bold font-mono text-slate-900">{attemptedQuizzesCount} <span className="text-xs font-normal text-slate-400 font-mono">Attempts</span></h3>
            <div className="mt-1.5 text-[10px] font-semibold text-emerald-600 flex items-center gap-1 font-mono">
              <span>Auto-Marked Live</span>
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400 font-medium">Automatic instant marking</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs hover:shadow-sm transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Average Mark</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100/50 text-emerald-700 border border-emerald-250/20">
              <Percent className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <h3 className="text-xl font-bold font-mono text-slate-900">{averageScore}%</h3>
            <div className="mt-1.5 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${averageScore}%` }}></div>
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400 font-medium font-sans font-semibold">Grade Point Average</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs hover:shadow-sm transition-all duration-300 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Star Badges</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-100/50">
              <Award className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <h3 className="text-xl font-bold font-mono text-slate-900">{perfectScores} <span className="text-xs font-normal text-slate-400 font-mono font-bold">Clears</span></h3>
            <div className="mt-1.5 flex gap-0.5 items-center">
              {Array.from({ length: Math.min(5, perfectScores || 1) }).map((_, i) => (
                <Award 
                  key={i} 
                  className={`h-4 w-4 ${perfectScores > 0 ? "text-amber-500" : "text-slate-200"} fill-current`} 
                />
              ))}
              {perfectScores === 0 && <span className="text-[9px] text-slate-400 font-medium ml-1 font-mono">Score 100% on a quiz!</span>}
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400 font-medium font-semibold">100% Correct Quiz responses</p>
          </div>
        </div>

      </div>

      {/* Main Core Layout: Left Side (Advisory + Lessons), Right Side (Meets Calendar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Advisor and study progression */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Advisor Widget */}
          <div className="rounded-xl border border-slate-200 bg-slate-550/10 bg-slate-50 p-4 md:p-5 shadow-xs hover:shadow-inner transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-bold ring-2 ring-emerald-500/10">
                <Smile className="h-5 w-5" id="advisor-avatar" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Academic Coach</h4>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest font-mono">Status Active</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-sans mt-0.5">{advisor.title}</h3>
                <p className="text-xs text-slate-605 text-slate-600 leading-relaxed mt-1">{advisor.text}</p>
                
                {advisor.actionLessonId && (
                  <button
                    onClick={() => onSelectLesson(advisor.actionLessonId!)}
                    className="mt-2.5 inline-flex items-center gap-1 cursor-pointer select-none rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 px-3 py-1.5 text-[11px] font-semibold shadow-xs transition-all active:scale-[0.98]"
                  >
                    <span>{advisor.actionLabel}</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Rapid Lesson Finder list */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2 uppercase tracking-wide">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-50 text-slate-500 border border-slate-250/20">
                <BookOpen className="h-3.5 w-3.5" />
              </span>
              <span>Your Curriculum ({lessonsForGrade.length} Study Tracks)</span>
            </h3>

            <div className="max-h-[350px] overflow-y-auto pr-1 divide-y divide-slate-100 space-y-1 custom-scrollbar">
              {lessonsForGrade.map((lesson, idx) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const correspondingAttempt = quizAttempts.find((a) => a.lessonId === lesson.id);
                return (
                  <div 
                    key={lesson.id} 
                    onClick={() => onSelectLesson(lesson.id)}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-150/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-bold font-mono leading-none ${
                        isCompleted 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {idx + 1}
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-750 group-hover:text-emerald-600 transition-all">
                            {lesson.title}
                          </p>
                          {isCompleted && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1 py-0.2 text-[8px] font-bold font-mono text-emerald-700">
                              Pass ({correspondingAttempt?.score}%)
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{lesson.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-slate-350 group-hover:text-slate-600 transition-all">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] font-mono">{lesson.duration}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Meets & Calendar */}
        <div className="space-y-4">
          
          {/* Instant Video Meet Card */}
          <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 text-white shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-white/5 rounded-full transform translate-x-3 -translate-y-3"></div>
            <h3 className="text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <Video className="h-4 w-4 text-emerald-400" id="meet-icon" />
              <span>Cyber Meets & Seminars</span>
            </h3>
            <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed font-normal">
              Integrated real-time simulated meets linked exactly to your course syllabus. Click below to boot up the interactive digital seminar.
            </p>

            <div className="mt-3 border-t border-slate-800 pt-3 space-y-2">
              {MOCK_MEET_EVENTS.filter((m) => m.gradeId === student.gradeId).map((meet, ind) => (
                <div key={ind} className="bg-slate-950/40 rounded-lg p-2.5 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-400 uppercase font-mono">Cyber Seminar</span>
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                  <h4 className="text-xs font-bold mt-0.5 truncate">{meet.title}</h4>
                  <div className="mt-1.5 flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {meet.time}</span>
                    <span className="flex items-center gap-0.5"><Video className="h-3 w-3" /> {meet.duration}</span>
                  </div>
                  
                  <button
                    onClick={() => setActiveMeetSimulation(meet)}
                    className="mt-2.5 w-full cursor-pointer select-none text-center rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1 text-[11px] font-bold transition-all"
                  >
                    Launch Interactive Classroom Meet
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Planner Widget */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5 uppercase tracking-wide">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>Study Calendar Planner</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Plan your week to attend lessons & pass live automated marking.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-all font-mono">
                <p className="text-xs font-bold text-slate-400 w-11 shrink-0 uppercase tracking-tight text-center">Mon</p>
                <div className="h-7 w-0.5 bg-slate-200 font-bold"></div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800">Individual Textual Reading</h4>
                  <p className="text-[10px] text-slate-450 text-slate-400">Chapters 1 to 3 covering Core Science / Ecology</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-all font-mono">
                <p className="text-xs font-bold text-slate-400 w-11 shrink-0 uppercase tracking-tight text-center text-emerald-600 font-extrabold">Tue</p>
                <div className="h-7 w-0.5 bg-emerald-300"></div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800">Live Tutoring Meet & Q/A</h4>
                  <p className="text-[10px] text-emerald-650 text-emerald-600 font-semibold text-xs leading-none">Active simulated audio-visual room</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-all font-mono">
                <p className="text-xs font-bold text-slate-400 w-11 shrink-0 uppercase tracking-tight text-center">Thu</p>
                <div className="h-7 w-0.5 bg-slate-200"></div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800">Self-Marked Quiz Tests</h4>
                  <p className="text-[10px] text-slate-450 text-slate-400">Answer assessment questions instantly</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-all font-mono">
                <p className="text-xs font-bold text-slate-400 w-11 shrink-0 uppercase tracking-tight text-center">Sat</p>
                <div className="h-7 w-0.5 bg-slate-200"></div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-805 text-slate-800">Badge Milestones Review</h4>
                  <p className="text-[10px] text-slate-450 text-slate-400">Earn medals, unlock certificate of mastery</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. SIMULATED LIVE VIDEO MEET ROOM OVERLAY */}
      {activeMeetSimulation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-3 sm:p-5 animate-fade-in">
          <div className="flex flex-col lg:flex-row bg-slate-950 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-slate-800 h-[92vh] lg:h-[82vh]">
            
            {/* Left Screen: Video Blocks (Grid Layout) */}
            <div className="flex-1 flex flex-col p-3 relative justify-between">
              
              {/* Top Banner Controls */}
              <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto bg-slate-900/90 rounded-md px-2.5 py-1.5 backdrop-blur-md border border-slate-800 text-[10px] font-mono font-medium text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse"></span>
                  <span>LIVE MEET: {activeMeetSimulation.title}</span>
                </div>
                <div className="pointer-events-auto bg-slate-905 bg-slate-900/90 rounded-md px-2.5 py-1.5 backdrop-blur-md border border-slate-800 text-[10px] text-slate-350 font-mono">
                  Participants: <span className="text-white font-bold">4 in room</span>
                </div>
              </div>

              {/* Grid of video blocks */}
              <div className="grid grid-cols-2 gap-3 flex-1 items-center justify-center py-10">
                
                {/* Participant 1: Teacher (Sarah) */}
                <div className="aspect-video relative rounded-lg bg-gradient-to-br from-emerald-950/20 to-slate-900 border border-emerald-500/15 overflow-hidden flex items-center justify-center">
                  <div className="text-center space-y-1.5">
                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-600 flex items-center justify-center text-white text-base font-bold ring-4 ring-emerald-500/10">
                      TS
                    </div>
                    <div className="text-xs font-semibold text-white">Teacher Sarah (Tutor)</div>
                    <div className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 font-mono">
                      <Volume2 className="h-3 w-3 animate-bounce" />
                      <span>Speaking...</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 left-2.5 bg-slate-900/90 text-[9px] font-mono px-2 py-0.5 rounded text-white flex items-center gap-1 border border-slate-800">
                    <span className="h-1 w-1 rounded-full bg-emerald-400"></span> Live Webcam Feed
                  </span>
                </div>

                {/* Participant 2: Emma */}
                <div className="aspect-video relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="mx-auto h-16 w-16 rounded-full bg-pink-550 bg-pink-600 flex items-center justify-center text-white text-xl font-bold">
                      EL
                    </div>
                    <div className="text-xs font-bold text-white">Emma Lee</div>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-slate-900/80 text-[10px] px-2 py-1 rounded text-white border border-slate-850">
                    Active
                  </span>
                </div>

                {/* Participant 3: Jack */}
                <div className="aspect-video relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="mx-auto h-16 w-16 rounded-full bg-amber-600 flex items-center justify-center text-white text-xl font-bold">
                      JM
                    </div>
                    <div className="text-xs font-bold text-slate-200">Jack Miller</div>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-slate-900/80 text-[10px] px-2 py-1 rounded text-white border border-slate-850">
                    Active
                  </span>
                </div>

                {/* Participant 4: You (Alex) */}
                <div className="aspect-video relative rounded-lg bg-gradient-to-br from-slate-900 to-emerald-950 border border-slate-800 overflow-hidden flex items-center justify-center transition-all duration-300">
                  {cameraActive ? (
                    <div className="text-center space-y-1.5">
                      <div className="mx-auto h-12 w-12 rounded-full bg-emerald-600 flex items-center justify-center text-white text-base font-bold">
                        {student.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-xs font-bold text-emerald-400">{student.fullName} (You)</div>
                      <div className="text-[10px] text-slate-400 font-mono">Webcam Sim ON</div>
                    </div>
                  ) : (
                    <div className="text-center space-y-1 inline-flex flex-col items-center">
                      <VideoOff className="h-6 w-6 text-rose-500" />
                      <div className="text-xs font-bold text-slate-500">Webcam Muted</div>
                    </div>
                  )}

                  <span className="absolute bottom-2.5 left-2.5 bg-slate-900/90 text-[9px] font-mono px-2 py-0.5 rounded text-white border border-slate-800">
                    Local Preview
                  </span>

                  <span className="absolute top-2.5 right-2.5 text-[10px] text-slate-400 font-mono">
                    {micActive ? (
                      <Mic className="h-4 w-4 text-emerald-400 bg-slate-900/90 p-0.5 rounded border border-slate-800" />
                    ) : (
                      <MicOff className="h-4 w-4 text-rose-500 bg-slate-900/90 p-0.5 rounded border border-slate-800" />
                    )}
                  </span>
                </div>

              </div>

              {/* Bottom Meeting Controls */}
              <div className="flex items-center justify-center gap-2 mt-1">
                <button
                  onClick={() => setMicActive(!micActive)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white transition-all ${
                    micActive ? "bg-slate-800 hover:bg-slate-700" : "bg-rose-600 hover:bg-rose-700"
                  }`}
                  title={micActive ? "Mute Microphone" : "Unmute Microphone"}
                >
                  {micActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => setCameraActive(!cameraActive)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white transition-all ${
                    cameraActive ? "bg-slate-800 hover:bg-slate-700" : "bg-rose-600 hover:bg-rose-700"
                  }`}
                  title={cameraActive ? "Turn Camera Off" : "Turn Camera On"}
                >
                  {cameraActive ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => setActiveMeetSimulation(null)}
                  className="flex h-9 px-4 cursor-pointer items-center gap-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-xs font-bold text-white rounded-lg transition-all font-mono"
                  title="Disconnect and exit seminar"
                >
                  <PhoneOff className="h-3.5 w-3.5" />
                  <span>Leave Classroom Meet</span>
                </button>
              </div>

            </div>

            {/* Right Screen: Classroom Chat Column */}
            <div className="w-full lg:w-72 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0 h-[40%] lg:h-full font-mono">
              
              {/* Chat Column Header */}
              <div className="p-3 border-b border-slate-800 flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Classroom Messages</span>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                {chatMessages.map((msg, mid) => (
                  <div key={mid} className="text-[11px]">
                    <div className="flex items-center justify-between font-mono text-[9px] mb-0.5">
                      <span className="font-bold text-emerald-400">{msg.sender}</span>
                      <span className="text-slate-500">{msg.time}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300 leading-relaxed font-sans">
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} className="p-2 border-t border-slate-800 flex gap-1.5 font-sans">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a group message..."
                  className="flex-1 bg-slate-950 text-[11px] text-white border border-slate-800 rounded px-2.5 py-1.5 outline-none focus:border-emerald-500 font-sans"
                />
                <button
                  type="submit"
                  className="flex h-7 w-7 items-center justify-center rounded bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shrink-0 transition-all cursor-pointer"
                >
                  <Send className="h-3 w-3" />
                </button>
              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
