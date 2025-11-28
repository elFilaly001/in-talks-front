"use client";
import ChartGenderSplit from "../charts/ChartGenderSplit";
import ChartLangage from "../charts/ChartLangage";
import CountriesSplit from "../charts/CountriesSplit";
import QualitySplit from "../charts/QualitySplit";
import AgeGenderBreakdown from "../dashboard/AgeGenderBreakdown";
import AudienceSocialTable from "./AudienceSocialTable";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import Image from "next/image";
import Interset from "../charts/Interset";
import {
  BookmarkIcon,
  // Heart,
  // Users,
  DownloadCloud,
} from "lucide-react";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import { CompactDatePicker } from "../ui/CompactDatePicker";
import { Button } from "@/components/ui/button";
import { useState } from "react";
type DataType = {
  id: string;
  femalePercentage: number;
  malePercentage: number;
  unknownPercentage: number;
  realPercentage: number;
  fakePercentage: number;
  countries: string;
  cities: string;
  ageSplit: string;
  interest: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  networkId: string;
};

const data: DataType = {
  id: "cmhjwf73e0013kqz0in94r25z",
  femalePercentage: 52.17,
  malePercentage: 34.78,
  unknownPercentage: 13.04,
  realPercentage: 84.78,
  fakePercentage: 15.22,
  countries:
    '{"Morocco":60.87,"France":13.04,"Turkey":6.52,"Saudi Arabia":4.35,"Algeria":4.35,"Egypt":2.17,"undetermined":8.7}',
  cities:
    '{"Marrakech":15.22,"Tanger":8.7,"Casablanca":6.52,"Rabat":4.35,"Fes":4.35,"Istanbul":4.35,"undetermined":56.52}',
  ageSplit:
    '{"13-17":10.87,"18-24":45.65,"25-34":28.26,"35-44":6.52,"45-54":2.17,"55+":0,"undetermined":6.52}',
  interest:
    '{"Fashion & Beauty":10.87,"Food & Drink":45.65,"Tech & Innovation":28.26,"Culture & Entertainment":6.52}',
  language:
    '{"Arabic":60.87,"French":19.57,"English":8.7,"Turkish":4.35,"Spanish":2.17,"Portuguese":2.17,"undetermined":2.17}',
  createdAt: "2025-11-04T01:37:03.914Z",
  updatedAt: "2025-11-04T01:37:03.914Z",
  networkId: "cmhjwf16z0002kqz0qttwcbp8",
};

const media = [
  {
    label: "All Social Medias",
    // no image for the 'All' option - render an icon instead
  },
  {
    label: "Instagram",
    image: "/media/instagram.png",
  },
  {
    label: "Youtube",
    image: "/media/youtube.png",
  },
  {
    label: "X",
    image: "/media/twitter.png",
  },
  {
    label: "Tiktok",
    image: "/media/tiktok.png",
  },
  {
    label: "Facebook",
    image: "/media/facebook.png",
  },
  {
    label: "Linkedin",
    image: "/media/linkedin.png",
  },
];

// const postingFrequency = {
//   postingFrequency: {
//     avgPerDay: "0.11",
//     avgPerWeek: "0.75",
//     avgPerMonth: "3.00",
//     monthlyPosts: [
//       { date: "December 2024", count: 0 },
//       { date: "January 2025", count: 0 },
//       { date: "February 2025", count: 0 },
//       { date: "March 2025", count: 0 },
//       { date: "April 2025", count: 0 },
//       { date: "May 2025", count: 0 },
//       { date: "June 2025", count: 0 },
//       { date: "July 2025", count: 9 },
//       { date: "August 2025", count: 10 },
//       { date: "September 2025", count: 14 },
//       { date: "October 2025", count: 3 },
//       { date: "November 2025", count: 0 },
//     ],
//   },
// };

const chartData2 = [
  { month: "< 500", desktop: 186 },
  { month: "500 - 1k", desktop: 305 },
  { month: "1k - 1.5k", desktop: 237 },
  { month: "3k - 4.5k", desktop: 73 },
  { month: "5k - 10k", desktop: 209 },
  { month: "<1k", desktop: 214 },
];

const totalChart2 = chartData2.reduce((s, it) => s + (it.desktop || 0), 0);

function CustomBarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number; color?: string; payload?: { desktop?: number; fill?: string } }[];
  label?: string | number;
}) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0];
  const value = item?.value ?? item?.payload?.desktop ?? 0;
  const percent = totalChart2 ? Math.round((value / totalChart2) * 100) : 0;
  const color = item?.color || item?.payload?.fill || "var(--color-desktop)";

  return (
    <div className="bg-gray-900 text-white text-xs rounded-md px-2 py-1 shadow-lg flex items-center gap-2 whitespace-nowrap">
      <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: color }} />
      <div className="leading-none">
        <div className="font-medium">{label}</div>
        <div className="text-[11px] opacity-90">Audience %: {percent}</div>
      </div>
    </div>
  );
}

const chartConfig2 = {
  desktop: {
    label: "Desktop",
    color: "#9c0274",
  },
} satisfies ChartConfig;

const networks = [
  {
    network: "instagram",
    profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
    username: "glovo_maroc",
    name: "Glovo Maroc",
    followers: 122000,
    er: 2.5,
    avgEngage: 19000,
    avgViews: 211400,
    metrics: "85.4",
  },
  {
    network: "x",
    profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
    username: "glovo_x",
    name: "Glovo Maroc",
    followers: 45000,
    er: 1.8,
    avgEngage: 8000,
    avgViews: 90000,
    metrics: "80.2",
  },
  {
    network: "facebook",
    profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
    username: "glovo.fb",
    name: "Glovo Maroc",
    followers: 98000,
    er: 2.1,
    avgEngage: 12000,
    avgViews: 150000,
    metrics: "83.7",
  },
  {
    network: "youtube",
    profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
    username: "glovo_youtube",
    name: "Glovo Maroc",
    followers: 32000,
    er: 3.2,
    avgEngage: 5000,
    avgViews: 200000,
    metrics: "88.1",
  },
];

const AudienceReport = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined as Date | undefined,
    to: undefined as Date | undefined,
  });
  const [showInsight, setShowInsight] = useState(false);

  // UI state for export context
  const [metric] = useState<string | undefined>("followers");
  const [source, setSource] = useState<string | undefined>(undefined);

  // Build a simple CSV from the `data` object and current UI filters
  const handleExportCSV = () => {
    const rows: Array<{ key: string; value: string | number | undefined }> = [];

    // include selected filters
    rows.push({
      key: "Selected Metric",
      value:
        metric === "followers"
          ? "Followers"
          : metric === "likers"
            ? "Likers"
            : metric,
    });
    rows.push({
      key: "Date From",
      value: dateRange.from ? dateRange.from.toISOString() : "",
    });
    rows.push({
      key: "Date To",
      value: dateRange.to ? dateRange.to.toISOString() : "",
    });
    rows.push({ key: "Source", value: source ?? "All Social Medias" });

    // include top-level fields from data
    Object.entries(data).forEach(([k, v]) => {
      // if value looks like a JSON string of an object, expand it
      if (
        typeof v === "string" &&
        (v.trim().startsWith("{") || v.trim().startsWith("["))
      ) {
        try {
          const parsed = JSON.parse(v);
          if (parsed && typeof parsed === "object") {
            if (Array.isArray(parsed)) {
              rows.push({ key: k, value: JSON.stringify(parsed) });
            } else {
              Object.entries(parsed).forEach(([subk, subv]) => {
                rows.push({ key: `${k}:${subk}`, value: String(subv) });
              });
            }
            return;
          }
        } catch {
          // fall back to raw string
        }
      }

      // otherwise push raw
      rows.push({ key: k, value: String(v) });
    });

    const header = ["Metric", "Value"];
    const csv = [header.join(",")]
      .concat(
        rows.map(
          (r) =>
            `"${String(r.key).replace(/"/g, '""')}","${String(
              r.value ?? ""
            ).replace(/"/g, '""')}"`
        )
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
    a.download = `audience-report-${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-350 flex flex-col gap-3">
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Audience
          <div className="flex flex-row gap-1 mt-2  mb-4">
          <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
          <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>
      
      <AudienceSocialTable networks={networks} />

      {data && (
        <div className="overflow-x-auto">
          <div className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <QualitySplit
              percentages={{
                fakePeople: data.fakePercentage,
                realPeople: data?.realPercentage,
              }}
            />
            <ChartGenderSplit
              percentages={{
                male: data.malePercentage,
                female: data?.femalePercentage,
                unknown: data?.unknownPercentage,
              }}
            />

            <Card className="relative">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>
                    Répartition de la Portée de l&apos;Audience
                  </CardTitle>
                  <ToolTipsProvider
                    title={`Affiche le pourcentage d’abonnés segmentés selon le nombre de comptes qu’ils suivent : plus de 1 500, entre 1 000 et 1 500, 500 à 1 000, et moins de 500. Les abonnés qui suivent plus de 1 500 comptes sont moins susceptibles de voir du contenu sponsorisé.`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig2} className="aspect-none h-[340px] w-full">
                  <BarChart accessibilityLayer data={chartData2}>
                    <XAxis
                      dataKey="month"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis type="number" />
                    <ChartTooltip
                      cursor={false}
                      content={<CustomBarTooltip />}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={5}
                      barSize={50}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <div className="absolute bottom-4 left-6">
                <div className="relative">
                  <div
                    className="text-sm text-black flex items-center gap-2 cursor-pointer"
                    onMouseEnter={() => setShowInsight(true)}
                    onMouseLeave={() => setShowInsight(false)}
                  >
                    <Image
                      src="/icons/IN-TALKS-logo.png-2.webp"
                      alt="IN-TALKS Logo"
                      width={22}
                      height={22}
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    />
                    <span
                      className="font-semibold"
                      style={{
                        background:
                          "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        display: "inline-block",
                      }}
                    >
                      AI-Powered Insight
                    </span>
                  </div>
                  {showInsight && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        L&apos;analyse de la portée de l&apos;audience montre
                        que 60% des abonnés ont moins de 500 connexions, ce qui
                        indique un fort potentiel de portée organique.
                        Concentrez-vous sur l&apos;engagement de ce segment très
                        accessible pour maximiser la visibilité et
                        l&apos;interaction du contenu.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* {data.ageSplit && (
            <ChartAgeSplit
              data={
                JSON.parse(data.ageSplit.toString()) as Record<string, number>
              }
            />
          )} */}
            <AgeGenderBreakdown />

            {/* Group the last three cards into a single full-width row with an inner 3-column grid */}


            {data.countries && (
              <CountriesSplit
                title="Abonnés par Pays"
                data={JSON.parse(data.countries.toString())}
                tooltip={`Localisation de l’audience par pays.`}
              />
            )}

            {data.cities && (
              <CountriesSplit
                title="Abonnés par Ville"
                data={JSON.parse(data.cities.toString())}
                tooltip={`Localisation de l’audience par ville`}
              />
            )}

            <div className="col-span-1 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <BrandAffinity />

                {data.interest && (
                  <Interset
                    title="Affinité d&apos;Intérêt de l&apos;Audience"
                    data={JSON.parse(data.interest.toString())}
                  />
                )}

                {data.language && JSON.stringify(data.language) !== "{}" && (
                  <ChartLangage data={JSON.parse(data.language.toString())} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudienceReport;
