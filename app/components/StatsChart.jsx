"use client";

import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Mon", count: 4 },
    { name: "Tue", count: 7 },
    { name: "Wed", count: 5 },
    { name: "Thu", count: 12 },
    { name: "Fri", count: 9 },
    { name: "Sat", count: 15 },
    { name: "Sun", count: 10 },
];

const StatsChart = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="h-[300px] w-full p-6 bg-card rounded-2xl border border-border shadow-sm flex items-center justify-center">
            <p className="text-muted-foreground text-sm italic transition-colors">Loading chart...</p>
        </div>
    );

    return (
        <div className="h-[300px] w-full p-6 bg-card rounded-2xl border border-border shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold text-foreground transition-colors">
                    Registration Activity
                </h4>
                <select className="text-xs bg-secondary text-muted-foreground border-none rounded-md px-2 py-1 outline-none">
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "currentColor" }}
                        className="text-muted-foreground/60"
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "currentColor" }}
                        className="text-muted-foreground/60"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            color: "var(--foreground)",
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        }}
                        itemStyle={{ color: "var(--primary)" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorCount)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatsChart;
