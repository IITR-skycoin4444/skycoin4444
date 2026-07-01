import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  BookOpen, Star, Zap, Award, Clock, Users, Search, GraduationCap, Brain,
  Coins, Shield, Code, Rocket, Bug, Cloud, Cpu, CheckCircle, Terminal, Play,
  Video, ArrowLeft, BarChart3, Lock, Trophy, ChevronRight, Flame, Target,
  Sparkles, ArrowRight
} from "lucide-react";

// Complete Course Catalog with Real Content
const COURSES = [
  {
    id: "blockchain-101",
    track: "web3",
    category: "Blockchain",
    level: "Beginner",
    icon: "⛓️",
    title: "Blockchain Fundamentals",
    description: "Master distributed ledgers, consensus mechanisms, and cryptography",
    lessons: 12,
    duration: "4h 30m",
    xpReward: 500,
    skyReward: 50,
    students: 28400,
    rating: 4.9,
    color: "oklch(0.72 0.20 200)",
    videoUrl: "https://cdn.example.com/blockchain-101.mp4",
    topics: [
      { title: "What is Blockchain?", content: "Understand distributed ledger technology and its revolutionary impact on trust and transparency." },
      { title: "Distributed Ledgers", content: "Learn how data is distributed across networks and maintained by multiple nodes." },
      { title: "Consensus Mechanisms", content: "Explore Proof of Work, Proof of Stake, and other consensus algorithms." },
      { title: "Hash Functions", content: "Deep dive into cryptographic hashing and its role in blockchain security." },
      { title: "Merkle Trees", content: "Understand how Merkle trees enable efficient data verification." },
      { title: "Smart Contracts Intro", content: "Introduction to programmable contracts on blockchain networks." },
      { title: "Public vs Private Chains", content: "Compare different blockchain architectures and their use cases." },
      { title: "Layer 1 vs Layer 2", content: "Understand scaling solutions and protocol layers." },
      { title: "Blockchain Use Cases", content: "Explore real-world applications beyond cryptocurrency." },
      { title: "Security Fundamentals", content: "Learn about blockchain security threats and protections." },
      { title: "Wallets & Keys", content: "Master private keys, public keys, and wallet management." },
      { title: "Final Assessment", content: "Test your knowledge with a comprehensive quiz and earn your certificate." }
    ]
  },
  {
    id: "defi-mastery",
    track: "web3",
    category: "DeFi",
    level: "Intermediate",
    icon: "💰",
    title: "DeFi Mastery",
    description: "Advanced DeFi protocols, yield farming, and liquidity management",
    lessons: 15,
    duration: "6h 15m",
    xpReward: 800,
    skyReward: 80,
    students: 19200,
    rating: 4.8,
    color: "oklch(0.72 0.20 140)",
    videoUrl: "https://cdn.example.com/defi-mastery.mp4",
    topics: [
      { title: "DeFi Overview", content: "Comprehensive introduction to Decentralized Finance ecosystem." },
      { title: "Uniswap V3", content: "Master the leading DEX and concentrated liquidity mechanics." },
      { title: "Curve Finance", content: "Specialize in stablecoin swaps and efficient trading." },
      { title: "Aave & Compound", content: "Learn lending protocols and interest rate mechanisms." },
      { title: "Yield Strategies", content: "Develop profitable yield farming strategies." },
      { title: "Impermanent Loss", content: "Understand and mitigate IL in liquidity provision." },
      { title: "MEV & Arbitrage", content: "Exploit market opportunities and understand MEV." },
      { title: "Cross-chain Bridges", content: "Navigate multi-chain DeFi ecosystems." },
      { title: "Risk Management", content: "Protect your capital with advanced risk strategies." },
      { title: "Portfolio Optimization", content: "Build diversified DeFi portfolios." },
      { title: "Tax Considerations", content: "Understand DeFi tax implications." },
      { title: "Advanced Strategies", content: "Implement complex yield strategies." },
      { title: "Protocol Governance", content: "Participate in DAO governance." },
      { title: "Security Audits", content: "Learn to audit smart contracts." },
      { title: "Final Project", content: "Build your own DeFi strategy and present it." }
    ]
  },
  {
    id: "smart-contracts",
    track: "web3",
    category: "Development",
    level: "Advanced",
    icon: "📜",
    title: "Smart Contract Engineering",
    description: "Write, audit, and deploy production-grade smart contracts",
    lessons: 20,
    duration: "9h 45m",
    xpReward: 1500,
    skyReward: 150,
    students: 11800,
    rating: 4.9,
    color: "oklch(0.72 0.20 305)",
    videoUrl: "https://cdn.example.com/smart-contracts.mp4",
    topics: [
      { title: "Solidity Deep Dive", content: "Master Solidity programming language." },
      { title: "ERC-20 Tokens", content: "Create and manage fungible tokens." },
      { title: "ERC-721 NFTs", content: "Build non-fungible token contracts." },
      { title: "ERC-1155", content: "Implement multi-token standards." },
      { title: "Access Control", content: "Implement secure permission systems." },
      { title: "Upgradeable Contracts", content: "Design contracts that can be updated." },
      { title: "Gas Optimization", content: "Write efficient, cost-effective contracts." },
      { title: "Security Patterns", content: "Follow best practices for secure code." },
      { title: "Reentrancy Attacks", content: "Prevent and defend against reentrancy." },
      { title: "Flash Loan Exploits", content: "Understand and protect against flash loans." },
      { title: "Testing with Hardhat", content: "Write comprehensive tests." },
      { title: "Foundry Framework", content: "Use advanced testing frameworks." },
      { title: "Formal Verification", content: "Mathematically verify contract correctness." },
      { title: "Audit Methodology", content: "Conduct professional security audits." },
      { title: "Deployment Strategies", content: "Deploy safely to mainnet." },
      { title: "Mainnet Forking", content: "Test against live network state." },
      { title: "Protocol Design", content: "Design robust DeFi protocols." },
      { title: "Tokenomics Engineering", content: "Create sustainable token economics." },
      { title: "DAO Contracts", content: "Build governance systems." },
      { title: "Final Audit Project", content: "Audit a real smart contract." }
    ]
  },
  {
    id: "python-dev",
    track: "coding",
    category: "Python",
    level: "Beginner",
    icon: "🐍",
    title: "Python for Builders",
    description: "From zero to production - scripts, APIs, automation, data pipelines",
    lessons: 24,
    duration: "10h 00m",
    xpReward: 900,
    skyReward: 90,
    students: 45200,
    rating: 4.9,
    color: "oklch(0.72 0.20 250)",
    videoUrl: "https://cdn.example.com/python-dev.mp4",
    topics: [
      { title: "Python Basics", content: "Learn Python syntax and fundamentals." },
      { title: "Data Types & Structures", content: "Master lists, dicts, sets, and tuples." },
      { title: "Functions & Closures", content: "Write reusable, modular code." },
      { title: "OOP in Python", content: "Object-oriented programming principles." },
      { title: "File I/O", content: "Read and write files efficiently." },
      { title: "Error Handling", content: "Build robust error handling." },
      { title: "Modules & Packages", content: "Organize code into modules." },
      { title: "Virtual Environments", content: "Manage project dependencies." },
      { title: "pip & Poetry", content: "Package management tools." },
      { title: "REST APIs with FastAPI", content: "Build high-performance APIs." },
      { title: "Database with SQLAlchemy", content: "ORM for database operations." },
      { title: "Async/Await", content: "Asynchronous programming patterns." },
      { title: "Web Scraping", content: "Extract data from websites." },
      { title: "Data Analysis with Pandas", content: "Analyze and manipulate data." },
      { title: "Visualization", content: "Create compelling data visualizations." },
      { title: "Testing with pytest", content: "Write comprehensive tests." },
      { title: "Docker for Python", content: "Containerize Python applications." },
      { title: "CI/CD Pipelines", content: "Automate testing and deployment." },
      { title: "CLI Tools", content: "Build command-line applications." },
      { title: "Automation Scripts", content: "Automate repetitive tasks." },
      { title: "Crypto APIs", content: "Interact with blockchain APIs." },
      { title: "Bot Development", content: "Build bots and automation." },
      { title: "Deployment", content: "Deploy to production." },
      { title: "Final Project", content: "Build a complete Python application." }
    ]
  },
  {
    id: "js-ts-dev",
    track: "coding",
    category: "JavaScript/TypeScript",
    level: "Beginner",
    icon: "⚡",
    title: "JavaScript & TypeScript Mastery",
    description: "Modern JS/TS from fundamentals to full-stack React + Node apps",
    lessons: 28,
    duration: "12h 30m",
    xpReward: 1000,
    skyReward: 100,
    students: 52100,
    rating: 4.9,
    color: "oklch(0.80 0.20 70)",
    videoUrl: "https://cdn.example.com/js-ts-dev.mp4",
    topics: [
      { title: "JS Fundamentals", content: "Learn JavaScript basics." },
      { title: "ES2024 Features", content: "Master modern JavaScript features." },
      { title: "TypeScript Basics", content: "Introduction to type safety." },
      { title: "Type System Deep Dive", content: "Advanced TypeScript types." },
      { title: "Generics", content: "Write reusable generic code." },
      { title: "Async/Promises", content: "Master asynchronous JavaScript." },
      { title: "Event Loop", content: "Understand JavaScript's event loop." },
      { title: "Node.js", content: "Server-side JavaScript runtime." },
      { title: "Express APIs", content: "Build REST APIs with Express." },
      { title: "React 19", content: "Modern React development." },
      { title: "Hooks & Context", content: "State management with hooks." },
      { title: "tRPC", content: "End-to-end type-safe APIs." },
      { title: "Prisma ORM", content: "Database ORM for Node.js." },
      { title: "Authentication", content: "Implement secure auth." },
      { title: "Testing with Vitest", content: "Write fast tests." },
      { title: "Bundling with Vite", content: "Modern build tooling." },
      { title: "Monorepos", content: "Manage multiple packages." },
      { title: "Performance", content: "Optimize application performance." },
      { title: "Security", content: "Build secure applications." },
      { title: "WebSockets", content: "Real-time communication." },
      { title: "GraphQL", content: "Alternative to REST APIs." },
      { title: "Deployment", content: "Deploy to production." },
      { title: "Edge Functions", content: "Serverless computing." },
      { title: "Deno & Bun", content: "Alternative JavaScript runtimes." },
      { title: "Package Publishing", content: "Publish npm packages." },
      { title: "Open Source", content: "Contribute to open source." },
      { title: "Contributing to OSS", content: "Best practices for contributions." },
      { title: "Final Full-Stack App", content: "Build a complete full-stack application." }
    ]
  },
  {
    id: "ml-fundamentals",
    track: "ai",
    category: "Machine Learning",
    level: "Beginner",
    icon: "🤖",
    title: "Machine Learning Fundamentals",
    description: "Supervised, unsupervised, and reinforcement learning from scratch",
    lessons: 20,
    duration: "9h 00m",
    xpReward: 900,
    skyReward: 90,
    students: 38700,
    rating: 4.9,
    color: "oklch(0.72 0.20 250)",
    videoUrl: "https://cdn.example.com/ml-fundamentals.mp4",
    topics: [
      { title: "What is ML?", content: "Introduction to machine learning." },
      { title: "Linear Regression", content: "Predict continuous values." },
      { title: "Logistic Regression", content: "Binary classification." },
      { title: "Decision Trees", content: "Tree-based models." },
      { title: "Random Forests", content: "Ensemble learning methods." },
      { title: "SVM", content: "Support Vector Machines." },
      { title: "K-Means Clustering", content: "Unsupervised clustering." },
      { title: "PCA", content: "Dimensionality reduction." },
      { title: "Neural Networks Intro", content: "Introduction to deep learning." },
      { title: "Backpropagation", content: "Training neural networks." },
      { title: "Overfitting & Regularization", content: "Prevent model overfitting." },
      { title: "Cross-Validation", content: "Evaluate model performance." },
      { title: "Feature Engineering", content: "Create meaningful features." },
      { title: "scikit-learn", content: "Popular ML library." },
      { title: "Model Evaluation", content: "Measure model accuracy." },
      { title: "Hyperparameter Tuning", content: "Optimize model parameters." },
      { title: "ML Pipelines", content: "Build production ML systems." },
      { title: "Model Deployment", content: "Deploy ML models." },
      { title: "MLOps Basics", content: "Manage ML in production." },
      { title: "Final ML Project", content: "Build a complete ML project." }
    ]
  }
];

const LEVEL_COLORS: Record<string, string> = {
  "Beginner": "bg-green-500/20 text-green-300 border-green-500/30",
  "Intermediate": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Advanced": "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function SkySchool() {
  const { isAuthenticated, user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0] | null>(null);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
  const [completedLessons, setCompletedLessons] = useState<Record<string, Set<number>>>({});

  const filtered = COURSES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEnroll = (courseId: string) => {
    if (!isAuthenticated) {
      toast.error("Sign in to enroll");
      return;
    }
    setEnrolledCourses(prev => new Set([...prev, courseId]));
    toast.success("Enrolled successfully! 🎉");
  };

  const handleCompleteLesson = () => {
    if (!selectedCourse) return;
    const key = selectedCourse.id;
    const completed = completedLessons[key] || new Set();
    completed.add(selectedLessonIdx);
    setCompletedLessons(prev => ({ ...prev, [key]: completed }));
    toast.success(`Lesson completed! +${Math.round(selectedCourse.xpReward / selectedCourse.lessons)} XP`);
  };

  const handleNextLesson = () => {
    if (!selectedCourse) return;
    if (selectedLessonIdx < selectedCourse.lessons - 1) {
      handleCompleteLesson();
      setSelectedLessonIdx(selectedLessonIdx + 1);
    } else {
      handleCompleteLesson();
      toast.success(`Course completed! 🏆 +${selectedCourse.xpReward} XP, +${selectedCourse.skyReward} SKY`);
    }
  };

  // Lesson View
  if (selectedCourse) {
    const lesson = selectedCourse.topics[selectedLessonIdx];
    const progress = (selectedLessonIdx + 1) / selectedCourse.lessons * 100;
    const completed = completedLessons[selectedCourse.id] || new Set();

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => setSelectedCourse(null)}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Progress</p>
                <p className="text-lg font-bold text-white">{selectedLessonIdx + 1}/{selectedCourse.lessons}</p>
              </div>
              <div className="w-40 h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="bg-black rounded-2xl overflow-hidden mb-8 aspect-video flex items-center justify-center border border-white/10">
            <div className="text-center">
              <Video className="w-20 h-20 text-slate-600 mx-auto mb-4" />
              <p className="text-white text-xl font-bold mb-2">{lesson.title}</p>
              <p className="text-slate-400 mb-6">Video Player</p>
              <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                <Play className="w-4 h-4" />
                Play Lesson
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              <Card className="bg-slate-900/50 border border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 leading-relaxed">{lesson.content}</p>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm text-slate-300">
                      <strong>Learning Objectives:</strong> Complete this lesson to earn {Math.round(selectedCourse.xpReward / selectedCourse.lessons)} XP and progress towards your certification.
                    </p>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLessonIdx(Math.max(0, selectedLessonIdx - 1))}
                      disabled={selectedLessonIdx === 0}
                      className="border-slate-600 text-slate-300"
                    >
                      Previous
                    </Button>
                    <Button
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={handleNextLesson}
                    >
                      {selectedLessonIdx === selectedCourse.lessons - 1 ? "Complete Course" : "Next Lesson"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Course Info */}
              <Card className="bg-slate-900/50 border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">{selectedCourse.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {selectedCourse.lessons} lessons
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedCourse.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    +{selectedCourse.skyReward} SKY
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    +{selectedCourse.xpReward} XP
                  </div>
                </CardContent>
              </Card>

              {/* Lessons List */}
              <Card className="bg-slate-900/50 border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedCourse.topics.map((topic, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedLessonIdx(idx)}
                        className={`w-full text-left p-2 rounded transition-all text-xs ${
                          selectedLessonIdx === idx
                            ? "bg-purple-500/30 text-purple-300 border border-purple-500/50"
                            : "text-slate-400 hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {completed.has(idx) ? (
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          ) : idx === selectedLessonIdx ? (
                            <Play className="w-4 h-4 text-purple-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                          )}
                          <span className="truncate">{topic.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Course Catalog View
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10 text-cyan-400" />
            <div>
              <h1 className="text-5xl font-bold text-white">Sky School</h1>
              <p className="text-slate-400 text-lg mt-2">Learn Web3, Coding, AI, and Hacking. Earn SKY4, XP, and Certifications.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/50 border border-white/10">
            <CardContent className="p-4">
              <p className="text-slate-400 text-sm">Total Courses</p>
              <p className="text-3xl font-bold text-white">{COURSES.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border border-white/10">
            <CardContent className="p-4">
              <p className="text-slate-400 text-sm">Total Lessons</p>
              <p className="text-3xl font-bold text-white">{COURSES.reduce((sum, c) => sum + c.lessons, 0)}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border border-white/10">
            <CardContent className="p-4">
              <p className="text-slate-400 text-sm">Total Hours</p>
              <p className="text-3xl font-bold text-white">{(COURSES.reduce((sum, c) => sum + parseFloat(c.duration), 0)).toFixed(1)}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border border-white/10">
            <CardContent className="p-4">
              <p className="text-slate-400 text-sm">Enrolled</p>
              <p className="text-3xl font-bold text-white">{enrolledCourses.size}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Search courses by title, description, or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-slate-800/50 border-b border-slate-700">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="web3">Web3</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="ai">AI & ML</TabsTrigger>
          </TabsList>

          {/* All Courses */}
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => (
                <Card
                  key={course.id}
                  className="bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden group cursor-pointer"
                >
                  <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <Badge className={`text-xs px-2 py-1 ${LEVEL_COLORS[course.level]}`}>
                        {course.level}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />{course.lessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />{course.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-yellow-400 font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3" />+{course.skyReward} SKY
                        </span>
                        <span className="text-xs text-purple-400 flex items-center gap-1">
                          <Award className="w-3 h-3" />+{course.xpReward} XP
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {enrolledCourses.has(course.id) ? (
                        <Button
                          className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-300 border border-green-500/30"
                          onClick={() => setSelectedCourse(course)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      ) : (
                        <Button
                          className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/30"
                          onClick={() => handleEnroll(course.id)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Enroll
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Web3 Courses */}
          <TabsContent value="web3" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.filter(c => c.track === "web3").map(course => (
                <Card key={course.id} className="bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden group cursor-pointer">
                  <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <Badge className={`text-xs px-2 py-1 ${LEVEL_COLORS[course.level]}`}>
                        {course.level}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{course.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{course.description}</p>
                    <div className="flex gap-2">
                      {enrolledCourses.has(course.id) ? (
                        <Button className="flex-1 bg-green-600/20 text-green-300" onClick={() => setSelectedCourse(course)}>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      ) : (
                        <Button className="flex-1 bg-cyan-500/20 text-cyan-300" onClick={() => handleEnroll(course.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Enroll
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Coding Courses */}
          <TabsContent value="coding" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.filter(c => c.track === "coding").map(course => (
                <Card key={course.id} className="bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden group cursor-pointer">
                  <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <Badge className={`text-xs px-2 py-1 ${LEVEL_COLORS[course.level]}`}>
                        {course.level}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{course.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{course.description}</p>
                    <div className="flex gap-2">
                      {enrolledCourses.has(course.id) ? (
                        <Button className="flex-1 bg-green-600/20 text-green-300" onClick={() => setSelectedCourse(course)}>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      ) : (
                        <Button className="flex-1 bg-cyan-500/20 text-cyan-300" onClick={() => handleEnroll(course.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Enroll
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI & ML Courses */}
          <TabsContent value="ai" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.filter(c => c.track === "ai").map(course => (
                <Card key={course.id} className="bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden group cursor-pointer">
                  <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <Badge className={`text-xs px-2 py-1 ${LEVEL_COLORS[course.level]}`}>
                        {course.level}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{course.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{course.description}</p>
                    <div className="flex gap-2">
                      {enrolledCourses.has(course.id) ? (
                        <Button className="flex-1 bg-green-600/20 text-green-300" onClick={() => setSelectedCourse(course)}>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      ) : (
                        <Button className="flex-1 bg-cyan-500/20 text-cyan-300" onClick={() => handleEnroll(course.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Enroll
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
