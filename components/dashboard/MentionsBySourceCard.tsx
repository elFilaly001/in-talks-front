"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import Image from "next/image";
import ToolTipsProvider from "../charts/ToolTipsProvider";

const mentionsByPeriodData = [
  { period: "1 Fev", x: 80, facebook: 40, instagram: 60, tiktok: 90, news: 15 },
  { period: "2 Mar", x: 95, facebook: 30, instagram: 55, tiktok: 110, news: 12 },
  { period: "3 Avr", x: 70, facebook: 35, instagram: 58, tiktok: 105, news: 18 },
  { period: "4 Mai", x: 75, facebook: 38, instagram: 62, tiktok: 98, news: 20 },
];

const mentionsByPeriodConfig = {
  x: {
    label: "Twitter/X",
    color: "#000000",
  },
  facebook: {
    label: "Facebook",
    color: "#f97316",
  },
  instagram: {
    label: "Instagram",
    color: "#ec4899",
  },
  tiktok: {
    label: "TikTok",
    color: "#d946ef",
  },
  news: {
    label: "News",
    color: "#38bdf8",
  },
};

export function MentionsBySourceCard() {
  const [showInsight1, setShowInsight1] = useState(false);
  return (
    <Card className="relative w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Répartition des Mentions par Source</CardTitle>
          <ToolTipsProvider
            title="Répartition des mentions sur différentes sources (ex : Facebook, X, Instagram) au fil du temps. Utilisez cela pour voir quels canaux génèrent le plus de conversations."
          />
        </div>
      </CardHeader>
      <CardContent className="pb-16">
        <ChartContainer config={mentionsByPeriodConfig}>
          <LineChart data={mentionsByPeriodData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="x"
              stroke={mentionsByPeriodConfig.x.color}
              strokeWidth={2}
              dot={false}
              name={mentionsByPeriodConfig.x.label}
            />
            <Line
              type="monotone"
              dataKey="facebook"
              stroke={mentionsByPeriodConfig.facebook.color}
              strokeWidth={2}
              dot={false}
              name={mentionsByPeriodConfig.facebook.label}
            />
            <Line
              type="monotone"
              dataKey="instagram"
              stroke={mentionsByPeriodConfig.instagram.color}
              strokeWidth={2}
              dot={false}
              name={mentionsByPeriodConfig.instagram.label}
            />
            <Line
              type="monotone"
              dataKey="tiktok"
              stroke={mentionsByPeriodConfig.tiktok.color}
              strokeWidth={2}
              dot={false}
              name={mentionsByPeriodConfig.tiktok.label}
            />
            <Line
              type="monotone"
              dataKey="news"
              stroke={mentionsByPeriodConfig.news.color}
              strokeWidth={2}
              dot={false}
              name={mentionsByPeriodConfig.news.label}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <div className="absolute bottom-4 left-6">
        <div className="relative">
          <div
            className="text-sm text-black flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowInsight1(true)}
            onMouseLeave={() => setShowInsight1(false)}
          >
            <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} className="inline-block align-middle" />
            <span
              className="font-semibold"
              style={{
                background: 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              AI-Powered Insight
            </span>
          </div>
          {showInsight1 && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Facebook domine les mentions sur les réseaux sociaux avec une part de 38%, indiquant une forte présence de la marque sur cette plateforme. Le graphique en barres empilées montre un engagement constant sur tous les réseaux au cours des trois périodes.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
