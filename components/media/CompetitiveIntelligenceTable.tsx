"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import DataTable, { TableColumn } from "react-data-table-component";
import formatNumber from "@/lib/numbers";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";
import { Plus } from "lucide-react";

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

export interface CompetitiveIntelligenceTableProps {
    networks: Network[];
    title?: string;
}

// sample competitors data for multiple platforms
// Competitors: Jumia Food, Yasser Market, Kool, Livery, Creem Food, Glovo
const SAMPLE_NETWORKS: Network[] = [
    // Jumia Food - all platforms
    {
        network: "instagram",
        profil: "https://cdn.aptoide.com/imgs/b/8/4/b84ee69bc09da7c22a422229906bccd5_icon.jpg?w=128",
        username: "jumiafood.ma",
        name: "Jumia Food",
        followers: 156000,
        er: 2.8,
        avgEngage: 22000,
        avgViews: 245000,
        metrics: "87",
    },
    {
        network: "facebook",
        profil: "https://cdn.aptoide.com/imgs/b/8/4/b84ee69bc09da7c22a422229906bccd5_icon.jpg?w=128",
        username: "jumiafoodmaroc",
        name: "Jumia Food",
        followers: 420000,
        er: 2.1,
        avgEngage: 8500,
        avgViews: 125000,
        metrics: "82",
    },
    {
        network: "x",
        profil: "https://cdn.aptoide.com/imgs/b/8/4/b84ee69bc09da7c22a422229906bccd5_icon.jpg?w=128",
        username: "jumiafood_ma",
        name: "Jumia Food",
        followers: 24000,
        er: 1.4,
        avgEngage: 1100,
        avgViews: 18000,
        metrics: "68",
    },
    {
        network: "tiktok",
        profil: "https://cdn.aptoide.com/imgs/b/8/4/b84ee69bc09da7c22a422229906bccd5_icon.jpg?w=128",
        username: "jumiafood.maroc",
        name: "Jumia Food",
        followers: 112000,
        er: 6.5,
        avgEngage: 55000,
        avgViews: 1200000,
        metrics: "93",
    },
    {
        network: "youtube",
        profil: "https://cdn.aptoide.com/imgs/b/8/4/b84ee69bc09da7c22a422229906bccd5_icon.jpg?w=128",
        username: "JumiaFoodMaroc",
        name: "Jumia Food",
        followers: 12000,
        er: 3.4,
        avgEngage: 1800,
        avgViews: 65000,
        metrics: "72",
    },
    {
        network: "linkedin",
        profil: "https://cdn.aptoide.com/imgs/b/8/4/b84ee69bc09da7c22a422229906bccd5_icon.jpg?w=128",
        username: "jumia-food-maroc",
        name: "Jumia Food",
        followers: 32000,
        er: 2.6,
        avgEngage: 4200,
        avgViews: 38000,
        metrics: "76",
    },


    // Kool - all platforms
    {
        network: "instagram",
        profil: "https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w480-h960-rw",
        username: "kool.ma",
        name: "Kool",
        followers: 72000,
        er: 2.4,
        avgEngage: 9500,
        avgViews: 98000,
        metrics: "76",
    },
    {
        network: "facebook",
        profil: "https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w480-h960-rw",
        username: "koolmaroc",
        name: "Kool",
        followers: 195000,
        er: 1.5,
        avgEngage: 3800,
        avgViews: 52000,
        metrics: "68",
    },
    {
        network: "x",
        profil: "https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w480-h960-rw",
        username: "kool_ma",
        name: "Kool",
        followers: 11000,
        er: 0.9,
        avgEngage: 420,
        avgViews: 6200,
        metrics: "52",
    },
    {
        network: "tiktok",
        profil: "https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w480-h960-rw",
        username: "kool.maroc",
        name: "Kool",
        followers: 58000,
        er: 5.8,
        avgEngage: 32000,
        avgViews: 580000,
        metrics: "84",
    },
    {
        network: "youtube",
        profil: "https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w480-h960-rw",
        username: "KoolMaroc",
        name: "Kool",
        followers: 4200,
        er: 2.2,
        avgEngage: 520,
        avgViews: 22000,
        metrics: "56",
    },
    {
        network: "linkedin",
        profil: "https://play-lh.googleusercontent.com/iT7fPfobm4I1fv56GEvWxdgx41FX24dYQaP37XWE82-4hkSQPHt3mf0JPlPz9IV407KX=w480-h960-rw",
        username: "kool-maroc",
        name: "Kool",
        followers: 15000,
        er: 1.8,
        avgEngage: 1800,
        avgViews: 16000,
        metrics: "63",
    },

    // Chari - all platforms
    {
        network: "instagram",
        profil: "https://www.zonidra.com/wp-content/uploads/2023/03/logo-chari-Maroc.jpg.webp",
        username: "chari.ma",
        name: "Chari",
        followers: 54000,
        er: 2.6,
        avgEngage: 7800,
        avgViews: 72000,
        metrics: "73",
    },
    {
        network: "facebook",
        profil: "https://www.zonidra.com/wp-content/uploads/2023/03/logo-chari-Maroc.jpg.webp",
        username: "charimaroc",
        name: "Chari",
        followers: 142000,
        er: 1.4,
        avgEngage: 2900,
        avgViews: 42000,
        metrics: "65",
    },
    {
        network: "x",
        profil: "https://www.zonidra.com/wp-content/uploads/2023/03/logo-chari-Maroc.jpg.webp",
        username: "chari_ma",
        name: "Chari",
        followers: 8500,
        er: 0.8,
        avgEngage: 320,
        avgViews: 4800,
        metrics: "48",
    },
    {
        network: "tiktok",
        profil: "https://www.zonidra.com/wp-content/uploads/2023/03/logo-chari-Maroc.jpg.webp",
        username: "chari.maroc",
        name: "Chari",
        followers: 45000,
        er: 5.2,
        avgEngage: 24000,
        avgViews: 420000,
        metrics: "81",
    },
    {
        network: "youtube",
        profil: "https://www.zonidra.com/wp-content/uploads/2023/03/logo-chari-Maroc.jpg.webp",
        username: "ChariMaroc",
        name: "Chari",
        followers: 3100,
        er: 1.9,
        avgEngage: 380,
        avgViews: 15000,
        metrics: "51",
    },
    {
        network: "linkedin",
        profil: "https://www.zonidra.com/wp-content/uploads/2023/03/logo-chari-Maroc.jpg.webp",
        username: "chari-morocco",
        name: "Chari",
        followers: 11000,
        er: 1.5,
        avgEngage: 1200,
        avgViews: 12000,
        metrics: "58",
    },

    // Creem Food - all platforms
    {
        network: "instagram",
        profil: "https://brand.careem.com/wp-content/uploads/2023/03/logo1.svg",
        username: "creemfood.ma",
        name: "Creem Food",
        followers: 38000,
        er: 2.0,
        avgEngage: 5200,
        avgViews: 48000,
        metrics: "68",
    },
    {
        network: "facebook",
        profil: "https://brand.careem.com/wp-content/uploads/2023/03/logo1.svg",
        username: "creemfoodmaroc",
        name: "Creem Food",
        followers: 95000,
        er: 1.2,
        avgEngage: 1800,
        avgViews: 28000,
        metrics: "59",
    },
    {
        network: "x",
        profil: "https://brand.careem.com/wp-content/uploads/2023/03/logo1.svg",
        username: "creemfood_ma",
        name: "Creem Food",
        followers: 5800,
        er: 0.7,
        avgEngage: 210,
        avgViews: 3200,
        metrics: "44",
    },
    {
        network: "tiktok",
        profil: "https://brand.careem.com/wp-content/uploads/2023/03/logo1.svg",
        username: "creemfood.maroc",
        name: "Creem Food",
        followers: 28000,
        er: 4.8,
        avgEngage: 15000,
        avgViews: 280000,
        metrics: "78",
    },
    {
        network: "youtube",
        profil: "https://brand.careem.com/wp-content/uploads/2023/03/logo1.svg",
        username: "CreemFoodMaroc",
        name: "Creem Food",
        followers: 1800,
        er: 1.6,
        avgEngage: 220,
        avgViews: 9500,
        metrics: "46",
    },
    {
        network: "linkedin",
        profil: "https://brand.careem.com/wp-content/uploads/2023/03/logo1.svg",
        username: "creem-food-maroc",
        name: "Creem Food",
        followers: 7500,
        er: 1.3,
        avgEngage: 780,
        avgViews: 8200,
        metrics: "54",
    },

    // Glovo - all platforms
    {
        network: "instagram",
        profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
        username: "glovo_ma",
        name: "Glovo",
        followers: 48000,
        er: 2.3,
        avgEngage: 6500,
        avgViews: 62000,
        metrics: "71",
    },
    {
        network: "facebook",
        profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
        username: "glovomaroc",
        name: "Glovo",
        followers: 125000,
        er: 1.3,
        avgEngage: 2400,
        avgViews: 35000,
        metrics: "62",
    },
    {
        network: "x",
        profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
        username: "glovoapp_ma",
        name: "Glovo",
        followers: 7200,
        er: 0.8,
        avgEngage: 280,
        avgViews: 4100,
        metrics: "46",
    },
    {
        network: "tiktok",
        profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
        username: "glovo.maroc",
        name: "Glovo",
        followers: 35000,
        er: 5.0,
        avgEngage: 18000,
        avgViews: 340000,
        metrics: "79",
    },
    {
        network: "youtube",
        profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
        username: "GlovoMaroc",
        name: "Glovo",
        followers: 2400,
        er: 1.8,
        avgEngage: 290,
        avgViews: 12000,
        metrics: "49",
    },
    {
        network: "linkedin",
        profil: "/glovo/483195916_1532010537473174_2632696751857179851_n.jpg",
        username: "glovo-maroc",
        name: "Glovo",
        followers: 9500,
        er: 1.4,
        avgEngage: 980,
        avgViews: 9800,
        metrics: "56",
    },
];

interface NewCompetitorForm {
    name: string;
    profil: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    x: string;
    youtube: string;
    linkedin: string;
}

const extractUsername = (input: string): string => {
    if (!input) return "";
    // If it's a URL, extract the username
    try {
        const url = new URL(input);
        const pathname = url.pathname.replace(/^\/+|\/+$/g, ""); // Remove leading/trailing slashes
        // Handle different URL patterns
        const parts = pathname.split("/");
        return parts[0] || "";
    } catch {
        // Not a URL, return as-is (remove @ if present)
        return input.replace(/^@/, "");
    }
};

const CompetitiveIntelligenceTable = ({
    networks,
    title = "Analyse Concurrentielle"
}: CompetitiveIntelligenceTableProps) => {
    const [selectedSource, setSelectedSource] = useState<string>("instagram");
    const [showSourceMenu, setShowSourceMenu] = useState(false);
    const menuAnchorRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number } | null>(null);

    // State for managing custom competitors
    const [customCompetitors, setCustomCompetitors] = useState<Network[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newCompetitor, setNewCompetitor] = useState<NewCompetitorForm>({
        name: "",
        profil: "",
        instagram: "",
        facebook: "",
        tiktok: "",
        x: "",
        youtube: "",
        linkedin: "",
    });

    const handleAddCompetitor = () => {
        if (!newCompetitor.name) return;

        const newNetworks: Network[] = [];
        const platforms = ["instagram", "facebook", "tiktok", "x", "youtube", "linkedin"] as const;

        platforms.forEach((platform) => {
            const usernameOrLink = newCompetitor[platform];
            if (usernameOrLink) {
                const username = extractUsername(usernameOrLink);
                newNetworks.push({
                    network: platform,
                    profil: newCompetitor.profil || "",
                    username: username,
                    name: newCompetitor.name,
                    followers: 0,
                    er: 0,
                    avgEngage: 0,
                    avgViews: 0,
                    metrics: "0",
                });
            }
        });

        if (newNetworks.length > 0) {
            setCustomCompetitors((prev) => [...prev, ...newNetworks]);
        }

        setNewCompetitor({
            name: "",
            profil: "",
            instagram: "",
            facebook: "",
            tiktok: "",
            x: "",
            youtube: "",
            linkedin: "",
        });
        setIsAddDialogOpen(false);
    };

    // position the portal menu when opened
    useEffect(() => {
        if (!showSourceMenu) return;
        const anchor = menuAnchorRef.current;
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        const menuWidth = 176;
        const left = Math.max(8, rect.right - menuWidth + window.scrollX);
        const top = rect.bottom + window.scrollY + 4;
        setMenuPosition({ top, left, width: menuWidth });

        const handleOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (menuRef.current && menuRef.current.contains(target)) return;
            if (anchor.contains(target)) return;
            setShowSourceMenu(false);
        };

        const handleResize = () => setShowSourceMenu(false);

        document.addEventListener("mousedown", handleOutside);
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize, true);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleResize, true);
        };
    }, [showSourceMenu]);

    // merge incoming networks with sampleNetworks but avoid duplicates by username
    const mergedNetworks = useMemo(() => {
        const map = new Map<string, Network>();
        // add provided networks first
        (networks || []).forEach((n) => {
            if (n && n.username) map.set(n.username, n);
        });
        // add samples if they don't exist
        SAMPLE_NETWORKS.forEach((s) => {
            if (!map.has(s.username)) map.set(s.username, s);
        });
        // add custom competitors
        customCompetitors.forEach((c) => {
            if (!map.has(c.username)) map.set(c.username, c);
        });
        return Array.from(map.values());
    }, [networks, customCompetitors]);

    // apply source filter
    const displayedNetworks = useMemo(() => {
        return mergedNetworks.filter((n) => n.network === selectedSource);
    }, [mergedNetworks, selectedSource]);

    // Map network names to actual image files
    const getNetworkImage = (network: string) => {
        if (network === "x") return "/media/twitter.png";
        return `/media/${network}.png`;
    };

    const columns: TableColumn<Network>[] = [
        {
            name: (
                <div className="flex items-center">
                    <div className="relative" ref={menuAnchorRef}>
                        <button
                            type="button"
                            aria-label="Filtrer par source"
                            onClick={() => setShowSourceMenu((s) => !s)}
                            className="flex items-center gap-2 border px-3 py-1.5 rounded-md bg-white text-sm w-[160px]"
                        >
                            <img
                                src={getNetworkImage(selectedSource)}
                                alt={selectedSource}
                                width={16}
                                height={16}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                            <span className="capitalize flex-1 text-left">
                                {selectedSource === "x" ? "X" : selectedSource}
                            </span>
                            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.657a.75.75 0 01-1.12 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {showSourceMenu &&
                            menuPosition &&
                            createPortal(
                                <ul
                                    ref={menuRef}
                                    className="bg-white border rounded-md shadow-md"
                                    style={{
                                        position: "absolute",
                                        top: menuPosition.top,
                                        left: menuPosition.left,
                                        width: 180,
                                        zIndex: 99999,
                                    }}
                                >
                                    <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("instagram"); setShowSourceMenu(false); }}>
                                        <img src="/media/instagram.png" alt="instagram" width={16} height={16} />
                                        <span>Instagram</span>
                                    </li>
                                    <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("tiktok"); setShowSourceMenu(false); }}>
                                        <img src="/media/tiktok.png" alt="tiktok" width={16} height={16} />
                                        <span>TikTok</span>
                                    </li>
                                    <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("x"); setShowSourceMenu(false); }}>
                                        <img src="/media/twitter.png" alt="x" width={16} height={16} />
                                        <span>X</span>
                                    </li>
                                    <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("youtube"); setShowSourceMenu(false); }}>
                                        <img src="/media/youtube.png" alt="youtube" width={16} height={16} />
                                        <span>YouTube</span>
                                    </li>
                                    <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("facebook"); setShowSourceMenu(false); }}>
                                        <img src="/media/facebook.png" alt="facebook" width={16} height={16} />
                                        <span>Facebook</span>
                                    </li>
                                    <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("linkedin"); setShowSourceMenu(false); }}>
                                        <img src="/media/linkedin.png" alt="linkedin" width={16} height={16} />
                                        <span>LinkedIn</span>
                                    </li>
                                </ul>,
                                document.body
                            )}
                    </div>
                </div>
            ),
            sortable: false,
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
                    {/* Profile/Company logo */}
                    <div
                        className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0"
                    >
                        {row.profil ? (
                            <img
                                src={row.profil}
                                alt={row.name + " profile"}
                                width={35}
                                height={35}
                                style={{ borderRadius: "50%", objectFit: 'cover', width: '100%', height: '100%' }}
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    // Show initials as fallback
                                    const parent = target.parentElement;
                                    if (parent) {
                                        parent.innerHTML = `<span class="text-xs font-semibold text-gray-500">${row.name.charAt(0).toUpperCase()}</span>`;
                                    }
                                }}
                            />
                        ) : (
                            <span className="text-xs font-semibold text-gray-500">{row.name.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    <div className="text-left">
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

    const conditionalRowStyles = [{ when: (row: Network) => row.name.toLowerCase().includes("glovo"), style: { background: "linear-gradient(90deg, rgba(53, 185, 244, 0.5) 0%, rgba(48, 172, 206, 0.5) 100%)" } }];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl text-gray-400 font-semibold">{title}</h5>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Ajouter un concurrent
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter un nouveau concurrent</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-left">
                                    Nom
                                </Label>
                                <Input
                                    id="name"
                                    value={newCompetitor.name}
                                    onChange={(e) =>
                                        setNewCompetitor((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className="col-span-3"
                                    placeholder="Ex: Glovo"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="profil" className="text-left">
                                    URL Logo
                                </Label>
                                <Input
                                    id="profil"
                                    value={newCompetitor.profil}
                                    onChange={(e) =>
                                        setNewCompetitor((prev) => ({ ...prev, profil: e.target.value }))
                                    }
                                    className="col-span-3"
                                    placeholder="https://example.com/logo.png (optionnel)"
                                />
                            </div>
                            <div className="border-t pt-4 mt-2">
                                <p className="text-sm text-muted-foreground mb-3">Réseaux sociaux (username ou lien)</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="instagram" className="text-left flex items-center justify-start gap-2">
                                    <img src="/media/instagram.png" alt="instagram" width={16} height={16} />
                                    Instagram
                                </Label>
                                <Input
                                    id="instagram"
                                    value={newCompetitor.instagram}
                                    onChange={(e) =>
                                        setNewCompetitor((prev) => ({ ...prev, instagram: e.target.value }))
                                    }
                                    className="col-span-3"
                                    placeholder="@username ou https://instagram.com/username"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="facebook" className="text-left flex items-center justify-start gap-2">
                                    <img src="/media/facebook.png" alt="facebook" width={16} height={16} />
                                    Facebook
                                </Label>
                                <Input
                                    id="facebook"
                                    value={newCompetitor.facebook}
                                    onChange={(e) =>
                                        setNewCompetitor((prev) => ({ ...prev, facebook: e.target.value }))
                                    }
                                    className="col-span-3"
                                    placeholder="@username ou https://facebook.com/username"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tiktok" className="text-left flex items-center justify-start gap-2">
                                    <img src="/media/tiktok.png" alt="tiktok" width={16} height={16} />
                                    TikTok
                                </Label>
                                <Input
                                    id="tiktok"
                                    value={newCompetitor.tiktok}
                                    onChange={(e) =>
                                        setNewCompetitor((prev) => ({ ...prev, tiktok: e.target.value }))
                                    }
                                    className="col-span-3"
                                    placeholder="@username ou https://tiktok.com/@username"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="x" className="text-left flex items-center justify-start gap-2">
                                    <img src="/media/twitter.png" alt="x" width={16} height={16} />
                                    X
                                </Label>
                                <Input
                                    id="x"
                                    value={newCompetitor.x}
                                    onChange={(e) =>
                                        setNewCompetitor((prev) => ({ ...prev, x: e.target.value }))
                                    }
                                    className="col-span-3"
                                    placeholder="@username ou https://x.com/username"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="youtube" className="text-left flex items-center justify-start gap-2">
                                    <img src="/media/youtube.png" alt="youtube" width={16} height={16} />
                                    YouTube
                                </Label>
                                <Input
                                    id="youtube"
                                    value={newCompetitor.youtube}
                                    onChange={(e) =>
                                        setNewCompetitor((prev) => ({ ...prev, youtube: e.target.value }))
                                    }
                                    className="col-span-3"
                                    placeholder="@channel ou https://youtube.com/@channel"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="linkedin" className="text-left flex items-center justify-start gap-2">
                                    <img src="/media/linkedin.png" alt="linkedin" width={16} height={16} />
                                    LinkedIn
                                </Label>
                                <Input
                                    id="linkedin"
                                    value={newCompetitor.linkedin}
                                    onChange={(e) =>
                                        setNewCompetitor((prev) => ({ ...prev, linkedin: e.target.value }))
                                    }
                                    className="col-span-3"
                                    placeholder="company-name ou https://linkedin.com/company/name"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Annuler</Button>
                            </DialogClose>
                            <Button
                                onClick={handleAddCompetitor}
                                disabled={!newCompetitor.name || (!newCompetitor.instagram && !newCompetitor.facebook && !newCompetitor.tiktok && !newCompetitor.x && !newCompetitor.youtube && !newCompetitor.linkedin)}
                            >
                                Ajouter
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={columns} data={displayedNetworks} conditionalRowStyles={conditionalRowStyles} />
        </div>
    );
};

export default CompetitiveIntelligenceTable;
