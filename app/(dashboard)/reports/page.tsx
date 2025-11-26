"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Download,
  Eye,
  MessageCircle,
  Smile,
  TrendingUp,
} from "lucide-react";
import { CompactDatePicker } from "@/components/ui/CompactDatePicker";
import { useState } from "react";

const reports = [
  {
    id: "overview",
    title: "Rapport d'écoute sociale",
    desc: "Obtenez une vue complète de la présence digitale de votre marque — mentions, portée, sentiment et engagement, le tout sur un seul tableau de bord.",
    href: "/reports/overview",
    Icon: Eye,
    image: "/In-talks-ReportProject.webp",
  },
  {
    id: "mentions",
    title: "Rapport de mentions",
    desc: "Suivez les mentions totales et journalières sur l'ensemble des canaux pour comprendre les pics de visibilité et les tendances d'activité de l'audience.",
    href: "/reports/mentions-summary",
    Icon: MessageCircle,
    image: "/In-talks-ReportProject.webp",
  },
  {
    id: "sentiment",
    title: "Rapport de sentiment",
    desc: "Analysez le ton des conversations pour identifier les tendances positives, neutres et négatives qui influencent la réputation de votre marque.",
    href: "/reports/sentiment",
    Icon: Smile,
    image: "/In-talks-ReportProject.webp",
  },
  {
    id: "competitive",
    title: "Rapport de veille concurrentielle",
    desc: "Comparez la performance de votre marque à celle de vos concurrents via les mentions, la part de voix et le sentiment pour repérer opportunités et menaces.",
    href: "/reports/share-of-voice",
    Icon: TrendingUp,
    image: "/In-talks-ReportProject.webp",
  },
];

const Page = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined as Date | undefined,
    to: undefined as Date | undefined,
  });
  return (
    <div className="@container/main mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl my-3 font-extrabold tracking-tight text-gray-900 dark:text-white">
          Rapports
        </h2>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-3xl">
          Générez et téléchargez des rapports détaillés sur vos performances sur
              les réseaux sociaux, les insights d&apos;audience et plus encore.
        </p>
      </div>
          <CompactDatePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 pt-2 gap-6">
          {reports.map((r) => (
            <Link key={r.id} href={r.href} className="block">
              <Card className="relative hover:shadow-lg transition-shadow h-full flex flex-col justify-between overflow-hidden">
                {/* header band / thumbnail */}
                <Image
                  src={r.image}
                  alt={r.title}
                  width={480}
                  height={256}
                  className="w-full h-64 object-cover"
                />

                <CardContent className="pt-0 pb-1">
                  <CardHeader className="p-0 mb-0">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <r.Icon className="w-5 h-5 text-sky-600" />
                      <span className="font-medium">{r.title}</span>
                    </CardTitle>
                  </CardHeader>

                  <p className="text-sm text-muted-foreground mb-2">{r.desc}</p>

                  <div className="mt-6">
                    <div className="w-full h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center gap-2 text-sky-600 font-medium hover:bg-sky-100 cursor-pointer transition">
                      Télécharger
                      <Download className="w-4 h-4 text-sky-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
