"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";

// ShareOfVoice palette used across the dashboard
const palette = [
  "#10B981", // green
  "#6B7280", // gray
  "#EF4444", // red
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

// Company list used elsewhere in the dashboard (keeps parity with ShareOfVoiceByMention)
const companies = [
  { key: "JumiaFood", label: "JumiaFood", color: "var(--chart-1)" },
  { key: "CareemNow", label: "CareemNow", color: "var(--chart-2)" },
  { key: "Yassir", label: "Yassir", color: "var(--chart-3)" },
  { key: "Koul", label: "Koul", color: "var(--chart-4)" },
  {key: "livry", label: "Livry", color: "var(--chart-5)"},
  { key: "Glovo", label: "Glovo", color: "var(--chart-6)" },
];

const chartConfig: ChartConfig = companies.reduce((acc, c) => {
  acc[c.key] = { label: c.label, color: c.color };
  return acc;
}, {} as ChartConfig);

// Example competitive data per source (values are illustrative — replace with real data)
// Raw mention counts per source (these will be normalized to percentage shares per row)
const rawData: Array<Record<string, number | string>> = [
  { source: "Instagram", JumiaFood: 320, CareemNow: 220, Yassir: 180, Koul: 150, livry: 90, Glovo: 130 },
  { source: "Facebook", JumiaFood: 280, CareemNow: 200, Yassir: 180, Koul: 180, livry: 160, Glovo: 160 },
  { source: "Tiktok", JumiaFood: 350, CareemNow: 250, Yassir: 200, Koul: 120, livry: 80, Glovo: 80 },
  { source: "X", JumiaFood: 250, CareemNow: 200, Yassir: 150, Koul: 200, livry: 200, Glovo: 200 },
  { source: "Youtube", JumiaFood: 300, CareemNow: 240, Yassir: 180, Koul: 160, livry: 120, Glovo: 120 },
  { source: "Press", JumiaFood: 430, CareemNow: 330, Yassir: 180, Koul: 460, livry: 320, Glovo: 320 },
];

// Normalize counts into percentage shares per source (each row sums to ~100)

export default function ShareOfVoiceBySourceCard() {
  const [showInsight, setShowInsight] = React.useState(false);

  return (
    <Card className="relative">
      <CardHeader className="items-center">
        <div className="flex items-center gap-2">
          <CardTitle>Share of Voice by Source Type</CardTitle>
          <ToolTipsProvider
            title="Share of voice by source type. Bars are stacked by brand to show how each channel contributes to total mentions."
          />
        </div>
      </CardHeader>

      <CardContent className="pb-16">
        <div className="text-center text-lg font-semibold mb-2">2021</div>
        <ChartContainer config={chartConfig} className="h-[360px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={rawData}
              layout="horizontal"
              margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
              barCategoryGap="20%"
              barGap={6}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="source"
                type="category"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis type="number" tickLine={false} axisLine={false} width={70} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />

              {companies.map((c) => (
                <Bar
                  key={c.key}
                  dataKey={c.key}
                  barSize={16}
                  fill={c.color}
                  isAnimationActive={false}
                >
                  {/* <LabelList dataKey={c.key} position="top" /> */}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="absolute bottom-4 left-6">
          <div className="relative">
            <div
              className="text-sm text-black flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setShowInsight(true)}
              onMouseLeave={() => setShowInsight(false)}
            >
              <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS" width={22} height={22} className="inline-block align-middle" />
              <span
                className="font-semibold"
                style={{
                  background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  display: "inline-block",
                }}
              >
                AI-powered insight
              </span>
            </div>

            {showInsight && (
              <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Facebook and YouTube drive the largest combined volumes, while Jumia and Careem are consistently present across channels. Use the stacked view to spot channel-specific strengths.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}