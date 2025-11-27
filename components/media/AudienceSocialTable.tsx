"use client";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import formatNumber from "@/lib/numbers";
import { Badge } from "../ui/badge";

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

export interface AudienceSocialTableProps {
    networks: Network[];
    title?: string;
}

const AudienceSocialTable = ({
    networks,
    title = "Tableau de Performance Multicanal"
}: AudienceSocialTableProps) => {

    // Map network names to actual image files
    const getNetworkImage = (network: string) => {
        if (network === "x") return "/media/twitter.png";
        return `/media/${network}.png`;
    };

    const columns: TableColumn<Network>[] = [
        {
            name: "Source",
            sortable: true,
            selector: (row) => row.network,
            width: "350px",
            cell: (row) => (
                <div className="flex justify-center items-center p-3 gap-3">
                    {/* Network logo */}
                    <img
                        src={getNetworkImage(row.network)}
                        alt={row.network + " logo"}
                        width={25}
                        height={25}
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                        }}
                    />
                    {/* Profile image */}
                    {row.profil && (
                        <img
                            src={row.profil}
                            alt={row.name + " profile"}
                            width={35}
                            height={35}
                            style={{ borderRadius: "50%", objectFit: 'cover' }}
                            onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                            }}
                        />
                    )}
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
            name: "Taux d'engagement %",
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
            <h5 className="text-xl font-semibold mb-4">{title}</h5>
            <DataTable columns={columns} data={networks} />
        </div>
    );
};

export default AudienceSocialTable;
