"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Search, Trash2, Edit, Clock, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import Modal from "../components/Modal";
import AddCourseForm from "../components/AddCourseForm";

const CoursesPage = () => {
    const { courses, addCourse, updateCourse, deleteCourse, searchQuery, setSearchQuery } = useData();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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
                    <h3 className="text-3xl font-bold tracking-tight text-foreground transition-colors">
                        Course Management
                    </h3>
                    <p className="text-muted-foreground mt-1 transition-colors">
                        Create and manage vocational training programs.
                    </p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 text-white flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-95"
                >
                    <Plus size={20} />
                    <span>New Course</span>
                </button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm transition-all text-foreground placeholder:text-muted-foreground"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredCourses.map((course) => (
                        <motion.div
                            key={course.id}
                            variants={itemVariants}
                            layout
                            className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-emerald-500/10 transition-colors" />

                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <BookOpen size={28} />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCourseToEdit(course);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="p-2 bg-secondary rounded-xl text-muted-foreground hover:text-emerald-500 transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm("Confirm deletion of " + course.title + "?")) deleteCourse(course.id);
                                        }}
                                        className="p-2 bg-secondary rounded-xl text-muted-foreground hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-foreground mb-2">{course.title}</h4>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                                {course.description}
                            </p>

                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg">
                                    <Clock size={14} className="text-emerald-500" />
                                    {course.duration}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg">
                                    <Tag size={14} className="text-blue-500" />
                                    Full Time
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Course Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Create New Course"
            >
                <AddCourseForm
                    onSubmit={(data) => {
                        addCourse(data);
                        setIsAddModalOpen(false);
                    }}
                    onCancel={() => setIsAddModalOpen(false)}
                />
            </Modal>

            {/* Edit Course Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Course"
            >
                {courseToEdit && (
                    <AddCourseForm
                        initialData={courseToEdit}
                        onSubmit={(data) => {
                            updateCourse(courseToEdit.id, data);
                            setIsEditModalOpen(false);
                        }}
                        onCancel={() => setIsEditModalOpen(false)}
                    />
                )}
            </Modal>
        </motion.div>
    );
};

export default CoursesPage;
