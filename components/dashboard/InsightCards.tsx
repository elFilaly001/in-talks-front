"use client"; 

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ToolTipsProvider from "../charts/ToolTipsProvider";

// Sample data for mentions over periods
const mentionsByPeriodData = [
  { period: "Period 1", facebook: 350, x: 320, instagram: 250, youtube: 180, tiktok: 150, linkedin: 120 },
  { period: "Period 2", facebook: 380, x: 340, instagram: 260, youtube: 200, tiktok: 170, linkedin: 140 },
  { period: "Period 3", facebook: 320, x: 340, instagram: 240, youtube: 190, tiktok: 160, linkedin: 130 },
];

const mentionsByPeriodConfig = {
  facebook: {
    label: "Facebook",
    color: "#1877f2",
  },
  x: {
    label: "X",
    color: "#000000",
  },
  instagram: {
    label: "Instagram",
    color: "#e4405f",
  },
  youtube: {
    label: "YouTube",
    color: "#ff0000",
  },
  tiktok: {
    label: "TikTok",
    color: "#00f2ea",
  },
  linkedin: {
    label: "LinkedIn",
    color: "#0077b5",
  },
};

const mentions = [
  {
    id: "1",
    title: "Glovo expands in Morocco",
    link: "https://example.com/thumb1.jpg ",
    postedDate: "2025-11-01",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is expanding its delivery services to more cities in Morocco, aiming to cover both major urban centers and smaller towns. This expansion includes increasing the number of delivery partners, introducing faster delivery times, and offering more variety in the types of goods available for delivery. The company is also investing in local marketing campaigns to raise awareness and attract new users to its platform.",
    source: "facebook",
    type: "POSITIVE",
  },
  {
    id: "2",
    title: "Fast Delivery Trends 2025",
    link: "https://example.com/fast-delivery-trends",
    postedDate: "2025-10-28",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "The fast delivery market in North Africa is experiencing significant growth in 2025, with trends showing an increase in demand for same-day delivery, more sustainable packaging solutions, and innovative technology integration. Companies like Glovo and other regional players are adapting by expanding their networks, improving logistics efficiency, and offering a wider range of products, from groceries to electronics. Consumers are increasingly relying on app-based delivery services for convenience and speed.",
    source: "facebook",
    type: "POSITIVE",
  },
  {
    id: "3",
    title: "Glovo partners with local restaurants",
    link: "https://example.com/glovo-partners",
    postedDate: "2025-10-30",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Glovo has partnered with over 50 local restaurants in Casablanca to expand its offerings and provide more diverse meal options to customers. However, some restaurant owners have raised concerns about commission fees and delivery logistics. While Glovo aims to strengthen its presence in the Moroccan market, balancing profitability for the restaurants and customer satisfaction remains a key challenge. The partnership is expected to increase overall app usage and drive more orders, but the company will need to address these concerns carefully.",
    source: "instagram",
    type: "NEGATIVE",
  },
  {
    id: "4",
    title: "Rabat sees growth in app-based deliveries",
    link: "https://example.com/rabat-growth",
    postedDate: "2025-10-25",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Rabat has seen a remarkable growth in app-based delivery services this year, with a 35% increase in demand compared to the previous year. The surge is driven by changing consumer behavior, urbanization, and the increasing availability of smartphones. Businesses across the city are integrating delivery apps to meet customer expectations, and logistics companies are upgrading their infrastructure to handle higher order volumes. Experts predict that this trend will continue as more residents embrace digital solutions for everyday needs, from food delivery to groceries and retail products.",
    source: "instagram",
    type: "Article",
  },
  {
    id: "5",
    title: "Glovo job opportunities in Morocco",
    link: "https://example.com/glovo-jobs",
    postedDate: "2025-10-20",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is actively hiring delivery partners, customer support staff, and other roles across Morocco as part of its expansion strategy. The company offers competitive benefits, flexible working hours, and opportunities for career growth. While some potential employees have expressed concerns about workload and job stability, Glovo continues to focus on creating an efficient recruitment process and training programs. The goal is to support the increasing demand for delivery services while maintaining high-quality service and customer satisfaction.",
    source: "tiktok",
    type: "NEGATIVE",
  },
];

export function InsightCards() {
  const [showInsight1, setShowInsight1] = useState(false);
  const [showInsight2, setShowInsight2] = useState(false);

 

  return (
    <div className="grid grid-cols-4 md:gap-6">
      <Card className="col-span-1 xl:col-span-2 relative">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Répartition des mentions par source</CardTitle>
            <ToolTipsProvider
              title="Répartition des mentions sur différentes sources (ex : Facebook, X, Instagram) au fil du temps. Utilisez cela pour voir quels canaux génèrent le plus de conversations."
            />
          </div>
        </CardHeader>
        <CardContent className="pb-16">
          <ChartContainer config={mentionsByPeriodConfig}>
            <BarChart data={mentionsByPeriodData}>
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
              <Bar
                dataKey="facebook"
                fill={mentionsByPeriodConfig.facebook.color}
                stackId="a"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="x"
                fill={mentionsByPeriodConfig.x.color}
                stackId="a"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="instagram"
                fill={mentionsByPeriodConfig.instagram.color}
                stackId="a"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="youtube"
                fill={mentionsByPeriodConfig.youtube.color}
                stackId="a"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="tiktok"
                fill={mentionsByPeriodConfig.tiktok.color}
                stackId="a"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="linkedin"
                fill={mentionsByPeriodConfig.linkedin.color}
                stackId="a"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
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
                Insights boostés par IA
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
      <Card className="col-span-1 xl:col-span-2 relative">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Dernières mentions</CardTitle>
            <ToolTipsProvider
              title="Dernières mentions provenant de différentes sources, offrant un accès rapide aux conversations et insights récents."
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5 pb-16">
          {mentions.slice(0, 3).map((feed) => (
            <div key={feed.id} className="flex items-center gap-5">
              <div
                className="h-16 w-16 rounded-md bg-gray-700 bg-cover bg-center"
                style={{ backgroundImage: `url(${feed.thumbnail})` }}
              ></div>
              <div className="flex flex-1 justify-between items-center">
                <div>
                  {feed.title}
                  {feed.snippet && (
                    <p
                      className="text-xs"
                      dangerouslySetInnerHTML={{
                        __html: feed.snippet.slice(0, 85),
                      }}
                    ></p>
                  )}
                </div>
                <div className="h-8 w-8 bg-main text-white rounded-full flex justify-center items-center">
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm" variant="outline" className="basis-1/2 mx-auto">
            Voir plus
          </Button>
        </CardFooter>
        <div className="absolute bottom-4 left-6">
          <div className="relative">
            <div 
              className="text-sm text-black flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setShowInsight2(true)}
              onMouseLeave={() => setShowInsight2(false)}
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
                Insights boostés par IA
              </span>
            </div>
            {showInsight2 && (
              <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Les mentions sur les réseaux sociaux montrent une augmentation de 25% du sentiment positif pour les services de livraison. Facebook arrive en tête avec 40% du total des mentions, suivi d&apos;Instagram à 30%. Les sujets clés incluent l&apos;expansion du service, les partenariats et l&apos;amélioration de la satisfaction client.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}