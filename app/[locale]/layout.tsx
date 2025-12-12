import { IntlProvider } from "next-intl";
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import LocaleHeader from "@/components/layouts/LocaleHeader";
import AppSideBar from "@/components/layouts/AppSideBar";
import { cn } from "@/lib/utils";

type Props = {
  params: {
    locale: string;
  };
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "fr" },
  ];
}

export default async function LocaleLayout({ params, children }: Props) {
  // Wrap locale routes with the sidebar and restored header so all /[locale]/ pages have them.
  return (
    <SidebarProvider className="relative">
      <AppSideBar variant="sidebar" collapsible="icon" />
      <SidebarInset
        data-content-layout={"centered"}
        className={cn(
          "bg-[#eaeff9] !mx-0 !max-w-full w-full",
          "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto"
        )}
      >
        <LocaleHeader />
        <div className="h-full p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
