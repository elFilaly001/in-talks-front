
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
      <div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl my-3 font-extrabold tracking-tight text-gray-900 dark:text-white">
          Veille Concurrentielle
        </h2>
        {/* <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-3xl">
          Générez et téléchargez des rapports détaillés sur vos performances sur
          les re9seaux sociaux, les insights d&apos;audience et plus encore.
        </p> */}
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
