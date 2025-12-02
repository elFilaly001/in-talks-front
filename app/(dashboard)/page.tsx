"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initial = searchParams?.get("tab") ?? "overView";
  const [tabValue, setTabValue] = useState<string>(initial);

  useEffect(() => {
    const p = searchParams?.get("tab") ?? "overView";
    if (p !== tabValue) setTabValue(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString()]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to InTalks</h1>
      <p className="mt-3 text-neutral-600">This is your workspace. Use the sidebar to open different dashboard sections.</p>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
