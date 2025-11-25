import {
  Headphones,
  Users,
  FileText,
  AtSign,
  Smile,
  Eye,
  BarChart2,
  Database,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Tableaux de bord",
    items: [
      {
        title: "Écoute Sociale ",
        url: "/",
        icon: Headphones,
      },
      {
        title: "Analyse d’Audience",
        url: "/competitive-intelligence",
        icon: Users,
      },
      {
        title: "Analyse des Publications",
        url: "/social-listening/fil-actualites",
        icon: FileText,
      },
      {
        title: "Mentions",
        url: "/reports",
        icon: AtSign, 
      },
      {
        title: "Sentiment",
        url: "/reseaux-sociaux/ranking",
        icon: Smile, 
      },
      // {
      //   title: "Brand Watch",
      //   url: "/reseaux-sociaux/brand-watch",
      //   icon: Megaphone, // brand monitoring
      // },
    ],
  },
  {
    id: 2,
    label: "Veille & Benchmark",
    items: [
      {
        title: "Veille marque",
        url: "/reseaux-sociaux/vue-ensemble",
        icon: Eye, // brand overview / monitoring
      },
      {
        title: "Veille concurrentielle",
        url: "/reseaux-sociaux/ranking",
        icon: BarChart2, // benchmarking / comparison charts
      },
      // {
      //   title: "Brand Watch",
      //   url: "/reseaux-sociaux/brand-watch",
      //   icon: Megaphone, // brand monitoring
      // }
    ],
  },
  {
    id: 3,
    label: "Intégrations",
    items: [
      {
        title: "Données et API",
        url: "/integrations/donnees-api",
        icon: Database,
        comingSoon: true,
      },
    ],
  },
];
