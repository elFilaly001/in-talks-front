import React, { useState } from "react";
import FeedCard from "./FeedCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import MentionPagination from "./MentionPagination";
import ExportButton from "../ui/ExportButton";

const mentionsData = [
  {
    id: "cmj0453qd00030l3mkagfxjzu",
    title: "Élégance et confort pour vos appartements",
    link: "https://www.instagram.com/massinart.ma/p/C-lZv_vNeOn/",
    postedDate: "2024-08-12",
    thumbnail: "/massinart/125003786_190659399287819_7034797341339919248_n.jpg",
    snippet: "Nous sommes ravis de contribuer à l'élégance et au confort de vos appartements 🌟👌",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj04548w00040l3m0bdk0ejx",
    title: "Photos clients : Merci de nous avoir choisis ❤️",
    link: "https://www.instagram.com/massinart.ma/p/C2awZizNgYZ/",
    postedDate: "2024-01-22",
    thumbnail: "/massinart/125501384_1524614727729320_763500987854682863_n.jpg",
    snippet: "Les photos réelles de nos clients parlent d'elles-mêmes. Merci de nous avoir choisis !",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0454qw00050l3mhozg3672",
    title: "Le tableau, une expression puissante",
    link: "https://www.instagram.com/massinart.ma/p/C1-EwMwt4on/",
    postedDate: "2024-01-11",
    thumbnail: "/massinart/126553678_1055730511541447_6801924916327054791_n.jpg",
    snippet: "Le tableau n'est pas simplement décoratif, mais une expression puissante qui éclaire l'âme de l'espace.",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj04556e00060l3mdgrj5xo2",
    title: "Chefs-d'œuvre livrés partout au Maroc",
    link: "https://www.instagram.com/massinart.ma/p/CwL0mLEtx2b/",
    postedDate: "2023-08-20",
    thumbnail: "/massinart/137220838_812010759528813_6165508280218479197_n.jpg",
    snippet: "Chaque jour, nos clients nous surprennent avec leurs photos de nos tableaux livrés partout au Maroc.",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0455m500070l3m1rcb355o",
    title: "Portrait 'African Tribal' : Fierté culturelle",
    link: "https://www.instagram.com/massinart.ma/p/CswjmfxNLyj/",
    postedDate: "2023-05-27",
    thumbnail: "/massinart/153510614_885762142248884_4699986030568484371_n.jpg",
    snippet: "Sentez le rythme vibrant de portrait 'African Tribal', une célébration de la diversité et de la fierté culturelle.",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj04564l00080l3m2n4ohitu",
    title: "Ambiance positive au travail",
    link: "https://www.instagram.com/massinart.ma/p/Cnh84KtKhl4/",
    postedDate: "2023-01-17",
    thumbnail: "/massinart/163110704_914373496048469_6893751915895547772_n.jpg",
    snippet: "Intégrez des tableaux d'art pour une ambiance de travail positive !",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0456dr00090l3mhp47gt4b",
    title: "Happy Clients, Happy Us !",
    link: "https://www.instagram.com/massinart.ma/p/ChsiQ8EqZza/",
    postedDate: "2022-08-25",
    thumbnail: "/massinart/164233082_2935753496711451_8231549723413694347_n.jpg",
    snippet: "Photos reçues de nos chers clients satisfaits à 100% Merci de nous avoir choisis ❤️",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0456mm000a0l3me85qmysx",
    title: "Essayez +1000 tableaux en réalité augmentée",
    link: "https://www.instagram.com/massinart.ma/reel/Ce6i-FWKtYP/",
    postedDate: "2022-06-17",
    thumbnail: "/massinart/174885747_813701786195615_7216069332923025101_n.jpg",
    snippet: "Regardez avant d'acheter ! Essayez nos tableaux en réalité augmentée.",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0456wj000b0l3mv4mxtr9g",
    title: "Décoration avant et après",
    link: "https://www.instagram.com/massinart.ma/p/Cdol7piqcqq/",
    postedDate: "2022-05-16",
    thumbnail: "/massinart/175175018_1802736086574565_8294194785114657543_n.jpg",
    snippet: "Transformez votre décoration intérieure facilement !",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj04575n000c0l3m904zr0pm",
    title: "Le tableau, Bijou de la maison !",
    link: "https://www.instagram.com/massinart.ma/reel/CcLzVHtqbog/",
    postedDate: "2022-04-10",
    thumbnail: "/massinart/176786848_460305661746700_622098928093317882_n.jpg",
    snippet: "Le tableau, Bijou de la maison ! اللوحة، جوهر الدار",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0457g9000d0l3mtuctnvga",
    title: "Le tableau, Bijou de la maison.",
    link: "https://www.instagram.com/massinart.ma/reel/CbNeLVXKh-V/",
    postedDate: "2022-03-17",
    thumbnail: "/massinart/201351282_3049958388556759_4171216507597693472_n.jpg",
    snippet: "Le tableau, Bijou de la maison. اللوحة جوهر الدار",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0457ql000e0l3mob24vik2",
    title: "Photos clients : rendu final !",
    link: "https://www.instagram.com/massinart.ma/p/Cap5Q_mqmDD/",
    postedDate: "2022-03-03",
    thumbnail: "/massianrt/235784411_901307220497016_5778229906965051245_n.jpg",
    snippet: "Nos clients nous surprennent à chaque fois avec des photos qui montrent le rendu final !",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj04580f000f0l3m5omw8nsb",
    title: "Salle de réunion inspirée",
    link: "https://www.instagram.com/massinart.ma/p/CZ4u47nqDC9/",
    postedDate: "2022-02-12",
    thumbnail: "/massinart/242554827_256470663041829_692142427909223786_n.jpg",
    snippet: "Chaque salle de réunion portant un rappel d'une ville marocaine, c'est absolument une idée originale!",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0458f4000g0l3mxfkguozp",
    title: "Nouvelles créations chez Massinart",
    link: "https://www.instagram.com/massinart.ma/reel/CZhfT14ubsR/",
    postedDate: "2022-02-03",
    thumbnail: "/massinart/271616226_267257558676290_6580051897749967944_n.jpg",
    snippet: "Le tableau, Bijou de la maison ! اللوحة. جوهر الدار Nouvelles créations chez Massinart.",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0458qa000h0l3mqpydbwpd",
    title: "Bonne année 2972 !",
    link: "https://www.instagram.com/massinart.ma/p/CYpK4H2K8aA/",
    postedDate: "2022-01-12",
    thumbnail: "/massinart/273833907_1853005521562056_7354083980177197073_n.jpg",
    snippet: "L'équipe Massinart vous transmet ses meilleurs voeux pour la nouvelle année 2972 !",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj04590s000i0l3m0iap4mtt",
    title: "Décoration avant et après",
    link: "https://www.instagram.com/massinart.ma/p/CUK5ETeqVeB/",
    postedDate: "2021-09-23",
    thumbnail: "/massinart/275020494_121495286924472_6625934654837451704_n.jpg",
    snippet: "Que pensez-vous de la touche apportée par nos tableaux décoratifs ?",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj04599t000j0l3mbmnziwwz",
    title: "Photos réelles de nos tableaux livrés",
    link: "https://www.instagram.com/massinart.ma/p/CSezsnJKNzh/",
    postedDate: "2021-08-12",
    thumbnail: "/massinart/275950502_679084266464325_5405504300672906796_n.jpg",
    snippet: "Photos réelles de nos tableaux livrés à nos clients partout dans le Maroc.",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0459kn000k0l3mknxw3vd8",
    title: "Nouvelle collection été 2021",
    link: "https://www.instagram.com/massinart.ma/reel/CQl8wtthuhv/",
    postedDate: "2021-06-26",
    thumbnail: "/massinart/278257473_533120248174413_5171243576138254662_n.jpg",
    snippet: "Œuvres artistiques Made in Morocco. Nouvelle collection été 2021 !",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj0459tx000l0l3mhdt7xruo",
    title: "Conseil gratuit en choix de tableaux",
    link: "https://www.instagram.com/massinart.ma/p/CQMElXXBn1U/",
    postedDate: "2021-06-16",
    thumbnail: "/massinart/281712356_1058787735076559_1591863786797654739_n.jpg",
    snippet: "Envoyez-nous les photos de votre intérieur et recevez du conseil gratuit en choix de tableaux !",
    source: "instagram",
    type: "POSITIVE",
  },
  {
    id: "cmj045a3t000m0l3mc4e2x6t4",
    title: "Décoration personnalisée",
    link: "https://www.instagram.com/massinart.ma/reel/CPjCRx2BJjm/",
    postedDate: "2021-05-31",
    thumbnail: "/massinart/289072254_1255518918524771_5435469611654265444_n.jpg",
    snippet: "Décoration personnalisée pour chaque espace.",
    source: "instagram",
    type: "POSITIVE",
  },
];
const Mentions = () => {
  const [mentions, setMentions] = useState(mentionsData);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    link: "",
    title: "",
    snippet: "",
    source: "",
    sentiment: "",
    date: new Date().toISOString().slice(0, 10),
    thumbnail: "",
    notify: false,
  });

  const handleDelete = (id: string) => {
    setMentions(mentions.filter((mention) => mention.id !== id));
  };

  const handleUpdateSentiment = (id: string, newSentiment: string) => {
    setMentions(
      mentions.map((mention) =>
        mention.id === id ? { ...mention, type: newSentiment } : mention
      )
    );
  };

  // Prepare export data for mentions
  const exportHeaders = ["ID", "Titre", "Lien", "Date", "Miniature", "Extrait", "Source", "Sentiment"];
  const exportRows = mentions.map((m) => [
    m.id,
    m.title,
    m.link,
    m.postedDate,
    m.thumbnail,
    m.snippet,
    m.source,
    m.type,
  ]);

  return (
    <Card className="flex flex-col relative">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Feed des Mentions</CardTitle>
            <ToolTipsProvider title="Flux en temps réel regroupant toutes les mentions de la marque issues des réseaux sociaux et des sources médiatiques." />
          </div>
          <div className="flex items-center gap-2">
            <ExportButton
              data={{
                headers: exportHeaders,
                rows: exportRows,
                filename: `mentions-${new Date().toISOString().slice(0, 10)}`
              }}
            />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">Ajouter une mention</Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-5xl">
                <DialogHeader>
                  <DialogTitle className="text-center">Ajouter une mention</DialogTitle>
                  {/* <DialogDescription>
                    Remplissez le formulaire ci-dessous pour ajouter une mention manuellement.
                  </DialogDescription> */}
                </DialogHeader>

                <div className="grid grid-cols-1 gap-3 mt-2">
                  <label className="text-sm">Link</label>
                  <Input
                    placeholder="Link"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                  />

                  <label className="text-sm">Titre de la mention</label>
                  <Input
                    placeholder="Titre de la mention"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />

                  <label className="text-sm">Snippet</label>
                  <textarea
                    placeholder="Snippet"
                    className="min-h-[80px] resize-y rounded-md border bg-transparent px-3 py-2 text-base"
                    value={form.snippet}
                    onChange={(e) => setForm({ ...form, snippet: e.target.value })}
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm">Source</label>
                      <Input
                        placeholder="Source"
                        value={form.source}
                        onChange={(e) => setForm({ ...form, source: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-sm">Sentiment</label>
                      <Select onValueChange={(val) => setForm({ ...form, sentiment: val })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sentiment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="POSITIVE">POSITIVE</SelectItem>
                          <SelectItem value="NEGATIVE">NEGATIVE</SelectItem>
                          <SelectItem value="Article">Article</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm">Date</label>
                      <Input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={form.notify}
                        onCheckedChange={(val) => setForm({ ...form, notify: !!val })}
                      />
                      <span className="text-sm">Send the notification by email & Whatsapp</span>
                    </div>
                  </div>

                </div>

                <DialogFooter>
                  <div className="flex w-full gap-2">
                    <Button className="w-full bg-main" size="sm" onClick={() => {
                      // minimal validation
                      if (!form.title || !form.snippet) {
                        // simple client-side guard
                        return;
                      }
                      const newMention = {
                        id: Date.now().toString(),
                        title: form.title,
                        link: form.link || "#",
                        postedDate: form.date,
                        thumbnail: form.thumbnail || "/mentions/glovo.webp",
                        snippet: form.snippet,
                        source: form.source || "unknown",
                        type: form.sentiment || "Article",
                      };
                      setMentions((prev) => [newMention, ...prev]);
                      setForm({
                        link: "",
                        title: "",
                        snippet: "",
                        source: "",
                        sentiment: "",
                        date: new Date().toISOString().slice(0, 10),
                        thumbnail: "",
                        notify: false,
                      });
                      setOpen(false);
                    }}>Ajouter</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-none h-[755px] overflow-y-auto">
        <div className="flex flex-col gap-2.5">
          {mentions.map((mention) => (
            <FeedCard key={mention.id} feed={mention} onDelete={handleDelete} onUpdateSentiment={handleUpdateSentiment} />
          ))}
        </div>
      </CardContent>
      <MentionPagination
                                  pagination={{ page: 1, pageSize: 10, total: 300, totalPages: 30 }}
                              />
    </Card>
  );
};

export default Mentions;
