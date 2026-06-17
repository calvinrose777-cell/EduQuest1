export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  duration: string; // e.g., "45 mins"
  summary: string;
  content: string; // The textual study material
  meetUrl: string; // Simulated video conference URL
  meetTime: string; // e.g. "Every Tuesday at 10:00 AM"
  questions: Question[];
}

export interface Grade {
  id: string;
  name: string; // e.g., "Grade 5", "Grade 6", "Grade 7"
  lessonsCount: number;
  description: string;
  accentColor: string;
}

export interface Student {
  id: string;
  fullName: string;
  email: string;
  gradeId: string; // e.g., "grade-5"
  avatarSeed: string; // to generate nice avatars
  createdAt: string;
}

export interface QuizAttempt {
  lessonId: string;
  score: number; // e.g. 80 out of 100
  answers: number[]; // user's selected answers index (length matches lesson's questions count)
  completedAt: string;
}

export interface ActiveMeetEvent {
  title: string;
  lessonId: string;
  time: string;
  duration: string;
  gradeId: string;
}
