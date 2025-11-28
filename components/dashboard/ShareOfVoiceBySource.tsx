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
  "#9c0274", // green
  "#ea1c80",
  "#8376ce", // red
  "#aea6cf", // gray
  "#ffbf26",
  "#ff0c00",
];

// Company list used elsewhere in the dashboard (keeps parity with ShareOfVoiceByMention)
const companies = [
  { key: "JumiaFood", label: "Jumia Food", color: palette[0] },
  { key: "YasserMarket", label: "Yasser Market", color: palette[1] },
  { key: "Kool", label: "Kool", color: palette[2] },
  { key: "Chari", label: "Chari", color: palette[3] },
  { key: "CreemFood", label: "Creem Food", color: palette[4] },
  { key: "Glovo", label: "Glovo", color: palette[5] },
];

const chartConfig: ChartConfig = companies.reduce((acc, c) => {
  acc[c.key] = { label: c.label, color: c.color };
  return acc;
}, {} as ChartConfig);

// Example competitive data per source (values are illustrative — replace with real data)
// Raw mention counts per source (these will be normalized to percentage shares per row)
const rawData: Array<Record<string, number | string>> = [
  { source: "Instagram", JumiaFood: 320, YasserMarket: 220, Kool: 180, Chari: 150, CreemFood: 90, Glovo: 130 },
  { source: "Facebook", JumiaFood: 280, YasserMarket: 200, Kool: 180, Chari: 180, CreemFood: 160, Glovo: 160 },
  { source: "Tiktok", JumiaFood: 350, YasserMarket: 250, Kool: 200, Chari: 120, CreemFood: 80, Glovo: 80 },
  { source: "X", JumiaFood: 250, YasserMarket: 200, Kool: 150, Chari: 200, CreemFood: 200, Glovo: 200 },
  { source: "Youtube", JumiaFood: 300, YasserMarket: 240, Kool: 180, Chari: 160, CreemFood: 120, Glovo: 120 },
  { source: "Press", JumiaFood: 430, YasserMarket: 330, Kool: 180, Chari: 460, CreemFood: 320, Glovo: 320 },
];

// Normalize counts into percentage shares per source (each row sums to ~100)

export default function ShareOfVoiceBySourceCard() {
  const [showInsight, setShowInsight] = React.useState(false);

  return (
    <Card className="relative">
      <CardHeader className="items-center">
        <div className="flex items-center gap-2">
          <CardTitle>Part de Voix par Source</CardTitle>
          <ToolTipsProvider
            title="Affiche la répartition de la part de voix des marques selon les différentes sources (Instagram, Facebook, X, TikTok, YouTube, LinkedIn). Ce graphique met en évidence quelles plateformes génèrent le plus de mentions pour chaque marque, permettant d’identifier les canaux les plus performants et les dynamiques de visibilité."
          />
        </div>
      </CardHeader>

      <CardContent className="pb-16">
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