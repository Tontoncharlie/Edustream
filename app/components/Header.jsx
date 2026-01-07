"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bell, Search, User, Users, BookOpen, GraduationCap, ArrowRight, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useData } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const { profile, searchQuery, setSearchQuery, students, instructors, courses } = useData();
    const [mounted, setMounted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.course.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3);

    const filteredInstructors = instructors.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.course.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3);

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3);

    const hasResults = filteredStudents.length > 0 || filteredInstructors.length > 0 || filteredCourses.length > 0;

    if (!mounted) return <header className="h-20 border-b dark:border-slate-800" />;

    return (
        <header className="h-20 bg-card/80 text-background-foreground py-5 backdrop-blur-md border-b border-border sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
            <div className="flex-1 max-w-xl hidden md:block relative" ref={searchRef}>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search for students, courses, or instructors..."
                        value={searchQuery}
                        onFocus={() => setShowResults(true)}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowResults(true);
                        }}
                        className="w-full bg-secondary border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground placeholder:text-muted-foreground"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {showResults && searchQuery && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            className="absolute top-full left-0 right-0 mt-3 bg-card border border-border rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[70vh] overflow-y-auto"
                        >
                            {!hasResults ? (
                                <div className="p-8 text-center text-slate-400">
                                    <p>No matches found for "{searchQuery}"</p>
                                </div>
                            ) : (
                                <div className="p-2 space-y-4">
                                    {filteredStudents.length > 0 && (
                                        <div className="p-2">
                                            <p className="text-[10px] uppercase font-bold text-slate-400 px-3 mb-2 tracking-widest">Students</p>
                                            <div className="space-y-1">
                                                {filteredStudents.map(s => (
                                                    <Link
                                                        key={s.id}
                                                        href="/students"
                                                        onClick={() => setShowResults(false)}
                                                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary transition-colors group"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                                            <Users size={18} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-foreground">{s.name}</p>
                                                            <p className="text-[10px] text-muted-foreground">{s.course}</p>
                                                        </div>
                                                        <ArrowRight size={14} className="text-muted-foreground/30 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {filteredInstructors.length > 0 && (
                                        <div className="p-2 border-t dark:border-slate-800">
                                            <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-2 tracking-widest">Instructors</p>
                                            <div className="space-y-1">
                                                {filteredInstructors.map(i => (
                                                    <Link
                                                        key={i.id}
                                                        href="/instructors"
                                                        onClick={() => setShowResults(false)}
                                                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                                            <GraduationCap size={18} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{i.name}</p>
                                                            <p className="text-[10px] text-slate-400">{i.course}</p>
                                                        </div>
                                                        <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {filteredCourses.length > 0 && (
                                        <div className="p-2 border-t dark:border-slate-800">
                                            <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-2 tracking-widest">Courses</p>
                                            <div className="space-y-1">
                                                {filteredCourses.map(c => (
                                                    <Link
                                                        key={c.id}
                                                        href="/courses"
                                                        onClick={() => setShowResults(false)}
                                                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                                                            <BookOpen size={18} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{c.title}</p>
                                                            <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{c.description}</p>
                                                        </div>
                                                        <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                <ThemeToggle />

                <button className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
                </button>

                <div className="h-10 w-[1px] bg-slate-200 dark:border-slate-800 mx-1 hidden sm:block" />

                <Link href="/settings" className="flex items-center gap-3 pl-2 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                            {profile.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                            {profile.role}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                            <User className="text-slate-400" size={24} />
                        </div>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;
