"use client";

import React, { useState, useEffect } from 'react';
import InstructorTable from '../components/InstructorTable';
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Modal from "../components/Modal";
import AddInstructorForm from "../components/AddInstructorForm";
import { useData } from "../context/DataContext";

const InstructorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addInstructor } = useData();
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
          <h1 className="text-3xl font-bold text-foreground">Instructors Hub</h1>
          <p className="text-muted-foreground transition-colors">View and manage workspace experts and teachers.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/20 transition-all active:scale-95 self-start md:self-auto"
        >
          <Plus size={18} />
          Onboard Instructor
        </button>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <InstructorTable />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Onboard New Instructor"
      >
        <AddInstructorForm
          onSubmit={(data) => {
            addInstructor(data);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </motion.div>
  );
}

export default InstructorsPage;
