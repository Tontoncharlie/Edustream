"use client";

import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { User2, Edit, Trash2, BookOpen, Star, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import AddInstructorForm from "./AddInstructorForm";

const InstructorTable = () => {
  const { instructors, deleteInstructor, updateInstructor, loading, showToast, searchQuery } = useData();

  const filteredInstructors = instructors.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.course.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [instructorToEdit, setInstructorToEdit] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to remove this instructor?")) {
      deleteInstructor(id);
    }
  };

  const handleEdit = (e, instructor) => {
    e.preventDefault();
    e.stopPropagation();
    setInstructorToEdit(instructor);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (instructor) => {
    setSelectedInstructor(instructor);
    setIsDetailsModalOpen(true);
  };

  if (!mounted || loading) return <div className="p-8 text-center text-slate-400">Loading records...</div>;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredInstructors.length > 0 ? (
            filteredInstructors.map((s, index) => (
              <motion.div
                layout
                key={s.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => handleViewDetails(s)}
                className="group relative bg-card text-card-foreground border border-border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all cursor-pointer border-t-4 border-t-purple-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                    <User2 size={24} />
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleEdit(e, s)}
                      className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-purple-500 transition-colors"
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen size={14} className="text-purple-500" />
                    <span className="truncate">{s.course}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-500 font-medium tracking-tight">
                    <Star size={14} fill="currentColor" />
                    <span>Senior Instructor</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.status === "Active"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                  >
                    {s.status}
                  </span>
                  <span className="text-purple-600 text-xs font-semibold hover:underline">
                    View Details
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">No instructors found</p>
              <p className="text-sm">Try searching for a different name or specialty</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Instructor Details"
      >
        {selectedInstructor && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                <User2 size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold">{selectedInstructor.name}</h4>
                <p className="text-slate-500">{selectedInstructor.course}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Status</p>
                <p className="font-semibold">{selectedInstructor.status}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Experience</p>
                <p className="font-semibold text-amber-500">Senior Level</p>
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
        title="Edit Instructor"
      >
        {instructorToEdit && (
          <AddInstructorForm
            initialData={instructorToEdit}
            onSubmit={(data) => {
              updateInstructor(instructorToEdit.id, data);
              setIsEditModalOpen(false);
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default InstructorTable;
