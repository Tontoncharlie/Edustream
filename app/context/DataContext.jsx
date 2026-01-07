"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [attendanceLog, setAttendanceLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [profile, setProfile] = useState({
        name: "Admin Hub",
        email: "admin@vocationalhub.com",
        role: "Super Admin",
        avatar: null,
        notifications: true,
        security: { TwoFactor: false }
    });

    const showToast = (message, type = "success") => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    };

    useEffect(() => {
        // Load data from localStorage or use defaults
        const savedStudents = localStorage.getItem("students");
        const savedInstructors = localStorage.getItem("instructors");
        const savedCourses = localStorage.getItem("courses");
        const savedLog = localStorage.getItem("attendanceLog");
        const savedProfile = localStorage.getItem("profile");

        if (savedStudents) {
            setStudents(JSON.parse(savedStudents));
        } else {
            const defaultStudents = [
                { id: 1, name: "John Doe", course: "Frontend Development", date: "2026-01-02", status: "Active" },
                { id: 2, name: "Jane Smith", course: "Backend Development", date: "2026-01-04", status: "Inactive" },
                { id: 3, name: "Samuel Johnson", course: "UI/UX Design", date: "2026-01-05", status: "Active" },
                { id: 4, name: "Obed Jackson", course: "Virtual Assistance", date: "2026-01-07", status: "Active" },
                { id: 5, name: "Judith Samson", course: "Soft Engineering", date: "2026-01-08", status: "Inactive" },
                { id: 6, name: "Smith Chisom", course: "AI Automation", date: "2026-01-09", status: "Active" },
                { id: 7, name: "Charles Darwin", course: "Frontend Development", date: "2026-01-12", status: "Active" },
                { id: 8, name: "Collins Great", course: "Copy Writting", date: "2026-01-14", status: "Inactive" },
                { id: 9, name: "Precious Mirabel", course: "UI/UX Design", date: "2026-01-22", status: "Active" },
                { id: 10, name: "Ester Smart", course: "Prject Management", date: "2026-01-23", status: "Active" },
                { id: 11, name: "Don Mark", course: "Cybersecurity", date: "2026-01-25", status: "Inactive" },
                { id: 12, name: "Rita Edward", course: "Data Analyst", date: "2026-01-26", status: "Active" },
            ];
            setStudents(defaultStudents);
            localStorage.setItem("students", JSON.stringify(defaultStudents));
        }

        if (savedInstructors) {
            setInstructors(JSON.parse(savedInstructors));
        } else {
            const defaultInstructors = [
                { id: 1, name: "Mr. David", course: "Frontend Development", date: "2026-01-02", status: "Active" },
                { id: 2, name: "Miss. Judith", course: "Backend Development", date: "2026-01-04", status: "Inactive" },
                { id: 3, name: "Mrs. Hope", course: "UI/UX Design", date: "2026-01-05", status: "Active" },
                { id: 4, name: "Mr. Lawson", course: "Virtual Assistance", date: "2026-01-07", status: "Active" },
                { id: 5, name: "Mr. Samson", course: "Soft Engineering", date: "2026-01-08", status: "Inactive" },
                { id: 6, name: "Mr. Prince", course: "AI Automation", date: "2026-01-09", status: "Active" },
                { id: 7, name: "Mr. Desmond", course: "Copy Writting", date: "2026-01-14", status: "Inactive" },
                { id: 8, name: "Miss. Deborah", course: "Prject Management", date: "2026-01-23", status: "Active" },
                { id: 9, name: "Mrs. Jane", course: "Cybersecurity", date: "2026-01-25", status: "Inactive" },
                { id: 10, name: "Miss. Rita", course: "Data Analyst", date: "2026-01-26", status: "Active" },
            ];
            setInstructors(defaultInstructors);
            localStorage.setItem("instructors", JSON.stringify(defaultInstructors));
        }

        if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
        } else {
            const defaultCourses = [
                { id: 1, title: "Frontend Development", duration: "12 Weeks", description: "Learn React, Tailwind, and modern CSS." },
                { id: 2, title: "Backend Development", duration: "10 Weeks", description: "Node.js, Express, and MongoDB." },
                { id: 3, title: "UI/UX Design", duration: "8 Weeks", description: "Figma, User Research, and Prototyping." },
                { id: 4, title: "Data Analyst", duration: "14 Weeks", description: "Python, SQL, and Data Visualization." },
            ];
            setCourses(defaultCourses);
            localStorage.setItem("courses", JSON.stringify(defaultCourses));
        }

        if (savedLog) setAttendanceLog(JSON.parse(savedLog));
        if (savedProfile) setProfile(JSON.parse(savedProfile));

        setLoading(false);
    }, []);

    // Persistence Effects
    useEffect(() => {
        if (!loading) localStorage.setItem("students", JSON.stringify(students));
    }, [students, loading]);

    useEffect(() => {
        if (!loading) localStorage.setItem("instructors", JSON.stringify(instructors));
    }, [instructors, loading]);

    useEffect(() => {
        if (!loading) localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses, loading]);

    useEffect(() => {
        if (!loading) localStorage.setItem("attendanceLog", JSON.stringify(attendanceLog));
    }, [attendanceLog, loading]);

    useEffect(() => {
        if (!loading) localStorage.setItem("profile", JSON.stringify(profile));
    }, [profile, loading]);

    // Actions
    const addStudent = (student) => {
        const newStudent = { ...student, id: Date.now(), date: new Date().toISOString().split('T')[0] };
        setStudents(prev => [newStudent, ...prev]);
        showToast("Student enrolled successfully!");
    };

    const updateStudent = (id, updatedData) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
        showToast("Student record updated!");
    };

    const deleteStudent = (id) => {
        setStudents(prev => prev.filter(s => s.id !== id));
        showToast("Student removed from database", "error");
    };

    const addInstructor = (instructor) => {
        const newInstructor = { ...instructor, id: Date.now(), date: new Date().toISOString().split('T')[0] };
        setInstructors(prev => [newInstructor, ...prev]);
        showToast("Instructor added successfully!");
    };

    const updateInstructor = (id, updatedData) => {
        setInstructors(prev => prev.map(i => i.id === id ? { ...i, ...updatedData } : i));
        showToast("Instructor profile updated!");
    };

    const deleteInstructor = (id) => {
        setInstructors(prev => prev.filter(i => i.id !== id));
        showToast("Instructor removed", "error");
    };

    const addCourse = (course) => {
        const newCourse = { ...course, id: Date.now() };
        setCourses(prev => [...prev, newCourse]);
        showToast("Course created successfully!");
    };

    const updateCourse = (id, updatedData) => {
        setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
        showToast("Course updated!");
    };

    const deleteCourse = (id) => {
        setCourses(prev => prev.filter(c => c.id !== id));
        showToast("Course deleted", "error");
    };

    const updateProfile = (data) => {
        setProfile(prev => ({ ...prev, ...data }));
        showToast("Profile settings saved!");
    };

    const saveAttendance = (date, records) => {
        const newEntry = { id: Date.now(), date, records };
        setAttendanceLog(prev => [newEntry, ...prev]);
        showToast(`Attendance for ${date} recorded!`);
    };

    return (
        <DataContext.Provider value={{
            students, instructors, courses, attendanceLog, loading,
            notifications, profile, searchQuery, setSearchQuery,
            addStudent, updateStudent, deleteStudent,
            addInstructor, updateInstructor, deleteInstructor,
            addCourse, updateCourse, deleteCourse,
            updateProfile, showToast, saveAttendance
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error("useData must be used within a DataProvider");
    return context;
};
