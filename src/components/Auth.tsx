import React, { useState, useEffect } from "react";
import { User, Mail, Lock, BookOpen, Sparkles, CheckCircle, GraduationCap } from "lucide-react";
import { Student } from "../types";
import { GRADES_LIST } from "../data/lessons";

interface AuthProps {
  onLoginSuccess: (student: Student) => void;
}

export default function Auth({ onLoginSuccess }: AuthProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gradeId, setGradeId] = useState(GRADES_LIST[0].id);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setError("");
    setSuccessMsg("");
  }, [isRegistering]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    const savedStudentsRaw = localStorage.getItem("learning_portal_students");
    const students: any[] = savedStudentsRaw ? JSON.parse(savedStudentsRaw) : [];

    // Check if email already registered
    const exists = students.some((s) => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setError("This email is already registered. Please login.");
      return;
    }

    const newStudent: Student = {
      id: "student-" + Date.now(),
      fullName,
      email: email.trim(),
      gradeId,
      avatarSeed: Math.floor(Math.random() * 1000).toString(),
      createdAt: new Date().toISOString()
    };

    // Save with password
    students.push({ ...newStudent, password });
    localStorage.setItem("learning_portal_students", JSON.stringify(students));

    setSuccessMsg("Registration successful! Redirecting to login...");
    setFullName("");
    setEmail("");
    setPassword("");
    setError("");

    setTimeout(() => {
      setIsRegistering(false);
      setSuccessMsg("");
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in email and password.");
      return;
    }

    const savedStudentsRaw = localStorage.getItem("learning_portal_students");
    const students: any[] = savedStudentsRaw ? JSON.parse(savedStudentsRaw) : [];

    const matched = students.find(
      (s) => s.email.toLowerCase() === email.trim().toLowerCase() && s.password === password
    );

    if (!matched) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    // Success
    const loggedInStudent: Student = {
      id: matched.id,
      fullName: matched.fullName,
      email: matched.email,
      gradeId: matched.gradeId,
      avatarSeed: matched.avatarSeed,
      createdAt: matched.createdAt
    };

    localStorage.setItem("learning_portal_current_student", JSON.stringify(loggedInStudent));
    onLoginSuccess(loggedInStudent);
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-md border border-slate-200/80 transition-all duration-300">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 px-5 py-6 text-center text-white border-b border-slate-800">
          <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-2 ring-emerald-500/20">
            <GraduationCap className="h-6 w-6" id="logo-icon" />
          </div>
          <h1 className="font-sans text-xl font-bold tracking-tight text-white uppercase tracking-wider">EduQuest</h1>
          <p className="mt-1 text-[11px] text-emerald-408/80 text-emerald-200/70 font-mono tracking-tight">
            {isRegistering ? "Student Registration Form" : "Lessons Portal Authorization"}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          
          {error && (
            <div className="mb-3.5 rounded-lg bg-rose-50 p-2.5 text-xs font-mono text-rose-600 border border-rose-100">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-3.5 flex items-center gap-2 rounded-lg bg-emerald-50 p-2.5 text-xs font-mono font-medium text-emerald-850 border border-emerald-100">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-3.5">
            
            {isRegistering && (
              <div>
                <label className="block text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {isRegistering && (
              <div>
                <label className="block text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mb-1">
                  Select Grade Level
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <select
                    value={gradeId}
                    onChange={(e) => setGradeId(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 appearance-none cursor-pointer"
                  >
                    {GRADES_LIST.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="mt-1 w-full select-none cursor-pointer rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-3 py-2.5 text-xs font-semibold text-white shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 active:scale-[0.98]"
            >
              {isRegistering ? "CREATE ACCOUNT" : "SIGN IN TO PORTAL"}
            </button>
          </form>

          {/* Switch Prompt */}
          <div className="mt-5 border-t border-slate-100 pt-4 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="group inline-flex items-center gap-1.5 text-xs text-emerald-650 text-emerald-600 hover:text-emerald-800 font-medium hover:underline transition-all"
            >
              <span>{isRegistering ? "Existing student? Click here to authorize" : "New enrollment? Open dynamic profile"}</span>
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
