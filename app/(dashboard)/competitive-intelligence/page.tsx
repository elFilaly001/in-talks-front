
import ShareOfVoiceByMentionsDonut from "@/components/dashboard/ShareOfVoiceByMentions";
import ShareOfVoiceBySourceCard from "@/components/dashboard/ShareOfVoiceBySource";
import CompetitiveIntelligenceTable from "@/components/media/CompetitiveIntelligenceTable";
import React from "react";

const networks = [
  {
    network: "instagram",
    profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
    username: "glovo_ma",
    name: "Glovo Maroc",
    followers: 122000,
    er: 2.5,
    avgEngage: 19000,
    avgViews: 211400,
    metrics: "85.4/100",
  },
  {
    network: "instagram",
    profil:
      "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/32229526303.jpg",
    username: "Yassir.ma",
    name: "Yassir.ma",
    followers: 42000,
    er: 1.5,
    avgEngage: 19000,
    avgViews: 21400,
    metrics: "75.4/100",
  },
];

const page = () => {
  return (
    <div className="@container/main flex flex-col">
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Veille Concurrentielle
          <div className="flex flex-row gap-1 mt-2  mb-4">
          <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
          <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>
      <div className="flex flex-col gap-5 container mx-auto">
        <CompetitiveIntelligenceTable
          networks={networks}
          title="Analyse Concurrentielle"
        />
        <ShareOfVoiceByMentionsDonut />
        <ShareOfVoiceBySourceCard />
        {/* <div className="grid grid-cols-2 gap-5">
          <KeywordWithSetiments
            label="Sentiment by Source Type"
            data={dataNetworks}
          />
        </div> */}
      </div>
    </div>
  );
};

export default page;
