"use client";

import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { User2, Edit, Trash2, Calendar, BookOpen, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import AddStudentForm from "./AddStudentForm";

const StudentTable = () => {
  const { students, deleteStudent, updateStudent, loading, showToast, searchQuery } = useData();

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(id);
    }
  };

  const handleEdit = (e, student) => {
    e.preventDefault();
    e.stopPropagation();

    setStudentToEdit(student);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailsModalOpen(true);
  };

  if (!mounted || loading) return <div className="p-8 text-center text-slate-400">Loading registry...</div>;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s, index) => (
              <motion.div
                layout
                key={s.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => handleViewDetails(s)}
                className="group relative bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer border-t-4 border-t-primary text-card-foreground"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    <User2 size={24} />
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleEdit(e, s)}
                      className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, s.id)}
                      className="p-2 bg-secondary hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground truncate">
                  {s.name}
                </h3>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors">
                    <BookOpen size={14} className="text-primary" />
                    <span className="truncate">{s.course}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground/60 transition-colors">
                    <Calendar size={14} />
                    <span>{new Date(s.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${s.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                      }`}
                  >
                    {s.status}
                  </span>
                  <span className="text-primary text-xs font-semibold hover:underline">
                    View Details
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Search size={48} className="mb-4 opacity-10" />
              <p className="text-lg font-medium">No students found matching your search</p>
              <p className="text-sm">Try searching for a name or course</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Student Details"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <User2 size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground">{selectedStudent.name}</h4>
                <p className="text-muted-foreground">{selectedStudent.course}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-secondary rounded-xl">
                <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Status</p>
                <p className="font-semibold text-foreground">{selectedStudent.status}</p>
              </div>
              <div className="p-3 bg-secondary rounded-xl">
                <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Enrollment Date</p>
                <p className="font-semibold text-foreground">{new Date(selectedStudent.date).toLocaleDateString()}</p>
              </div>
            </div>

            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:opacity-80 transition-opacity"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student"
      >
        {studentToEdit && (
          <AddStudentForm
            initialData={studentToEdit}
            onSubmit={(data) => {
              updateStudent(studentToEdit.id, data);
              setIsEditModalOpen(false);
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};
export default StudentTable;
