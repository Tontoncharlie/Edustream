"use client";

import React, { useState } from "react";

const AddCourseForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        duration: initialData?.duration || "",
        description: initialData?.description || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Course Title
                </label>
                <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-emerald-500 outline-none transition placeholder:text-muted-foreground"
                    placeholder="e.g. Advanced React Patterns"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Duration
                </label>
                <input
                    required
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-emerald-500 outline-none transition placeholder:text-muted-foreground"
                    placeholder="e.g. 8 Weeks"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Description
                </label>
                <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none placeholder:text-muted-foreground"
                    placeholder="Brief description of the course..."
                />
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
                    className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                    {initialData ? "Save Changes" : "Add Course"}
                </button>
            </div>
        </form>
    );
};

export default AddCourseForm;
