"use client";
import Profil from "@/components/media/Profil";
import React, { Suspense } from "react";
import Overview from "@/components/media/Overview";
import PostsGrid from "@/components/media/PostsGrid";
import AudienceReport from "@/components/media/AudienceReport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sentiment from "@/components/media/Sentiment";
import MentionsFeed from "@/components/media/MentionsFeed";
const tabs = [
  {
    label: "Écoute sociale",
    value: "overView",
    component: <Overview />,
  },
  {
    label: "Audience",
    value: "audience",
    component: <AudienceReport />,
  },
  {
    label: "Publications",
    value: "posts",
    component: <PostsGrid />,
  },
  {
    label: "Mentions",
    value: "mentions",
    component: <MentionsFeed />,
  },
  {
    label: "Sentiment",
    value: "sentiment",
    component: <Sentiment />,
  },
];

const Page = () => {
  return (
    <Suspense>
      <div className="@container/main flex flex-col">
        <Profil />
        <Tabs defaultValue={"overView"} className="my-2">
          <TabsList className="flex w-full text-white border dark:border-gray-800 border-gray-200">
            {tabs.map((tab) => (
              <TabsTrigger
                className="flex-1 bg-white dark:data-[state=active]:bg-main data-[state=active]:bg-main data-[state=active]:text-white text-gray-700"
                key={tab.label}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.component} 
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Suspense>
  );
};

export default Page;
