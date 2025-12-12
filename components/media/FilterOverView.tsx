import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { CompactDatePicker } from "../ui/CompactDatePicker";
import { Button } from "../ui/button";
import { Filter, RotateCcw, SlidersHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const media = [
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
const languages = [
  {
    label: "Tous",
    image: "https://flagcdn.com/48x36/un.png", // UN flag for "Tous"
  },
  {
    label: "Arabe",
    image: "https://flagcdn.com/48x36/sa.png", // Saudi Arabia flag
  },
  {
    label: "Français",
    image: "https://flagcdn.com/48x36/fr.png", // France flag
  },
  {
    label: "Anglais",
    image: "https://flagcdn.com/48x36/gb.png", // United Kingdom flag
  },
];

const FilterOverView = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined as Date | undefined,
    to: undefined as Date | undefined,
  });
  const [source, setSource] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [format, setFormat] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    setDateRange({ from: undefined, to: undefined });
    setSource("");
    setSentiment("");
    setAuthor("");
    setFormat("");
    setLanguage("");
    setCity("");
  };

  // Count active filters
  const activeFilters = [
    dateRange.from || dateRange.to,
    source,
    sentiment,
    author,
    format,
    language,
    city,
  ].filter(Boolean).length;

  // Reusable filter content
  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? "space-y-4" : "grid grid-cols-4 gap-2"}>
      <CompactDatePicker
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      <Select value={source} onValueChange={setSource}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="By source" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>By source</SelectLabel>
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
                        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute("width", "20");
                        svg.setAttribute("height", "20");
                        svg.setAttribute("viewBox", "0 0 24 24");
                        svg.innerHTML = '<path fill="black" d="M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z"/>';
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
                  <></>
                )}
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={sentiment} onValueChange={setSentiment}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="By sentiment" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>By sentiment </SelectLabel>
            {["Positif", "Neutre", "Négatif"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={author} onValueChange={setAuthor}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="By author" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>By author </SelectLabel>
            {["Tous", "Grand public", "Influenceurs", "Médias", "Concurrents"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={format} onValueChange={setFormat}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="By format" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>By format </SelectLabel>
            {["Tous", "Vidéo", "Publication", "Commentaire", "Article"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="By language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>By language </SelectLabel>
            {languages.map((item) => (
              <SelectItem key={item.label} value={item.label}>
                <Image
                  src={item.image}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="By city" />
        </SelectTrigger>
        <SelectContent className="h-[400px]">
          <SelectGroup>
            <SelectLabel>By city </SelectLabel>
            {[
              "Casablanca",
              "Rabat",
              "Fes",
              "Marrakech",
              "Tangier",
              "Agadir",
              "Meknes",
              "Oujda",
              "Kenitra",
              "Tetouan",
              "Safi",
              "Mohammedia",
              "Khouribga",
              "El Jadida",
              "Beni Mellal",
              "Nador",
              "Taza",
              "Settat",
              "Larache",
              "Ksar El Kebir",
            ].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className={isMobile ? "flex gap-2 pt-2" : "flex-1 flex items-center gap-2.5"}>
        <Button
          className="flex-1 bg-main"
          onClick={() => isMobile && setIsModalOpen(false)}
        >
          <Filter className="size-4" />
          Filtrer
        </Button>
        <Button
          className="bg-transparent border border-main text-main hover:bg-main/5"
          onClick={handleReset}
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:block">
        <FilterContent />
      </div>

      {/* Mobile View - Button to open modal */}
      <div className="md:hidden">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-white border-gray-200 justify-between"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="size-4" />
                Filtres
              </span>
              {activeFilters > 0 && (
                <Badge className="bg-main text-white text-xs px-2 py-0.5">
                  {activeFilters}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] p-0">
            <DialogHeader className="p-4 pb-2 border-b">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">Filter</DialogTitle>
                {activeFilters > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-main hover:text-main/80 hover:bg-main/5 h-8 px-2"
                    onClick={handleReset}
                  >
                    <RotateCcw className="size-3.5 mr-1" />
                    Default
                  </Button>
                )}
              </div>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-4">
              <FilterContent isMobile />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FilterOverView;
