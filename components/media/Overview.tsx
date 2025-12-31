import React from "react";
import { SectionCards } from "../ui/section-cards";
import { InsightCards } from "../dashboard/InsightCards";
import { MentionsBySourceCard } from "../dashboard/MentionsBySourceCard";
import ChartSetiment from "../dashboard/ChartSetiment";
import ChartAreaInteractive from "../dashboard/chart-area-interactive";
import KeywordsNuage from "../dashboard/KeywordsNuage";
import { keywords as rawKeywords } from "@/data/keywords";
import ShareOfVoice from "../dashboard/ShareOfVoice";
import FilterOverView from "./FilterOverView";

const Overview = () => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Social listening 
          <div className="flex flex-row gap-1 mt-2  mb-4">
            <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
            <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>
      <FilterOverView />
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <SectionCards />
        <ChartAreaInteractive />
        <div className="grid grid-cols-2 gap-6">
          <InsightCards />
          <MentionsBySourceCard />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <ShareOfVoice />
          <ChartSetiment />
        </div>
        {/* Convert string[] to KeywordData[] with deterministic counts based on keyword index */}
        <KeywordsNuage
          keywords={rawKeywords.map((k, idx) => ({
            keyword: k,
            count: ((idx * 17 + 13) % 100) + 1,
          }))}
        />
      </div>
    </div>
  );
};

export default Overview;
