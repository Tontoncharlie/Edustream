"use client";

import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Settings, User, Bell, Shield, Moon, Sun, Save, Tablet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SettingsPage = () => {
    const { profile, updateProfile, loading } = useData();
    const [localProfile, setLocalProfile] = useState(profile);
    const [activeTab, setActiveTab] = useState("profile");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!loading) setLocalProfile(profile);
    }, [profile, loading]);

    const handleSave = (e) => {
        if (e) e.preventDefault();
        updateProfile(localProfile);
    };

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground">
                    Settings
                </h3>
                <p className="text-muted-foreground mt-1">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Links */}
                <div className="space-y-2">
                    {[
                        { id: "profile", label: "Profile", icon: User },
                        { id: "notifications", label: "Notifications", icon: Bell },
                        { id: "security", label: "Security", icon: Shield },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                ? "bg-card text-primary font-bold shadow-sm border border-primary/20"
                                : "text-muted-foreground hover:bg-card"
                                }`}
                        >
                            <tab.icon size={20} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        {activeTab === "profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-6"
                            >
                                <form onSubmit={handleSave} className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
                                    <div className="flex items-center gap-4 pb-6 border-b border-border">
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                                            {localProfile.name?.charAt(0) || "A"}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-foreground">{localProfile.name}</h4>
                                            <p className="text-sm text-muted-foreground">{localProfile.role}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground">Full Name</label>
                                            <input
                                                type="text"
                                                value={localProfile.name}
                                                onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground">Email Address</label>
                                            <input
                                                type="email"
                                                value={localProfile.email}
                                                onChange={(e) => setLocalProfile({ ...localProfile, email: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl flex items-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                                        >
                                            <Save size={18} />
                                            Save Profile
                                        </button>
                                    </div>
                                </form>

                                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                                    <h4 className="font-bold text-lg mb-6 text-foreground">Display Preferences</h4>
                                    <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                                                <Sun size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">Dark Mode</p>
                                                <p className="text-xs text-muted-foreground">Sync with system preferences</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "notifications" && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6"
                            >
                                <h4 className="font-bold text-lg mb-4 text-foreground">Notification Settings</h4>
                                <div className="space-y-4">
                                    {[
                                        { label: "Email Notifications", desc: "Receive updates about new enrollments via email.", checked: true },
                                        { label: "Browser Alerts", desc: "Show desktop notifications for system events.", checked: localProfile.notifications },
                                        { label: "Course Updates", desc: "Get notified when course content changes.", checked: false },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 hover:bg-secondary rounded-2xl transition-colors">
                                            <div>
                                                <p className="font-bold text-foreground">{item.label}</p>
                                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                                            </div>
                                            <div
                                                onClick={() => setLocalProfile({ ...localProfile, notifications: !localProfile.notifications })}
                                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${item.checked ? 'bg-primary' : 'bg-muted'}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-card transition-transform ${item.checked ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button onClick={handleSave} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-all">
                                        <Save size={18} /> Update Preferences
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "security" && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6"
                            >
                                <h4 className="font-bold text-lg mb-4 text-foreground">Security & Privacy</h4>
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-start gap-4">
                                    <Shield className="text-red-500 shrink-0" size={20} />
                                    <div>
                                        <p className="font-bold text-red-600 dark:text-red-400">Enhanced Protection</p>
                                        <p className="text-xs text-red-500/80">Your account is currently using basic password protection. Enable 2FA for better security.</p>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-foreground">Two-Factor Authentication</p>
                                            <p className="text-xs text-muted-foreground">Secure your account with an extra layer of safety.</p>
                                        </div>
                                        <button className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors">
                                            Configure
                                        </button>
                                    </div>
                                    <div className="h-[1px] bg-slate-100 dark:bg-slate-800" />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-foreground">Change Password</p>
                                            <p className="text-xs text-muted-foreground">Regularly update your password to stay safe.</p>
                                        </div>
                                        <button className="px-4 py-2 border border-border text-xs font-bold rounded-lg hover:bg-secondary transition-colors text-foreground">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default SettingsPage;
