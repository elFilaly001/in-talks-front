
"use client";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import formatNumber from "@/lib/numbers";
import { Badge } from "../ui/badge";
import Image from "next/image";

export interface Network {
  network: string;
  profil: string;
  username: string;
  name: string;
  followers: number;
  er: number;
  avgEngage: number;
  avgViews: number;
  metrics: string;
}

const SocialCoverage = ({ networks }: { networks: Network[] }) => {
  const columns: TableColumn<Network>[] = [
    {
      name: "Réseau social",
      sortable: true,
      selector: (row) => row.network,
      width: "350px",
      cell: (row) => (
        <div className="flex justify-center items-center p-3 gap-3">
          {/* Always use the network logo for the first icon */}
          {/* Try to load the network logo, fallback to SVG X icon if not found */}
          {row.network === "x" ? (
            <Image
              src="/media/x.png"
              alt="X logo"
              width={25}
              height={25}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  svg.setAttribute("width", "25");
                  svg.setAttribute("height", "25");
                  svg.setAttribute("viewBox", "0 0 24 24");
                  svg.innerHTML = '<path fill="black" d="M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z"/>';
                  parent.insertBefore(svg, parent.firstChild);
                }
              }}
            />
          ) : (
            <Image
              src={`/media/${row.network}.png`}
              alt={row.network + " logo"}
              width={25}
              height={25}
            />
          )}
          {/* Use the profile image for the second icon */}
          <Image
            src={row.profil}
            alt={row.name + " profile"}
            width={35}
            height={35}
            style={{ borderRadius: "50%" }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="text-center">
            <h6>{row.name}</h6>
            <p className="text-sm">@{row.username}</p>
          </div>
        </div>
      ),
    },
    {
      name: "Croissance (90 jours)",
      width: "150px",
      cell() {
        return (
          <Badge className="flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md">
            <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
            +5,2%
          </Badge>
        );
      },
    },
    {
      name: "Activité (90 jours)",
      width: "150px",
      cell() {
        return <p>10 publications / mois</p>;
      },
    },

    {
      name: "Score",
      width: "150px",
      sortable: true,
      selector: (row) => Number(row.metrics),
      cell: (row) => (
        <div className="">
          <Badge className="flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md">
            <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
            {row.metrics} %
          </Badge>
        </div>
      ),
    },
    {
      name: "Abonnés",
      sortable: true,
      selector: (row) => row.followers ?? 0,
      cell: (row) => (
        <div className="">
          {row.followers ? <p>{formatNumber(row.followers)}</p> : <p>-</p>}
        </div>
      ),
    },
    {
      name: "Dernière activité",
      width: "150px",
      sortable: true,
      selector: (row) => row.followers ?? 0,
      cell: () => (
        <div className="">
          <Badge className="flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md text-xs">
            <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
            Cette semaine
          </Badge>
        </div>
      ),
    },
    {
      name: "Taux d&apos;engagement %",
      sortable: true,
      selector: (row) => row.er ?? 0,
      cell: (row) => (
        <div className="">
          <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
          {row.er ? <p>{formatNumber(row.er)} %</p> : <p>-</p>}
        </div>
      ),
    },
    {
      name: "Moy. interactions",
      width: "150px",
      sortable: true,
      selector: (row) => row.avgEngage ?? 0,
      cell: (row) => (
        <div className="">
          <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
          {row.avgEngage ? <p>{formatNumber(row.avgEngage)}</p> : <p>-</p>}
        </div>
      ),
    },
    {
      name: "Moy. vues",
      width: "150px",
      sortable: true,
      selector: (row) => row.avgViews ?? 0,
      cell: (row) => (
        <div className="">
          <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
          {row.avgViews ? <p>{formatNumber(row.avgViews)}</p> : <p>-</p>}
        </div>
      ),
    },
    {
      name: "Habitudes de publication",
      width: "250px",
      cell() {
        return <p>deux fois par semaine à 18h</p>;
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={networks} />
    </div>
  );
};

export default SocialCoverage;
