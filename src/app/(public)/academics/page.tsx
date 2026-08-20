import { Metadata } from "next"
import { Suspense } from "react"
import { AcademicsClient } from "./academics-client"

export const metadata: Metadata = {
  title: "Academics - IONITIX",
  description: "Explore academic programs, curriculum, and course offerings at IONITIX Department of Computer Science & Engineering.",
}

const programs = [
  {
    name: "B.Tech Computer Science & Engineering",
    duration: "4 Years",
    type: "Undergraduate",
    seats: "180",
    description: "Comprehensive undergraduate program covering core computer science concepts, software engineering, AI/ML, cybersecurity, and emerging technologies.",
    highlights: ["Core CS Fundamentals", "AI & Machine Learning", "Cybersecurity", "Cloud Computing", "Full Stack Development", "Capstone Project"],
    curriculum: [
      { semester: 1, subjects: ["Mathematics-I", "Physics", "Programming Fundamentals", "Engineering Graphics", "Communication Skills", "Environmental Science"] },
      { semester: 2, subjects: ["Mathematics-II", "Chemistry", "Data Structures", "Digital Logic Design", "Basic Electrical Engineering", "Workshop Practice"] },
      { semester: 3, subjects: ["Discrete Mathematics", "Computer Organization", "Object Oriented Programming", "Database Management Systems", "Operating Systems", "Technical Communication"] },
      { semester: 4, subjects: ["Design & Analysis of Algorithms", "Computer Networks", "Software Engineering", "Theory of Computation", "Microprocessors", "Open Elective-I"] },
      { semester: 5, subjects: ["Machine Learning", "Compiler Design", "Web Technologies", "Information Security", "Professional Elective-I", "Open Elective-II"] },
      { semester: 6, subjects: ["Deep Learning", "Cloud Computing", "Big Data Analytics", "Mobile Application Development", "Professional Elective-II", "Minor Project"] },
      { semester: 7, subjects: ["Artificial Intelligence", "Cybersecurity", "Professional Elective-III", "Professional Elective-IV", "Major Project Phase-I", "Industrial Training"] },
      { semester: 8, subjects: ["Major Project Phase-II", "Professional Elective-V", "Comprehensive Viva", "Seminar", "Internship/Industry Project"] },
    ],
  },
  {
    name: "M.Tech Computer Science & Engineering",
    duration: "2 Years",
    type: "Postgraduate",
    seats: "36",
    description: "Advanced postgraduate program with specializations in AI/ML, Cybersecurity, Data Science, and Software Engineering.",
    highlights: ["Advanced Algorithms", "Research Methodology", "Specialization Tracks", "Thesis Work", "Industry Collaboration", "Conference Publications"],
    curriculum: [
      { semester: 1, subjects: ["Advanced Data Structures", "Advanced Algorithms", "Mathematical Foundations", "Research Methodology", "Elective-I", "Elective-II"] },
      { semester: 2, subjects: ["Machine Learning", "Distributed Systems", "Elective-III", "Elective-IV", "Mini Project", "Seminar"] },
      { semester: 3, subjects: ["Thesis Phase-I", "Elective-V", "Comprehensive Viva", "Research Paper Publication"] },
      { semester: 4, subjects: ["Thesis Phase-II", "Final Thesis Defense", "Research Paper Publication"] },
    ],
  },
  {
    name: "Ph.D. Computer Science & Engineering",
    duration: "3-5 Years",
    type: "Doctoral",
    seats: "Variable",
    description: "Doctoral research program focusing on cutting-edge research in computer science with world-class faculty supervision.",
    highlights: ["Original Research", "Top-tier Publications", "International Collaboration", "Faculty Mentorship", "Research Funding", "Teaching Opportunities"],
    curriculum: [
      { semester: 1, subjects: ["Research Methodology", "Advanced Topics in CS", "Literature Review", "Research Proposal"] },
      { semester: 2, subjects: ["Comprehensive Examination", "State-of-the-Art Survey", "Research Problem Formulation"] },
      { semester: 3, subjects: ["Research Work", "Progress Review", "Conference Publication"] },
      { semester: 4, subjects: ["Research Work", "Journal Publication", "Progress Review"] },
      { semester: 5, subjects: ["Research Work", "Journal Publication", "Thesis Preparation"] },
      { semester: 6, subjects: ["Thesis Submission", "Pre-submission Defense", "Final Defense"] },
    ],
  },
]

const specializations = [
  { name: "Artificial Intelligence & Machine Learning", icon: "🤖", description: "Deep learning, computer vision, NLP, reinforcement learning" },
  { name: "Cybersecurity & Information Security", icon: "🔒", description: "Network security, cryptography, ethical hacking, digital forensics" },
  { name: "Data Science & Big Data Analytics", icon: "📊", description: "Data mining, predictive analytics, visualization, distributed computing" },
  { name: "Software Engineering & Cloud Computing", icon: "☁️", description: "DevOps, microservices, cloud architecture, agile methodologies" },
  { name: "Computer Networks & IoT", icon: "🌐", description: "Wireless networks, 5G/6G, IoT protocols, edge computing" },
  { name: "Human-Computer Interaction", icon: "👥", description: "UX/UI design, AR/VR, accessibility, user research" },
]

export const dynamic = 'force-dynamic'

export default function AcademicsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <AcademicsClient programs={programs} specializations={specializations} />
    </Suspense>
  )
}