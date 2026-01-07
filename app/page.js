"use client";

import React, { useState, useEffect } from "react";
import { Users, BookOpen, GraduationCap, Plus, ArrowUpRight, Search, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "./context/DataContext";
import Modal from "./components/Modal";
import AddStudentForm from "./components/AddStudentForm";
import AddCourseForm from "./components/AddCourseForm";
import AddInstructorForm from "./components/AddInstructorForm";
import StatsChart from "./components/StatsChart";

const Dashboard = () => {
  const { students, instructors, courses, addStudent, addCourse, addInstructor, searchQuery, setSearchQuery } = useData();
  const [courseFilter, setCourseFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  // Modal States
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredStudents = students.filter((student) => {
    const courseMatch = courseFilter === "All" || student.course === courseFilter;
    const nameMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return courseMatch && nameMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (!mounted) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h3>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening at EduStream today.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsStudentModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-primary text-white flex items-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Student</span>
          </button>
        </div>
      </div>

      {/* STATS BENTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={80} />
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
            <Users size={24} />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Students</p>
          <div className="flex items-end gap-2 mt-1">
            <h4 className="text-3xl font-bold">{students.length}</h4>
            <span className="text-xs font-medium text-emerald-500 flex items-center pb-1">
              +12% <ArrowUpRight size={12} />
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen size={80} />
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
            <BookOpen size={24} />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
          <div className="flex items-end gap-2 mt-1">
            <h4 className="text-3xl font-bold">{courses.length}</h4>
            <span className="text-xs font-medium text-muted-foreground flex items-center pb-1 transition-colors">
              Fixed
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap size={80} />
          </div>
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
            <GraduationCap size={24} />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Instructors</p>
          <div className="flex items-end gap-2 mt-1">
            <h4 className="text-3xl font-bold">{instructors.length}</h4>
            <span className="text-xs font-medium text-emerald-500 flex items-center pb-1">
              +2 <ArrowUpRight size={12} />
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-indigo-600 p-6 rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none relative group cursor-pointer hover:bg-indigo-700 transition-colors">
          <div className="absolute top-0 right-0 p-4">
            <Plus className="text-white/40 group-hover:text-white transition-colors" />
          </div>
          <h5 className="text-white font-semibold text-lg max-w-[120px]">Expand Capacity Now</h5>
          <p className="text-indigo-100 text-xs mt-2">Add new instructors or courses to handle more students.</p>
          <button onClick={() => setIsCourseModalOpen(true)} className="mt-4 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-md transition-all">
            Quick Add
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <StatsChart />
        </motion.div>

        {/* QUICK ACTIONS BOX */}
        <motion.div variants={itemVariants} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h4 className="font-semibold mb-4 text-foreground">Quick Management</h4>
          <div className="space-y-3">
            <button
              onClick={() => setIsStudentModalOpen(true)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-secondary flex items-center gap-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <Plus size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">New Enrollment</p>
                <p className="text-xs text-muted-foreground">Add a student to the hub</p>
              </div>
            </button>
            <button
              onClick={() => setIsInstructorModalOpen(true)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-purple-500 hover:bg-secondary flex items-center gap-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-purple-500 transition-colors">
                <Plus size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">New Instructor</p>
                <p className="text-xs text-muted-foreground">Onboard a workspace expert</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* RECENT ACTIVITY / TABLE SECTION */}
      <motion.div variants={itemVariants} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-foreground">Recent Registrations</h4>
            <p className="text-sm text-muted-foreground">Overview of the last 10 enrollments</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-secondary border-none rounded-xl text-sm w-full md:w-64 focus:ring-2 focus:ring-primary transition-all outline-none text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="bg-secondary border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none text-foreground transition-colors"
            >
              <option value="All">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.title}>{course.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground text-left transition-colors">
                <th className="p-4 font-medium uppercase tracking-wider text-muted-foreground">Student</th>
                <th className="p-4 font-medium uppercase tracking-wider text-muted-foreground">Course</th>
                <th className="p-4 font-medium uppercase tracking-wider text-muted-foreground">Enrolled On</th>
                <th className="p-4 font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="p-4 font-medium uppercase tracking-wider text-right text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredStudents.slice(0, 10).map((student) => (
                  <motion.tr
                    key={student.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4 font-bold text-foreground transition-colors">{student.name}</td>
                    <td className="p-4">
                      <span className="text-muted-foreground transition-colors">{student.course}</span>
                    </td>
                    <td className="p-4 text-muted-foreground/70 text-xs transition-colors">
                      {new Date(student.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${student.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                          }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${student.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`} />
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Remove this enrollment?")) deleteStudent(student.id);
                        }}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-muted-foreground transition-colors mb-4">
                        <Search size={32} />
                      </div>
                      <p className="text-muted-foreground transition-colors">No students found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* MODALS */}
      <Modal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        title="Add New Student"
      >
        <AddStudentForm
          onSubmit={(data) => {
            addStudent(data);
            setIsStudentModalOpen(false);
          }}
          onCancel={() => setIsStudentModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        title="Add New Course"
      >
        <AddCourseForm
          onSubmit={(data) => {
            addCourse(data);
            setIsCourseModalOpen(false);
          }}
          onCancel={() => setIsCourseModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        title="Add New Instructor"
      >
        <AddInstructorForm
          onSubmit={(data) => {
            addInstructor(data);
            setIsInstructorModalOpen(false);
          }}
          onCancel={() => setIsInstructorModalOpen(false)}
        />
      </Modal>
    </motion.div>
  );
};

export default Dashboard;
