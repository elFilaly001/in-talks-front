"use client";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import formatNumber from "@/lib/numbers";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { CompactDatePicker } from "../ui/CompactDatePicker";
import { DownloadCloud, BookmarkIcon } from "lucide-react";
import Image from "next/image";

interface DateRange {
    from: Date | undefined;
    to: Date | undefined;
}

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

const media = [
    {
        label: "All Social Medias",
        // no image for the 'All' option - render an icon instead
    },
    {
        label: "Instagram",
        image: "/media/instagram.png",
    },
    {
        label: "Youtube",
        image: "/media/youtube.png",
    },
    {
        label: "X",
        image: "/media/twitter.png",
    },
    {
        label: "Tiktok",
        image: "/media/tiktok.png",
    },
    {
        label: "Facebook",
        image: "/media/facebook.png",
    },
    {
        label: "Linkedin",
        image: "/media/linkedin.png",
    },
];

const AudienceSocialTable = ({
    networks,
    title = "Tableau de Performance Multicanal"
}: AudienceSocialTableProps) => {
    const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
    const [source, setSource] = useState<string>("All Social Medias");

    const handleExportCSV = () => {
        // CSV export logic
        const headers = ["Network", "Username", "Name", "Followers", "ER", "Avg Engage", "Avg Views", "Metrics"];
        const csvContent = [
            headers.join(","),
            ...networks.map(row =>
                [row.network, row.username, row.name, row.followers, row.er, row.avgEngage, row.avgViews, row.metrics].join(",")
            )
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "audience_social_table.csv";
        link.click();
    };

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
            <h5 className="text-xl text-gray-500 font-medium">{title}</h5>

            <div className="flex justify-between items-center pt-4 pb-4">
                {/* Left side: Export button */}
                <div className="flex items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportCSV}
                        className=""
                    >
                        <DownloadCloud className="mr-2 h-4 w-4" />
                        Exporter CSV
                    </Button>
                </div>

                {/* Right side: controls group */}
                <div className="flex items-center gap-2">
                    <CompactDatePicker
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                    />
                    <Select value={source} onValueChange={(v) => setSource(v)}>
                        <SelectTrigger className="w-40 bg-white">
                            <SelectValue placeholder="Par source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Par source</SelectLabel>
                                {media.map((item) => (
                                    <SelectItem key={item.label} value={item.label}>
                                        {item.label === "X" ? (
                                            <Image
                                                src="/media/twitter.png"
                                                alt="X logo"
                                                width={20}
                                                height={20}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        const svg = document.createElementNS(
                                                            "http://www.w3.org/2000/svg",
                                                            "svg"
                                                        );
                                                        svg.setAttribute("width", "20");
                                                        svg.setAttribute("height", "20");
                                                        svg.setAttribute("viewBox", "0 0 24 24");
                                                        svg.innerHTML =
                                                            '<path fill="black" d="M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z"/>';
                                                        parent.insertBefore(svg, parent.firstChild);
                                                    }
                                                }}
                                            />
                                        ) : item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.label}
                                                width={20}
                                                height={20}
                                            />
                                        ) : (
                                            <BookmarkIcon className="h-4 w-4 text-gray-500 mr-2" />
                                        )}
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <DataTable columns={columns} data={networks} />
        </div>
    );
};

export default AudienceSocialTable;
