"use client";
import Profil from "@/components/media/Profil";
import React, { Suspense, useEffect, useState } from "react";
import Overview from "@/components/media/Overview";
import PostsGrid from "@/components/media/PostsGrid";
import AudienceReport from "@/components/media/AudienceReport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import Keywords from "@/components/media/Keywords";
import Sentiment from "@/components/media/Sentiment";
import MentionsPanel from "@/components/social-listening/MentionsPanel";
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
    component: <MentionsPanel />,
  },
  {
    label: "Sentiment",
    value: "sentiment",
    component: <Sentiment />,
  },
];

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = searchParams?.get("tab") ?? "overView";
  const [tabValue, setTabValue] = useState<string>(initial);

  useEffect(() => {
    const p = searchParams?.get("tab") ?? "overView";
    if (p !== tabValue) setTabValue(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString()]);

  return (
    <Suspense>
      <div className="@container/main flex flex-col">
        <Profil />
        <Tabs value={tabValue} onValueChange={(val) => {
          setTabValue(val);
          router.push(`/?tab=${val}`);
        }} className="my-2">
          <TabsList className="grid grid-cols-6 w-full b text-white border dark:border-gray-800 border-gray-200">
            {tabs.map((tab) => (
              <TabsTrigger
                className="flex-1 bg-white dark:data-[state=active]:bg-main data-[state=active]:bg-main data-[state=active]:text-white text-gray-700"
                key={tab.label}
                value={tab.value}
              // onClick={() => {
              //   handlechange(tab.value);
              // }}
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
