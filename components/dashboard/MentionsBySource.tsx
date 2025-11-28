"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ToolTipsProvider from "../charts/ToolTipsProvider"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts"
import Image from "next/image"
import formatNumber from "@/lib/numbers"

const followersData = [
  {
    name: "YouTube",
    value: 50000,
    label: 50000,
    color: "#FF0000",
    icon: "/media/youtube.png",
  },
  {
    name: "Instagram",
    value: 150000,
    label: 150000,
    color: "#E4405F",
    icon: "/media/instagram.png",
  },
  {
    name: "TikTok",
    value: 175000,
    label: 175000,
    color: "#000000",
    icon: "/media/tiktok.png",
  },
  {
    name: "Twitter",
    value: 60000,
    label: 60000,
    color: "#1DA1F2",
    icon: "/media/twitter.png?v=12",
  },
  {
    name: "LinkedIn",
    value: 20000,
    label: 20000,
    color: "#0077B5",
    icon: "/media/linkedin.png",
  },
  {
    name: "Facebook",
    value: 110000,
    label: 110000,
    color: "#1877F2",
    icon: "/media/facebook.png",
  },
].sort((a, b) => b.value - a.value)

interface TooltipPayload {
  name: string;
  value: number;
  label: number;
  color: string;
  icon: string;
  totalValue?: number;
  percent?: number;
}

interface PayloadItem {
  payload: TooltipPayload;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15))" }}
      />
    </g>
  );
};

const CustomPieTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const entry = payload[0].payload;
    const total = entry.totalValue || followersData.reduce((sum, p) => sum + p.value, 0);
    const percent = total ? ((entry.value / total) * 100).toFixed(1) : "0";

    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg shadow-xl px-4 py-3 min-w-[140px] z-[9999] relative">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-semibold text-gray-900 dark:text-white text-sm">
            {entry.name}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500 dark:text-gray-400 text-xs">Mentions</span>
          <span className="font-bold text-gray-900 dark:text-white text-sm">
            {formatNumber(entry.value)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 mt-1">
          <span className="text-gray-500 dark:text-gray-400 text-xs">Share</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
            {percent}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function MentionsBySource() {
  const [showInsight, setShowInsight] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)
  const totalValue = followersData.reduce((sum, entry) => sum + entry.value, 0)
  const chartData = followersData.map((entry) => ({
    ...entry,
    totalValue,
    percent: ((entry.value / totalValue) * 100).toFixed(1)
  }))

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(undefined)
  }

  return (
    <Card className="flex-1 relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">Mentions par source</CardTitle>
            <ToolTipsProvider title="Répartition des mentions par plateforme sociale, montrant la portée et l'engagement sur chaque canal." />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-16">
        <div className="flex items-center gap-6">
          {/* Donut Chart */}
          <div className="relative flex-shrink-0">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  stroke="transparent"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} wrapperStyle={{ zIndex: 100 }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(totalValue)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Total
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 flex-1">
            {chartData.map((entry, index) => (
              <div
                key={`legend-${index}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                <Image
                  src={entry.icon}
                  alt={entry.name}
                  width={20}
                  height={20}
                  className="rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {entry.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white ml-2">
                      {formatNumber(entry.value)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${entry.percent}%`,
                          backgroundColor: entry.color
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right">
                      {entry.percent}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      {/* AI Insight Footer */}
      <div className="absolute bottom-4 left-6 right-6">
        <div className="relative">
          <div
            className="text-sm flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setShowInsight(true)}
            onMouseLeave={() => setShowInsight(false)}
          >
            <Image
              src="/icons/IN-TALKS-logo.png-2.webp"
              alt="IN-TALKS Logo"
              width={20}
              height={20}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span
              className="font-medium text-sm"
              style={{
                background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI-powered insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 w-auto min-w-80 max-w-xl backdrop-blur-sm">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                TikTok leads with 175K followers, followed by Instagram at 150K, indicating strong visual content engagement. Facebook and LinkedIn show solid presence, while YouTube and Twitter have room for growth in follower acquisition.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}