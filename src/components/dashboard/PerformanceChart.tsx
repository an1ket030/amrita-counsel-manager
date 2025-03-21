
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { CustomCard, CardHeader, CardTitle, CardContent } from "@/components/ui/CustomCard";

interface PerformanceData {
  name: string;
  CGPA: number;
  Attendance: number;
  Assignment: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  title: string;
  type?: "line" | "area";
  showAttendance?: boolean;
  showAssignment?: boolean;
  className?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  title,
  type = "line",
  showAttendance = true,
  showAssignment = true,
  className,
}) => {
  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey="name" 
          stroke="var(--muted-foreground)" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="var(--muted-foreground)" 
          fontSize={12}
          tickLine={false}
          domain={[0, 10]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
            color: "var(--foreground)",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="CGPA"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          dot={{ r: 4 }}
        />
        {showAttendance && (
          <Line
            type="monotone"
            dataKey="Attendance"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        )}
        {showAssignment && (
          <Line
            type="monotone"
            dataKey="Assignment"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey="name" 
          stroke="var(--muted-foreground)" 
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="var(--muted-foreground)" 
          fontSize={12}
          tickLine={false}
          domain={[0, 10]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
            color: "var(--foreground)",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="CGPA"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
        {showAttendance && (
          <Area
            type="monotone"
            dataKey="Attendance"
            fill="#10b981"
            fillOpacity={0.2}
            stroke="#10b981"
            strokeWidth={2}
          />
        )}
        {showAssignment && (
          <Area
            type="monotone"
            dataKey="Assignment"
            fill="#8b5cf6"
            fillOpacity={0.2}
            stroke="#8b5cf6"
            strokeWidth={2}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <CustomCard className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "line" ? renderLineChart() : renderAreaChart()}
      </CardContent>
    </CustomCard>
  );
};

export default PerformanceChart;
