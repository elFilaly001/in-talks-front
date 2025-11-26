import React from "react";
import KeywordWithSetiments from "../dashboard/KeywordWithSetiments";
import MentionsBySentiments from "../dashboard/MentionsBySentiments";
import KeywordsWithSentiment from "../dashboard/KeywordsWithSentiment";
import TopLocationsWithSentiment from "../dashboard/TopLocationsWithSentiment";



const dataNetworks = [
  {
    name: "Facebook",
    actual: 82000,
    target: 90000,
    positive: 420,
    negative: 85,
    neutral: 195,
  },
  {
    name: "Instagram",
    actual: 48000,
    target: 65000,
    positive: 310,
    negative: 70,
    neutral: 120,
  },
  {
    name: "TikTok",
    actual: 34000,
    target: 45000,
    positive: 180,
    negative: 45,
    neutral: 75,
  },
  {
    name: "Twitter (X)",
    actual: 77000,
    target: 90000,
    positive: 395,
    negative: 90,
    neutral: 160,
  },
  {
    name: "LinkedIn",
    actual: 68000,
    target: 80000,
    positive: 330,
    negative: 65,
    neutral: 140,
  },
  {
    name: "YouTube",
    actual: 52000,
    target: 70000,
    positive: 290,
    negative: 50,
    neutral: 110,
  },
];

const Sentiment = () => {
  return (
    <div>
        
      <div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl my-3 font-extrabold tracking-tight text-gray-900 dark:text-white">
          Sentiments
        </h2>
        {/* <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-3xl">
          Générez et téléchargez des rapports détaillés sur vos performances sur
          les re9seaux sociaux, les insights d&apos;audience et plus encore.
        </p> */}
      </div>
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <MentionsBySentiments />
            <KeywordsWithSentiment />
            <div className="grid grid-cols-4 gap-6">
                <KeywordWithSetiments
              label="Sentiment par type de source"
              data={dataNetworks}
              tooltip={`Montre la répartition des sentiments par type de source pour les 7 derniers jours. Survolez chaque barre pour voir le nombre et le pourcentage par type de sentiment. Utilisez ces données pour identifier quelles sources génèrent des conversations positives ou négatives.`}
                />
                <TopLocationsWithSentiment/>
            </div>
        </div>
    </div>
  );
};

export default Sentiment;
