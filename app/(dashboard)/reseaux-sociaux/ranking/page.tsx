import RankingDataTable from "@/components/Ranking/RankingDataTable";
// import RankingFilters from "@/components/Ranking/RankingFilters";
import StockMarket from "@/components/StockMarket";

import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="px-2">
          <h2 className="text-3xl my-3 font-bold">Classement</h2>
          {/* <p className="text-sm text-gray-700 dark:text-gray-300">
              Générez et téléchargez des rapports détaillés sur vos performances sur
              les réseaux sociaux, les insights d&apos;audience et plus encore.
            </p> */}
        </div>
      <StockMarket />
      <Suspense>
        {/* <RankingFilters /> */}
        <RankingDataTable />
      </Suspense>
    </div>
  );
};

export default page;
