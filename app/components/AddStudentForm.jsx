"use client";

import React, { useState } from "react";

import { useData } from "../context/DataContext";

const AddStudentForm = ({ onSubmit, onCancel, initialData }) => {
    const { courses } = useData();
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        course: initialData?.course || (courses[0]?.title || "Frontend Development"),
        status: initialData?.status || "Active",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Student Name
                </label>
                <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder:text-muted-foreground"
                    placeholder="Enter full name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Select Course
                </label>
                <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-indigo-500 outline-none transition"
                >
                    {courses.map(course => (
                        <option key={course.id} value={course.title}>{course.title}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Status
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-foreground">
                        <input
                            type="radio"
                            name="status"
                            value="Active"
                            checked={formData.status === "Active"}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="accent-indigo-600"
                        />
                        Active
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-foreground">
                        <input
                            type="radio"
                            name="status"
                            value="Inactive"
                            checked={formData.status === "Inactive"}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="accent-indigo-600"
                        />
                        Inactive
                    </label>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-secondary transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                    {initialData ? "Save Changes" : "Add Student"}
                </button>
            </div>
        </form>
    );
};

export default AddStudentForm;
