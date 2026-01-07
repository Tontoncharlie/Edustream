"use client";

import React from "react";
import { useData } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const Toast = () => {
    const { notifications } = useData();

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {notifications.map((n) => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border ${n.type === "error"
                                ? "bg-red-50 border-red-100 dark:bg-red-950/30 dark:border-red-900/50 text-red-600 dark:text-red-400"
                                : "bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-white"
                            }`}
                    >
                        {n.type === "error" ? (
                            <AlertCircle size={20} className="shrink-0" />
                        ) : (
                            <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                        )}
                        <p className="text-sm font-semibold">{n.message}</p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
