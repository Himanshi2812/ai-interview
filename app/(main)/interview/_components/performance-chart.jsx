"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
    //   const formattedData = assessments.map((assessment) => ({
    //     date: format(new Date(assessment.createdAt), "MMM dd"),
    //     score: assessment.quizScore,
    //   }));
    const formattedData = assessments
  .map((assessment) => ({
    date: format(new Date(assessment.createdAt), "MMM dd"),
    score: Number(assessment.quizScore) || 0, // convert to number, default 0
  }))
  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // sort by date

      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(111,98,86,0.25)" />
              <XAxis dataKey="date" tick={{ fill: "currentColor", fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "currentColor", fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-card border border-border/80 rounded-lg p-3 shadow-xl">
                        <p className="text-sm font-medium">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
               type="monotone"
               dataKey="score"
               stroke="#0f766e"
               strokeWidth={3}
               dot={{ r: 4, fill: "#0f766e" }}
              activeDot={{ r: 6 }}
               />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

