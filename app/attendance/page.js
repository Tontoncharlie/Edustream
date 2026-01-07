"use client";

import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Calendar as CalendarIcon, Check, X, Search, Filter, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AttendancePage = () => {
    const { students, courses, showToast, saveAttendance, attendanceLog, searchQuery } = useData();
    const [selectedCourse, setSelectedCourse] = useState("All");
    const [attendance, setAttendance] = useState({});
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [view, setView] = useState("record"); // "record" or "history"
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredStudents = students.filter(s =>
        (selectedCourse === "All" || s.course === selectedCourse) &&
        (s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const toggleAttendance = (id, status) => {
        setAttendance(prev => ({
            ...prev,
            [id]: status
        }));
    };

    const handleSave = () => {
        if (Object.keys(attendance).length === 0) {
            showToast("Please mark at least one student", "error");
            return;
        }
        saveAttendance(date, attendance);
        setAttendance({});
    };

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-3xl font-bold tracking-tight text-foreground">
                        Attendance Tracker
                    </h3>
                    <p className="text-muted-foreground mt-1">
                        Daily roll call and historical records.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-secondary p-1 rounded-2xl border border-border">
                    <button
                        onClick={() => setView("record")}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'record' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}
                    >
                        New Session
                    </button>
                    <button
                        onClick={() => setView("history")}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'history' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}
                    >
                        History ({attendanceLog.length})
                    </button>
                </div>
            </div>

            {view === "record" ? (
                <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl">
                                <UserCheck size={24} />
                            </div>
                            <div>
                                <div className="bg-card border border-border rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-sm mb-1">
                                    <CalendarIcon size={14} className="text-primary" />
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="bg-transparent border-none outline-none text-xs font-bold"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">{filteredStudents.length} Students in list</p>
                            </div>
                        </div>

                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="bg-secondary border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none text-foreground"
                        >
                            <option value="All">All Courses</option>
                            {courses.map(c => <option key={c.id} value={c.title} className="bg-card">{c.title}</option>)}
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-left">
                                    <th className="p-4 font-medium uppercase tracking-wider">Student</th>
                                    <th className="p-4 font-medium uppercase tracking-wider text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-slate-800">
                                {filteredStudents.map((s) => (
                                    <tr key={s.id} className="hover:bg-secondary transition-colors border-none">
                                        <td className="p-4 text-foreground">
                                            <p className="font-bold">{s.name}</p>
                                            <p className="text-[10px] text-muted-foreground">{s.course}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => toggleAttendance(s.id, 'present')}
                                                    className={`p-2.5 rounded-xl transition-all ${attendance[s.id] === 'present'
                                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200/50'
                                                        : 'bg-secondary text-muted-foreground'
                                                        }`}
                                                >
                                                    <Check size={20} />
                                                </button>
                                                <button
                                                    onClick={() => toggleAttendance(s.id, 'absent')}
                                                    className={`p-2.5 rounded-xl transition-all ${attendance[s.id] === 'absent'
                                                        ? 'bg-red-500 text-white shadow-lg shadow-red-200/50'
                                                        : 'bg-secondary text-muted-foreground'
                                                        }`}
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end border-t dark:border-slate-800">
                        <button
                            onClick={handleSave}
                            className="px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:opacity-90 shadow-xl shadow-primary/20 transition-all active:scale-95"
                        >
                            Save Session
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {attendanceLog.length === 0 ? (
                        <div className="bg-card border border-border rounded-3xl p-12 text-center text-muted-foreground">
                            No attendance records found. Start by recording a new session.
                        </div>
                    ) : (
                        attendanceLog.map((log) => {
                            const presentCount = Object.values(log.records).filter(v => v === 'present').length;
                            const total = Object.keys(log.records).length;
                            return (
                                <motion.div
                                    key={log.id}
                                    layout
                                    className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground">
                                            <CalendarIcon size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg text-foreground">{new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            <p className="text-sm text-muted-foreground">{total} Students Tracked</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-2xl font-black text-emerald-500">{presentCount}</p>
                                            <p className="text-[10px] text-slate-400 uppercase font-black">Present</p>
                                        </div>
                                        <div className="w-[1px] h-10 bg-slate-100 dark:bg-slate-800" />
                                        <div className="text-center">
                                            <p className="text-2xl font-black text-red-500">{total - presentCount}</p>
                                            <p className="text-[10px] text-slate-400 uppercase font-black">Absent</p>
                                        </div>
                                        <button className="ml-4 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-colors">
                                            <Filter size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default AttendancePage;
