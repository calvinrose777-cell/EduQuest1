/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  SwitchCamera, 
  LogOut, 
  Video, 
  CheckCircle,
  Clock, 
  PhoneOff, 
  Mic, 
  Volume2, 
  Send,
  MessageSquare,
  Award,
  BookMarked
} from "lucide-react";
import { Student, QuizAttempt, ActiveMeetEvent } from "./types";
import { GRADES_LIST, LESSONS_DATA } from "./data/lessons";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import LessonsList from "./components/LessonsList";
import LessonDetail from "./components/LessonDetail";

export default function App() {
  const [student, setStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "lessons" | "gradeSelector">("dashboard");
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  
  // Simulated Overlay for video meets launched from lesson details
  const [activeMeet, setActiveMeet] = useState<ActiveMeetEvent | null>(null);
  const [micActive, setMicActive] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: "Teacher Sarah", text: "Welcome to today's interactive session! Let me know if you can hear me.", time: "10:02 AM" }
  ]);

  // Load current student on mount
  useEffect(() => {
    const saved = localStorage.getItem("learning_portal_current_student");
    if (saved) {
      try {
        const parsedStudent = JSON.parse(saved) as Student;
        setStudent(parsedStudent);
        loadQuizAttempts(parsedStudent.id);
      } catch (e) {
        console.error("Failed to parse saved student credentials", e);
      }
    }
  }, []);

  const loadQuizAttempts = (studentId: string) => {
    const attemptsRaw = localStorage.getItem(`learning_portal_attempts_${studentId}`);
    if (attemptsRaw) {
      try {
        setQuizAttempts(JSON.parse(attemptsRaw) as QuizAttempt[]);
      } catch (e) {
        console.error("Failed loading attempts checklist", e);
      }
    } else {
      setQuizAttempts([]);
    }
  };

  const handleLoginSuccess = (loggedInStudent: Student) => {
    setStudent(loggedInStudent);
    loadQuizAttempts(loggedInStudent.id);
    setActiveTab("dashboard");
    setSelectedLessonId(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("learning_portal_current_student");
    setStudent(null);
    setQuizAttempts([]);
    setActiveTab("dashboard");
    setSelectedLessonId(null);
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActiveTab("lessons"); // Switches tab to lessons focus
  };

  const handleSaveQuizAttempt = (lessonId: string, score: number, answers: number[]) => {
    if (!student) return;

    // Filter existing score of this lesson, always keep highest score or latest attempt
    const newAttempt: QuizAttempt = {
      lessonId,
      score,
      answers,
      completedAt: new Date().toISOString()
    };

    let updated = [...quizAttempts];
    const matchIdx = updated.findIndex((a) => a.lessonId === lessonId);
    if (matchIdx >= 0) {
      // Overwrite only if new score is equal or better, preserving educational rewards!
      if (score >= updated[matchIdx].score) {
        updated[matchIdx] = newAttempt;
      }
    } else {
      updated.push(newAttempt);
    }

    setQuizAttempts(updated);
    localStorage.setItem(`learning_portal_attempts_${student.id}`, JSON.stringify(updated));
  };

  // Allow student to change their grade level in the portal setting
  const handleChangeGrade = (gradeId: string) => {
    if (!student) return;
    const updatedStudent = { ...student, gradeId };
    setStudent(updatedStudent);
    localStorage.setItem("learning_portal_current_student", JSON.stringify(updatedStudent));
    loadQuizAttempts(updatedStudent.id);
    setSelectedLessonId(null);
    setActiveTab("dashboard");
  };

  const handleSendChatCurrentMeet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !student) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages([
      ...chatMessages,
      { sender: `${student.fullName} (You)`, text: chatInput.trim(), time: timeStr }
    ]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { 
          sender: "Teacher Sarah", 
          text: "Excellent question! Let's deep-dive into that logic during the next slides.", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }, 1200);
  };

  // Render main sub-view
  const renderContentView = () => {
    if (!student) return null;

    const currentLessons = LESSONS_DATA[student.gradeId] || [];

    if (selectedLessonId) {
      const activeLesson = currentLessons.find((l) => l.id === selectedLessonId);
      if (activeLesson) {
        return (
          <LessonDetail
            lesson={activeLesson}
            student={student}
            quizAttempts={quizAttempts}
            onBack={() => setSelectedLessonId(null)}
            onSaveQuizAttempt={handleSaveQuizAttempt}
            onLaunchMeet={(meet) => {
              setChatMessages([
                { sender: "Teacher Sarah", text: "Welcome to today's interactive session! Let me know if you can hear me.", time: "10:02 AM" }
              ]);
              setActiveMeet(meet);
            }}
          />
        );
      }
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            student={student}
            quizAttempts={quizAttempts}
            onSelectLesson={handleSelectLesson}
          />
        );
      case "lessons":
        return (
          <LessonsList
            student={student}
            quizAttempts={quizAttempts}
            onSelectLesson={handleSelectLesson}
          />
        );
      case "gradeSelector":
        return (
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">Switch Grade level & Lessons</h2>
              <p className="mt-1 text-xs text-slate-500 max-w-xl">
                Ready for a new adventure? Changing grades updates your lessons (10 per grade), schedules, and live video meeting simulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GRADES_LIST.map((grade) => {
                const isSelected = student.gradeId === grade.id;
                return (
                  <div 
                    key={grade.id}
                    onClick={() => handleChangeGrade(grade.id)}
                    className={`cursor-pointer rounded-2xl p-5 border text-left transition-all ${
                      isSelected 
                        ? "border-indigo-600 bg-indigo-50/25 ring-2 ring-indigo-100" 
                        : "border-slate-150 bg-white hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <BookMarked className={`h-6 w-6 mb-3 ${isSelected ? "text-indigo-600" : "text-slate-400"}`} />
                    <h3 className="text-sm font-extrabold text-slate-850 leading-snug">{grade.name}</h3>
                    <p className="mt-2 text-xs text-slate-450 leading-relaxed font-normal line-clamp-3">{grade.description}</p>
                    <div className="mt-4 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-400">10 Marked Lessons</span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[9px]">
                          Enrolled Active
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 antialiased tracking-tight">
      
      {/* If student is not logged in, show Auth component directly */}
      {!student ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="flex flex-col min-h-screen">
          
          {/* Header Navigation bar */}
          <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 shadow-sm px-3 py-2 sm:px-4">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
              
              {/* Logo / Brand */}
              <div 
                onClick={() => { setSelectedLessonId(null); setActiveTab("dashboard"); }}
                className="flex items-center gap-2 cursor-pointer hover:opacity-95 select-none group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-900 group-hover:scale-105 transition-transform">
                  <GraduationCap className="h-5 w-5" id="header-logo" />
                </div>
                <div>
                  <h1 className="font-sans text-xs sm:text-sm font-bold text-white tracking-widest leading-none uppercase group-hover:text-emerald-400 transition-colors">
                    EduQuest
                  </h1>
                  <span className="text-[10px] text-slate-400 font-mono tracking-tight font-medium">Academics</span>
                </div>
              </div>

              {/* Central Tab Controls (Hidden if currently reading detail lesson) */}
              <nav className="hidden md:flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => { setSelectedLessonId(null); setActiveTab("dashboard"); }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-medium cursor-pointer select-none transition-all ${
                    !selectedLessonId && activeTab === "dashboard"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => { setSelectedLessonId(null); setActiveTab("lessons"); }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-medium cursor-pointer select-none transition-all ${
                    (selectedLessonId || activeTab === "lessons")
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Syllabus Lessons</span>
                </button>

                <button
                  onClick={() => { setSelectedLessonId(null); setActiveTab("gradeSelector"); }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-medium cursor-pointer select-none transition-all ${
                    !selectedLessonId && activeTab === "gradeSelector"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <SwitchCamera className="h-3.5 w-3.5" />
                  <span>Switch Grade</span>
                </button>
              </nav>

              {/* Right Side: Account actions */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-white truncate max-w-[120px]">{student.fullName}</div>
                  <div className="text-[9px] font-bold text-emerald-450 text-emerald-400 uppercase tracking-widest font-mono">
                    {GRADES_LIST.find((g) => g.id === student.gradeId)?.name.split(":")[0] || "Enrolled"}
                  </div>
                </div>

                <div className="h-5 w-[1px] bg-slate-800 hidden sm:block"></div>

                <button
                  onClick={handleSignOut}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 border border-slate-705 border-slate-700 hover:bg-rose-950 hover:text-rose-450 hover:text-rose-400 text-slate-405 text-slate-400 transition-all cursor-pointer select-none"
                  title="Sign out of student profile"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </header>

          {/* Quick Mobile Sticky Nav (visible on smaller viewport screens) */}
          <div className="md:hidden sticky top-[53px] z-35 flex items-center justify-around bg-slate-900 border-b border-slate-800 px-2 py-1.5 text-center text-[10px]">
            <button
              onClick={() => { setSelectedLessonId(null); setActiveTab("dashboard"); }}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-md font-medium transition-all ${
                !selectedLessonId && activeTab === "dashboard" ? "text-emerald-400 bg-white/5" : "text-slate-400"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => { setSelectedLessonId(null); setActiveTab("lessons"); }}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-md font-medium transition-all ${
                (selectedLessonId || activeTab === "lessons") ? "text-emerald-400 bg-white/5" : "text-slate-400"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Syllabus</span>
            </button>
            <button
              onClick={() => { setSelectedLessonId(null); setActiveTab("gradeSelector"); }}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-md font-medium transition-all ${
                !selectedLessonId && activeTab === "gradeSelector" ? "text-emerald-400 bg-white/5" : "text-slate-400"
              }`}
            >
              <SwitchCamera className="h-4 w-4" />
              <span>Grade</span>
            </button>
          </div>

          {/* Main Container Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6">
            {renderContentView()}
          </main>

          {/* Footer view */}
          <footer className="bg-slate-900 border-t border-slate-800 py-4 px-3 text-center mt-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-slate-500" />
                <span>© 2026 EduQuest • High Density Console</span>
              </div>
              <div className="flex items-center gap-3">
                <a href="#privacy" className="hover:text-white hover:underline">Privacy</a>
                <span className="text-slate-800">•</span>
                <a href="#terms" className="hover:text-white hover:underline">Honor Code</a>
              </div>
            </div>
          </footer>

          {/* SIMULATED LIVE VIDEO MEET ROOM OVERLAY */}
          {activeMeet && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-3 sm:p-6 animate-fade-in">
              <div className="flex flex-col lg:flex-row bg-slate-950 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800 h-[90vh] lg:h-[80vh]">
                
                {/* Left Screen: Video Blocks (Grid Layout) */}
                <div className="flex-1 flex flex-col p-4 relative justify-between">
                  
                  {/* Top Banner Controls */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                    <div className="pointer-events-auto bg-slate-900/80 rounded-xl px-3 py-1.5 backdrop-blur-md border border-slate-800 text-xs font-medium text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse"></span>
                      <span>LIVE MEET: {activeMeet.title}</span>
                    </div>
                    <div className="pointer-events-auto bg-slate-900/80 rounded-xl px-3 py-1.5 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
                      Participants: <span className="text-white font-bold">2 in room</span>
                    </div>
                  </div>

                  {/* Grid of video blocks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 items-center justify-center py-10">
                    
                    {/* Participant 1: Teacher (Sarah) */}
                    <div className="aspect-video relative rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 overflow-hidden flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="mx-auto h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold ring-4 ring-indigo-500/20">
                          TS
                        </div>
                        <div className="text-xs font-bold text-white">Teacher Sarah (Tutor)</div>
                        <div className="text-[10px] text-indigo-300 flex items-center justify-center gap-1 animate-pulse">
                          <Volume2 className="h-3 w-3 text-emerald-400" />
                          <span>Streaming audio...</span>
                        </div>
                      </div>
                      <span className="absolute bottom-3 left-3 bg-slate-900/80 text-[10px] px-2 py-1 rounded text-white flex items-center gap-1 border border-slate-850">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Live Webcam
                      </span>
                    </div>

                    {/* Participant 2: You */}
                    <div className="aspect-video relative rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 overflow-hidden flex items-center justify-center transition-all duration-300">
                      <div className="text-center space-y-2">
                        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-650 bg-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                          {student.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-xs font-bold text-emerald-400">{student.fullName} (You)</div>
                        <div className="text-[10px] text-slate-400">Audio linked</div>
                      </div>

                      <span className="absolute bottom-3 left-3 bg-slate-900/80 text-[10px] px-2 py-1 rounded text-white border border-slate-850">
                        Local Preview
                      </span>

                      <span className="absolute top-3 right-3 text-[10px] text-slate-400">
                        {micActive ? (
                          <Mic className="h-4.5 w-4.5 text-emerald-400 bg-slate-900/80 p-0.5 rounded" />
                        ) : (
                          <PhoneOff className="h-4.5 w-4.5 text-rose-500 bg-slate-900/80 p-0.5 rounded" />
                        )}
                      </span>
                    </div>

                  </div>

                  {/* Bottom Meeting Controls */}
                  <div className="flex items-center justify-center gap-3.5 mt-2">
                    <button
                      onClick={() => setMicActive(!micActive)}
                      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white transition-all ${
                        micActive ? "bg-slate-800 hover:bg-slate-700" : "bg-rose-600 hover:bg-rose-700"
                      }`}
                      title={micActive ? "Mute Microphone" : "Unmute Microphone"}
                    >
                      {micActive ? <Mic className="h-4.5 w-4.5" /> : <PhoneOff className="h-4.5 w-4.5" />}
                    </button>

                    <button
                      onClick={() => setActiveMeet(null)}
                      className="flex h-11 px-5 cursor-pointer items-center gap-2 bg-rose-600 hover:bg-rose-700 hover:scale-101 text-white text-xs font-bold rounded-full transition-all"
                      title="Disconnect and exit seminar"
                    >
                      <PhoneOff className="h-4 w-4" />
                      <span>Leave Seminar</span>
                    </button>
                  </div>

                </div>

                {/* Right Screen: Classroom Chat Column */}
                <div className="w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0 h-[40%] lg:h-full">
                  
                  {/* Chat Column Header */}
                  <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                    <MessageSquare className="h-4.5 w-4.5 text-indigo-400" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">Classroom Chat</span>
                  </div>

                  {/* Chat Message Scroll */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                    {chatMessages.map((msg, mid) => (
                      <div key={mid} className="text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-extrabold text-indigo-300">{msg.sender}</span>
                          <span className="text-slate-500 font-medium">{msg.time}</span>
                        </div>
                        <div className="mt-1 bg-slate-950 p-2.5 rounded-xl border border-slate-850/50 text-slate-200 leading-relaxed font-normal">
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleSendChatCurrentMeet} className="p-3 border-t border-slate-800 flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a group message..."
                      className="flex-1 bg-slate-950 text-xs text-white border border-slate-800 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shrink-0 transition-all cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>

                </div>

              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
