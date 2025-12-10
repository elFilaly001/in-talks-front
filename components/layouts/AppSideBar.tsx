"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarItems } from "./sidebar-items";

import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import Image from "next/image";

export default function   AppSideBar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state, setOpen } = useSidebar();

  return (
    <Sidebar
      {...props}
      onMouseEnter={() => setOpen?.(true)}
      onMouseLeave={() => setOpen?.(false)}
    >
      <div className=" h-[60px]">
        {state == "expanded" ? (
          <Image
            src={"/logo.webp"}
            className="p-2"
            alt="Logo"
            width={140}
            height={85}
          />
        ) : (
          <Image
            src={"/icons/IN-TALKS-logo.png-2.webp"}
            className="py-2"
            alt="Logo"
            width={40}
            height={40}
          />
        )}
      </div>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
