"use client";

import React, { useState, useEffect } from 'react';
import StudentTable from '../components/StudentTable';
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import Modal from "../components/Modal";
import AddStudentForm from "../components/AddStudentForm";
import { useData } from "../context/DataContext";

const StudentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addStudent } = useData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground transition-colors">Students Registry</h1>
          <p className="text-muted-foreground transition-colors">Manage and oversee all enrolled students.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95 self-start md:self-auto"
        >
          <Plus size={18} />
          Add New Student
        </button>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <StudentTable />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Student"
      >
        <AddStudentForm
          onSubmit={(data) => {
            addStudent(data);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </motion.div>
  );
}

export default StudentsPage;
