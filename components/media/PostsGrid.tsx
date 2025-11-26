import React, { useState, Suspense } from "react";
import PostsTable, { PostRow } from "./PostsTable";
import PostCard from "./PostCard";
import Image from "next/image";
import { DownloadCloud, BookmarkIcon, LayoutGrid, List } from "lucide-react";
import OrderByFilter from "../FiltersInfluencers/OrderByFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

const media = [
  {
    label: "Tous les réseaux sociaux",
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
  {
    label: "X Platform",
    image: "/media/x.png",
  },
];
const influencer = {
  id: "cmhjwf16z0002kqz0qttwcbp8",
  avgLike: 305,
  avgComment: 27,
  avgViews: 327863,
  egRate: 0.3,
  username: "glovo_ma",
  verified: true,
  followersExact: 112206,
  accountLocation: "Morocco",
  name: "Glovo Maroc",
  bio: "Commandez tout ce dont vous avez besoin sur Glovo💛",
  followers: "112K",
  following: "13",
  postsCount: 392,
  profilePic: "/glovo-logo.jpg",
  gender: "male",
  createdAt: "2025-11-04T01:36:56.267Z",
  updatedAt: "2025-11-04T01:36:56.267Z",
  categoryId: "cmhjwf11y0000kqz0qgcp56si",
  network: "instagram",
  countryId: "cmeu1k5h100020lsizz214mhf",
  accountId: null,
};

interface Post {
  id: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  url: string;
  picture: string;
  location: string | null;
  postedDate: string;
  caption: string;
  type: string;
  networkId: string;
  createdAt: string;
  updatedAt: string;
}

interface DataType {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

const data: DataType = {
  posts: [
    {
      id: "cmhjwf1e30003kqz05cg0ix4y",
      viewsCount: 0,
      likesCount: 95,
      commentsCount: 36,
      url: "https://www.instagram.com/glovo_ma/p/DPmCN95DNZO/",
      picture: "/glovo/560895782_851683347188467_588759215797659101_n.jpg",
      location: null,
      postedDate: "2025-10-09T15:56:08.000Z",
      caption: "any guesses👀?",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:56.523Z",
      updatedAt: "2025-11-04T02:00:02.205Z",
    },
    {
      id: "cmhjwf1ms0004kqz0r0qc3ycr",
      viewsCount: 5113,
      likesCount: 58,
      commentsCount: 2,
      url: "https://www.instagram.com/glovo_ma/reel/DPd_3agAQqs/",
      picture: "/glovo/559309862_18299792185266663_7836114315016686526_n.jpg",
      location: null,
      postedDate: "2025-10-06T13:02:00.000Z",
      caption:
        "✨ Clôture du Women in Tech Bootcamp ! ✨ Après plusieurs mois d’accompagnement de 15 participantes, notre Bootcamp, en partenariat avec @lewagoncasablanca, s’est terminé en beauté !🏆 Lors de cette cérémonie, chaque femme a reçu son trophée, célébrant son engagement et ses progrès tout au long du programme. 📊 Au cours des derniers ateliers, elles ont exploré la data en entreprise et participé à des sessions de leadership animées par des experts.Un grand merci à tous nos partenaires, pour leur soutien et leur implication dans cette aventure inspirante ! 💡💛",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:56.837Z",
      updatedAt: "2025-11-04T02:00:02.467Z",
    },
    {
      id: "cmhjwf1rv0005kqz0ear5kn5x",
      viewsCount: 0,
      likesCount: 37,
      commentsCount: 1,
      url: "https://www.instagram.com/glovo_ma/p/DPWSj-XDNOq/",
      picture: "/glovo/558063340_843806564642812_6374179530561277331_n.jpg",
      location: null,
      postedDate: "2025-10-03T13:11:06.000Z",
      caption: "Tap accept, and we’ll airdrop it straight to your doorstep😋🍝",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:57.019Z",
      updatedAt: "2025-11-04T02:00:02.641Z",
    },
    {
      id: "cmhjwf1wd0006kqz0g3hfv9wi",
      viewsCount: 8543,
      likesCount: 52,
      commentsCount: 3,
      url: "https://www.instagram.com/glovo_ma/reel/DPOxBUjjERE/",
      picture: "/glovo/557725301_18298696984266663_2776217132344369825_n.jpg",
      location: null,
      postedDate: "2025-09-30T15:04:12.000Z",
      caption: "Glovo has also joined the trend🔥💛",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:57.181Z",
      updatedAt: "2025-11-04T02:00:02.733Z",
    },
    {
      id: "cmhjwf20q0007kqz0k6cokzfr",
      viewsCount: 6906,
      likesCount: 136,
      commentsCount: 6,
      url: "https://www.instagram.com/glovo_ma/reel/DPG7mG_CBNA/",
      picture: "/glovo/556178389_18298193641266663_4583053771365270386_n.jpg",
      location: null,
      postedDate: "2025-09-27T14:02:20.000Z",
      caption:
        "⁨\tSuccess Together: Glovo’s Mahlabati Journey EP 3! 💛🚀🇲🇦سي مصطفى، صاحب محلبة أوتران، محلبة لي كتواجد بمدينة اگادير كتر من 18 سنة، و لي 5 شهور دبا بش انضمت لمشروع محلبتي ديال ڭلوڤو، او بفضلو قدرو يوفقوا مابين العرض و الطلب ديال الزبناء ديالهم ويزيدوا من مبيعاتهم🤝🏽💛⁩",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:57.338Z",
      updatedAt: "2025-11-04T02:00:02.866Z",
    },
    {
      id: "cmhjwf26o0008kqz0i9z3shk2",
      viewsCount: 0,
      likesCount: 0,
      commentsCount: 0,
      url: "https://www.instagram.com/ihsun.daily/reel/DPCH1fCjM7I/",
      picture: "/glovo/554408354_18383523115131098_4042104228683326687_n.jpg",
      location: null,
      postedDate: "2025-09-25T17:15:32.000Z",
      caption:
        "✨ Spoiler alert ✨Ce n’est pas parce que je sais cuisiner que je dois être enfermé 24/7 en cuisine. Aujourd’hui, j’ai décidé d’être une maman stratège 🧘‍♀️ : je passe ma commande de goûters healthy sur @glovo_ma 🛵, directement chez @greenvillagemaroc ou @the.chocolate.galleryRésultat ? Des snacks sains, des enfants contents 🍫🥑, et moi… je garde mon énergie pour autre chose.Bon, eux je leur ai dit que j’avais passé la journée à tout préparer 👩‍🍳🤫 #MomSkills",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:57.552Z",
      updatedAt: "2025-11-04T02:00:02.996Z",
    },
    {
      id: "cmhjwf2a80009kqz0x59q8j15",
      viewsCount: 0,
      likesCount: 26,
      commentsCount: 6,
      url: "https://www.instagram.com/glovo_ma/p/DO8wzQ_Du6B/",
      picture: "/glovo/549808887_834473848909417_3589279875760370917_n.jpg",
      location: null,
      postedDate: "2025-09-23T15:15:05.000Z",
      caption: "Matcha makes everything better 💚",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:57.681Z",
      updatedAt: "2025-11-04T02:00:03.149Z",
    },
    {
      id: "cmhjwf2fg000akqz0d9jelqyr",
      viewsCount: 0,
      likesCount: 33,
      commentsCount: 4,
      url: "https://www.instagram.com/glovo_ma/p/DO057zrDSh_/",
      picture: "/glovo/549434795_834456685577800_2944237735065459879_n.jpg",
      location: null,
      postedDate: "2025-09-20T14:00:58.000Z",
      caption:
        "From to-do nothing ➡️ to ta-daaaa everything I crave 🍕🛋️ Thanks Glovo 💛✨",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:57.868Z",
      updatedAt: "2025-11-04T02:00:03.287Z",
    },
    {
      id: "cmhjwf2ln000bkqz06ssosqpl",
      viewsCount: 4958,
      likesCount: 79,
      commentsCount: 15,
      url: "https://www.instagram.com/glovo_ma/reel/DOwCteLDBBQ/",
      picture: "/glovo/551070689_18297018916266663_2259858579530967002_n.jpg",
      location: null,
      postedDate: "2025-09-18T16:42:05.000Z",
      caption:
        "⁨\t⁨\tSuccess Together: Glovo’s Mahlabati Journey EP 2! 💛🚀🇲🇦لبنى شابة مغربية طموحة، بدات مشروع محلبة ماجوريل، مشروع اي بان ليها فالأول صعيب و صغير، ولكن بفضل المثابرة ديالها و ديال الفريق، وخصوصا بفضل مشروع محلبتي ديال ڭلوڤو لي انضمت ليه أيام قليلة بعد افتتاح المحلبة، ولي جاب الثمرات ديالو مند البداية، تمكنا نوصلو جودة المأكولات ديال المحلبة في جميع أنحاء مدينة مراكش، و فأي وقيتة بغا الزبون⁩⁩",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:58.092Z",
      updatedAt: "2025-11-04T02:00:03.477Z",
    },
    {
      id: "cmhjwf2pr000ckqz0uh515yrm",
      viewsCount: 0,
      likesCount: 37,
      commentsCount: 7,
      url: "https://www.instagram.com/glovo_ma/reel/DOn84XuiAoV/",
      picture: "/glovo/549207793_18296695192266663_2050294285878078616_n.jpg",
      location: null,
      postedDate: "2025-09-15T13:16:55.000Z",
      caption: "ça n’a RIEEEEEEN à voir😂",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:58.240Z",
      updatedAt: "2025-11-04T02:00:03.611Z",
    },
    {
      id: "cmhjwf2uk000dkqz06acnn3c9",
      viewsCount: 0,
      likesCount: 26,
      commentsCount: 1,
      url: "https://www.instagram.com/glovo_ma/p/DOgMsOqj46L/",
      picture: "/glovo/544873312_824341569922645_2419993988167618253_n.jpg",
      location: null,
      postedDate: "2025-09-12T13:00:49.000Z",
      caption:
        "Tout pour vos bouts de chou à prix tout doux👶🍼Découvrez nos promos puériculture sur Glovo Market, du 08 au 30 septembre💛🛒",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:58.412Z",
      updatedAt: "2025-11-04T02:00:03.740Z",
    },
    {
      id: "cmhjwf33r000ekqz01i32euok",
      viewsCount: 0,
      likesCount: 74,
      commentsCount: 10,
      url: "https://www.instagram.com/glovo_ma/reel/DObHOOHD2-A/",
      picture: "/glovo/543608618_18296162125266663_5482960241752478357_n.jpg",
      location: null,
      postedDate: "2025-09-10T13:37:08.000Z",
      caption: "Back to the office 🤭",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:58.743Z",
      updatedAt: "2025-11-04T02:00:04.089Z",
    },
    {
      id: "cmhjwf3a1000fkqz0xirz4n47",
      viewsCount: 0,
      likesCount: 22,
      commentsCount: 0,
      url: "https://www.instagram.com/glovo_ma/p/DOWI2heDCtm/",
      picture: "/glovo/543801844_18295964572266663_6627121490341232488_n.jpg",
      location: null,
      postedDate: "2025-09-08T15:14:51.000Z",
      caption:
        "Avez vous pensé à tout ? Il vous manque des fournitures scolaires de dernière minute ? Commandez chez Carrefour Via Glovo💛",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:58.969Z",
      updatedAt: "2025-11-04T02:00:04.203Z",
    },
    {
      id: "cmhjwf3gq000gkqz0qw60nq3d",
      viewsCount: 0,
      likesCount: 601,
      commentsCount: 10,
      url: "https://www.instagram.com/glovo_ma/reel/DOT-XacDTwb/",
      picture: "/glovo/542621388_18295766215266663_6237158329066154282_n.jpg",
      location: null,
      postedDate: "2025-09-07T19:05:34.000Z",
      caption:
        "⁨\t⁨\tSuccess Together: Glovo’s Mahlabati Journey EP 1! 💛🚀تعرفو على علي، صاحب محلبة الوفاء، محلبة لي معروفة في كازابلانكا كتر من 20 سنة بالجودة والأثمنة المناسبة دیالھا، وھادي عام بالضبط باش ھو معانا فگلوفو، بفضل مشروع محلبتیو💛، اللي ساعد انھم یتعرفو كتر، و ھادشي لي خلاه أنھ یفتح سناك جدید،ویسجلو حتا ھو فگلوفو من نھار الافتتاح دیالو🤝⁩⁩",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:59.210Z",
      updatedAt: "2025-11-04T02:00:04.443Z",
    },
    {
      id: "cmhjwf3on000hkqz01m0d7e62",
      viewsCount: 0,
      likesCount: 51,
      commentsCount: 2,
      url: "https://www.instagram.com/glovo_ma/p/DOObRGNjKhQ/",
      picture: "/glovo/543107190_18295522114266663_2452194223520026778_n.jpg",
      location: null,
      postedDate: "2025-09-05T15:21:51.000Z",
      caption:
        "✨ Journée Internationale de la Charité ✨Fiers de soutenir SOS Village à Casablanca 💛. Grâce au financement de paniers alimentaires, nous avons pu renforcer la sécurité alimentaire et offrir 7 762 repas aux familles dans le besoin durant le Ramadan🤝@sosvillagesdenfantsmaroc",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:59.495Z",
      updatedAt: "2025-11-04T02:00:04.810Z",
    },
    {
      id: "cmhjwf3w9000ikqz0sl6sm49u",
      viewsCount: 0,
      likesCount: 4215,
      commentsCount: 244,
      url: "https://www.instagram.com/manyplaces_casa/reel/DOMQ46QCHiD/",
      picture: "/glovo/542369756_18071556767469871_1237022235794458719_n.jpg",
      location: null,
      postedDate: "2025-09-04T19:17:11.000Z",
      caption: "Les aventures des restaurateurs au Maroc 🙌🏻🇲🇦 EP1",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:59.770Z",
      updatedAt: "2025-11-04T02:00:05.013Z",
    },
    {
      id: "cmhjwf41z000jkqz0pbqwyxu3",
      viewsCount: 0,
      likesCount: 21,
      commentsCount: 1,
      url: "https://www.instagram.com/glovo_ma/p/DOL_FcWjBAG/",
      picture: "/glovo/542751385_822581126765356_3668426152143833622_n.jpg",
      location: null,
      postedDate: "2025-09-04T16:37:06.000Z",
      caption:
        "إستافدو من توصيل فابور فالمغرب كامل مع گلوفو من الجمعة إلى الأحد على جميع طلبيات ديال مرجان💛",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:36:59.976Z",
      updatedAt: "2025-11-04T02:00:05.250Z",
    },
    {
      id: "cmhjwf489000kkqz0tmjoreer",
      viewsCount: 0,
      likesCount: 26,
      commentsCount: 1,
      url: "https://www.instagram.com/glovo_ma/p/DN5xA8njK9W/",
      picture: "/glovo/540854491_817185307304938_183956774884513788_n.jpg",
      location: null,
      postedDate: "2025-08-28T14:47:50.000Z",
      caption:
        "تهنى من لائحة الدخول المدرسي، الستريس و الزحام بكليك وحدة مع گلوفو ماركت💛",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:00.202Z",
      updatedAt: "2025-11-04T02:00:05.433Z",
    },
    {
      id: "cmhjwf4e7000lkqz0y40sj0z6",
      viewsCount: 0,
      likesCount: 4836,
      commentsCount: 118,
      url: "https://www.instagram.com/doujablk/reel/DN1JJW6Wt_o/",
      picture: "/glovo/539236226_18529447837042119_7322392247509702332_n.jpg",
      location: null,
      postedDate: "2025-08-26T19:43:43.000Z",
      caption:
        "Une visite de dernière minute?Pas de panique…je passe commande sur Glovo pendant que je me prépare et en 30 min tout est déjà là! Fresh veggies & dips, des canapés, du chocolat, et des chips pour les gourmands 🥰 Ready to set up 💁🏻‍♀️",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:00.415Z",
      updatedAt: "2025-11-04T02:00:05.700Z",
    },
    {
      id: "cmhjwf4k0000mkqz0fivlpr9s",
      viewsCount: 0,
      likesCount: 65,
      commentsCount: 228,
      url: "https://www.instagram.com/glovo_ma/p/DNqjXyXMyBo/",
      picture: "/glovo/536923298_18293977339266663_2149908244612059766_n.jpg",
      location: null,
      postedDate: "2025-08-22T17:00:00.000Z",
      caption:
        "Summer vibes still on ☀️✨ Gagnez vos essentiels Mixa pour prendre soin de toute la famille, des plus petits aux plus grands ✨Comment participer ?1️⃣ Suivez @glovo_ma & @mixamaroc 2️⃣Achetez au moins 1 produit Mixa sur Glovo Market3️⃣ Envoyez en DM une capture de votre commande + numéro de commande4️⃣ Taguez vos amis en commentaire pour doubler vos chances ! 🤩 📅 Tirage le 29 août !Bonne chance à tous 💛#GlovoMarket #MixaMaroc #SummerGiveaway #GlovoLovers",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:00.625Z",
      updatedAt: "2025-11-04T02:00:05.977Z",
    },
    {
      id: "cmhjwf4o8000nkqz0gnv425ro",
      viewsCount: 0,
      likesCount: 40,
      commentsCount: 29,
      url: "https://www.instagram.com/glovo_ma/p/DNdQEtgoOrM/",
      picture: "/glovo/528401983_800240578999411_8446317970216543364_n.jpg",
      location: null,
      postedDate: "2025-08-17T13:01:16.000Z",
      caption: "Which emoji do you pick ?",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:00.776Z",
      updatedAt: "2025-11-04T02:00:06.169Z",
    },
    {
      id: "cmhjwf4sx000okqz0pncljehg",
      viewsCount: 0,
      likesCount: 35,
      commentsCount: 11,
      url: "https://www.instagram.com/glovo_ma/reel/DNVoqRpRCma/",
      picture: "/glovo/530902233_18293085295266663_1699225983529452573_n.jpg",
      location: null,
      postedDate: "2025-08-14T14:02:15.000Z",
      caption: "طاڭي صاحبك لي ديما غامق عليك فجلوفو برايم ديالك",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:00.945Z",
      updatedAt: "2025-11-04T02:00:06.424Z",
    },
    {
      id: "cmhjwf4yy000pkqz0zsopgoid",
      viewsCount: 0,
      likesCount: 58,
      commentsCount: 9,
      url: "https://www.instagram.com/glovo_ma/reel/DNN6P3BSqTN/",
      picture: "/glovo/531572016_18292760512266663_4997171602449928910_n.jpg",
      location: null,
      postedDate: "2025-08-11T14:02:14.000Z",
      caption:
        "It’s okay to feel things.It’s better when you feel them with fries 🍟🥰#ProbablyNeededAHug #Trend #GlovoApp #DeliveryApp",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:01.163Z",
      updatedAt: "2025-11-04T02:00:06.678Z",
    },
    {
      id: "cmhjwf550000qkqz0mod6un2o",
      viewsCount: 0,
      likesCount: 38,
      commentsCount: 4,
      url: "https://www.instagram.com/glovo_ma/p/DNGE_0BPwB9/",
      picture: "/glovo/528684462_800172509006218_4775121324238736078_n.jpg",
      location: null,
      postedDate: "2025-08-08T13:01:56.000Z",
      caption:
        "Our Summer starter pack has arrived! ☀️😎 From delicious ice cream and refreshing drinks to last-minute BBQ supplies or that forgotten sunscreen... it's all on Glovo. Summer has never been this simple! 💛🌴",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:01.381Z",
      updatedAt: "2025-11-04T02:00:06.945Z",
    },
    {
      id: "cmhjwf5ai000rkqz02y198jsd",
      viewsCount: 0,
      likesCount: 38,
      commentsCount: 13,
      url: "https://www.instagram.com/glovo_ma/p/DM-l2hfxnID/",
      picture: "/glovo/527976472_798753275814808_7912931437773256578_n.jpg",
      location: null,
      postedDate: "2025-08-05T15:15:06.000Z",
      caption:
        "Avec Glovo Access, notre technologie devient un levier solidaire.Au Maroc, près de 320 000 repas solidaires ont déjà été livrés grâce à nos partenaires comme SOS Village et la Banque Alimentaire.Des zones rurales aux villes, on agit pour rendre les biens essentiels accessibles à ceux qui en ont le plus besoin. 💛",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:01.578Z",
      updatedAt: "2025-11-04T02:00:07.065Z",
    },
    {
      id: "cmhjwf5eo000skqz07ciyh0pl",
      viewsCount: 0,
      likesCount: 32,
      commentsCount: 5,
      url: "https://www.instagram.com/glovo_ma/p/DM5Mzvqsc0w/",
      picture: "/glovo/527235775_18291641329266663_7278264174277471801_n.jpg",
      location: null,
      postedDate: "2025-08-03T13:00:00.000Z",
      caption:
        "Un seul mot : fondant😋Le burger signature de @lejardintanger , accompagné de ses délicieuses frites et sauce maison, c’est tout ce qu’il vous faut aujourd’hui 🍔",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:01.728Z",
      updatedAt: "2025-11-04T02:00:07.224Z",
    },
    {
      id: "cmhjwf5jw000tkqz00gigijn5",
      viewsCount: 0,
      likesCount: 45,
      commentsCount: 5,
      url: "https://www.instagram.com/glovo_ma/reel/DM0X1bIsAlE/",
      picture: "/glovo/526603254_1756209405060959_5031575746064743799_n.jpg",
      location: null,
      postedDate: "2025-08-01T16:00:00.000Z",
      caption:
        "Oublier quelque chose à la dernière minute avant de partir, ça nous arrive à tous... n’est-ce pas @ihsun.daily ! Avec Glovo, tu peux te faire livrer tout ce qu’il te manque directement à la maison, pour que ta valise soit vraiment complète. Un départ en vacances sans stress !☀️",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:01.916Z",
      updatedAt: "2025-11-04T02:00:07.373Z",
    },
    {
      id: "cmhjwf5pr000ukqz0r60voq4w",
      viewsCount: 0,
      likesCount: 62,
      commentsCount: 8,
      url: "https://www.instagram.com/glovo_ma/p/DMur8FMyhBU/",
      picture: "/glovo/524204271_793163273040475_409641914217582436_n.jpg",
      location: null,
      postedDate: "2025-07-30T11:00:26.000Z",
      caption:
        "بكل فخر ووفاء، ومن كل ربوع المغرب 🇲🇦بمناسبة عيد العرش المجيد، تتقدم شركة Glovo بأسمى عبارات الولاء والإخلاص لصاحب الجلالة الملك محمد السادس نصره الله، مجددة عهدها بالالتزام بقيم الوحدة الوطنية، والتقدم، والعمل الدؤوب في خدمة كافة أبناء الشعب المغربي.",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:02.127Z",
      updatedAt: "2025-11-04T02:00:07.542Z",
    },
    {
      id: "cmhjwf5wp000vkqz0pea90lg1",
      viewsCount: 0,
      likesCount: 30,
      commentsCount: 7,
      url: "https://www.instagram.com/glovo_ma/p/DMnLXj3scYy/",
      picture: "/glovo/523491143_789940923362710_1652790994711574119_n.jpg",
      location: null,
      postedDate: "2025-07-27T13:01:09.000Z",
      caption:
        "☀️ L’été bat son plein sur Glovo Market ! Découvrez notre catalogue spécial été avec +600 produits en promo jusqu’à -60 % 😎 Tout pour un été au top : boissons fraîches, glaces, BBQ, soins solaires, petit électroménager et accessoires d’été 🌴🔥📲 Dispo sur Glovo Market. Promos valables jusqu’au 15 août – ne ratez pas ça ! 👉 Lien du catalogue en bio.#GlovoMarket #SummerDeals #PromoÉté #SummerVibes #BonnesAffaires",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:02.377Z",
      updatedAt: "2025-11-04T02:00:07.706Z",
    },
    {
      id: "cmhjwf62d000wkqz0uf2vog0l",
      viewsCount: 0,
      likesCount: 215,
      commentsCount: 186,
      url: "https://www.instagram.com/glovo_ma/p/DMh0SU9s_RC/",
      picture: "/glovo/523157646_18290825545266663_2173484539821887977_n.jpg",
      location: null,
      postedDate: "2025-07-25T11:03:15.000Z",
      caption:
        "🌞 Summer Giveaway 🌞🎉✨ À vos paniers… prêts… tentez votre chance ✨🎉Tentez de gagner l’un des 5 coffrets Nivea composés de 8 produits chacun, grâce à Glovo Market 💙🧴Comment participer ?1️⃣ Suivez @glovo_ma et @nivea_maroc 2️⃣ Commandez au moins 1 produit Nivea sur Glovo Market entre le 25 et le 31 juillet3️⃣ Envoyez en DM une capture de votre commande + numéro de commande4️⃣ Taguez vos amis en commentaire pour doubler vos chances ! 🤩🎁 5 gagnants seront tirés au sort le 1er août 🎁Bonne chance à tous 💛#GlovoMarket #NiveaMaroc #SummerGiveaway #GlovoLovers",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:02.582Z",
      updatedAt: "2025-11-04T02:00:07.825Z",
    },
    {
      id: "cmhjwf68k000xkqz064lxfxra",
      viewsCount: 0,
      likesCount: 175,
      commentsCount: 49,
      url: "https://www.instagram.com/glovo_ma/p/DMaffPhMePi/",
      picture: "/glovo/521603141_18290518399266663_6644935295928252838_n.jpg",
      location: null,
      postedDate: "2025-07-22T14:46:50.000Z",
      caption:
        "- Mise au point Glovo Maroc - Ensemble, avançons vers des solutions durables🇲🇦💛",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:02.805Z",
      updatedAt: "2025-11-04T02:00:07.988Z",
    },
    {
      id: "cmhjwf6eg000ykqz0n21c5cm0",
      viewsCount: 0,
      likesCount: 42,
      commentsCount: 3,
      url: "https://www.instagram.com/glovo_ma/p/DMVXgrYox3F/",
      picture: "/glovo/518878532_18290225599266663_5010256355688005520_n.jpg",
      location: null,
      postedDate: "2025-07-20T15:00:00.000Z",
      caption:
        "Aujourd’hui, c’est la Journée internationale de la glace, et ça tombe bien... c’est l’excuse PARFAITE pour se faire plaisir ! 🍨Retrouve les glaces @dioneicecream_maroc sur Glovo Market. Impossible de leur résister ! 😉 #IceCream",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:03.017Z",
      updatedAt: "2025-11-04T02:00:08.198Z",
    },
    {
      id: "cmhjwf6kq000zkqz04ip4vvqz",
      viewsCount: 0,
      likesCount: 82,
      commentsCount: 2,
      url: "https://www.instagram.com/glovo_ma/reel/DMU78rBsoMT/",
      picture: "/glovo/519680389_1083189319881799_8798084938456431437_n.jpg",
      location: null,
      postedDate: "2025-07-20T11:00:00.000Z",
      caption:
        "Happy International Ice Cream Day! @oliveri1950 is pure bliss in every scoop🍨, your sweet escape is just one order away🍦✨",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:03.242Z",
      updatedAt: "2025-11-04T02:00:08.394Z",
    },
    {
      id: "cmhjwf6qx0010kqz0id8v8h23",
      viewsCount: 0,
      likesCount: 97,
      commentsCount: 35,
      url: "https://www.instagram.com/glovo_ma/reel/DMQUKjtMpBy/",
      picture: "/glovo/521569040_18290078086266663_3038250859342769687_n.jpg",
      location: null,
      postedDate: "2025-07-18T15:55:46.000Z",
      caption: "My hourly ritual🤭",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:03.466Z",
      updatedAt: "2025-11-04T02:00:08.570Z",
    },
    {
      id: "cmhjwf6wx0011kqz02pgh0glq",
      viewsCount: 0,
      likesCount: 127,
      commentsCount: 4,
      url: "https://www.instagram.com/glovo_ma/p/DMGI9CnPAov/",
      picture: "/glovo/518423562_781730554183747_9196036293847463099_n.jpg",
      location: null,
      postedDate: "2025-07-14T17:05:07.000Z",
      caption:
        "Even the weather app knows the best way to beat the heat: one refreshing drink at a time! Order yours ☀️🍹",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:03.681Z",
      updatedAt: "2025-11-04T02:00:08.669Z",
    },
    {
      id: "cmhjwf71o0012kqz0xu8uz7y4",
      viewsCount: 0,
      likesCount: 36,
      commentsCount: 5,
      url: "https://www.instagram.com/glovo_ma/reel/DMAoC6stNYN/",
      picture: "/glovo/517960207_1790029345228086_5750957663037904307_n.jpg",
      location: null,
      postedDate: "2025-07-12T13:41:57.000Z",
      caption:
        "Depuis plusieurs mois, nous accompagnons 15 femmes dans le cadre du Women in Tech Bootcamp, en partenariat avec @lewagoncasablanca . ✨À l’approche du Demo Day, l’énergie est toujours là !Elles ont récemment participé à deux ateliers clés dans nos bureaux de Casablanca :📊 Une session avec Visa sur la data en entreprise💡 Un atelier leadership animé par Asmae El Hajji du Moroccan Leadership InstituteMerci à tous nos partenaires, notamment WOMEN IN TECH Morocco.La suite arrive très bientôt ! 💛",
      type: "Post",
      networkId: "cmhjwf16z0002kqz0qttwcbp8",
      createdAt: "2025-11-04T01:37:03.852Z",
      updatedAt: "2025-11-04T02:00:08.846Z",
    },
  ],
  pagination: { total: 36, page: 1, pageSize: 9, totalPages: 4 },
};

const PostsGrid = () => {
  const [dateRange] = useState({
    from: undefined as Date | undefined,
    to: undefined as Date | undefined,
  });

  const [metric] = useState<string | undefined>("followers");
  const [source, setSource] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleExportCSV = () => {
    const rows: Array<{ key: string; value: string | number | undefined }> = [];

    // include selected filters
    rows.push({
      key: "Métrique sélectionnée",
      value:
        metric === "followers"
          ? "Followers"
          : metric === "likers"
            ? "Likers"
            : metric,
    });
    rows.push({
      key: "Date de début",
      value: dateRange.from ? dateRange.from.toISOString() : "",
    });
    rows.push({
      key: "Date de fin",
      value: dateRange.to ? dateRange.to.toISOString() : "",
    });
    rows.push({ key: "Source", value: source ?? "Tous les réseaux sociaux" });

    // include top-level fields from data
    Object.entries(data).forEach(([k, v]) => {
      // if value looks like a JSON string of an object, expand it
      if (
        typeof v === "string" &&
        ((v as string).trim().startsWith("{") ||
          (v as string).trim().startsWith("["))
      ) {
        try {
          const parsed = JSON.parse(v);
          if (parsed && typeof parsed === "object") {
            if (Array.isArray(parsed)) {
              rows.push({ key: k, value: JSON.stringify(parsed) });
            } else {
              Object.entries(parsed).forEach(([subk, subv]) => {
                rows.push({ key: `${k}:${subk}`, value: String(subv) });
              });
            }
            return;
          }
        } catch {
          // fall back to raw string
        }
      }

      // otherwise push raw
      rows.push({ key: k, value: String(v) });
    });

  const header = ["Métrique", "Valeur"];
    const csv = [header.join(",")]
      .concat(
        rows.map(
          (r) =>
            `"${String(r.key).replace(/"/g, '""')}","${String(
              r.value ?? ""
            ).replace(/"/g, '""')}"`
        )
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
  a.download = `rapport-audience-${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Map posts data to table rows for PostsTable
  const postsTableRows: PostRow[] = data.posts.map((post, idx) => {
    return {
      id: post.id,
      caption: post.caption,
      network: influencer?.network,
      likes: [12500, 45600, 8900, 3400][idx] || post.likesCount,
      comments: [234, 1800, 567, 156][idx] || post.commentsCount,
      shares: [null, 15300, null, 892][idx] || "-",
      views: [250300, 1200000, 150000, 89700][idx] || post.viewsCount,
      engagementRate: 9.9,
      date:
        ["15 Oct 25", "10 Oct 25", "5 Oct 25", "20 Oct 25"][idx] ||
        post.postedDate,
    };
  });

  return (
    <div>
      <div className="border border-gray-200 rounded-md">
        
      <div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl my-3 font-extrabold tracking-tight text-gray-900 dark:text-white">
          Publications
        </h2>
        {/* <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-3xl">
          Générez et téléchargez des rapports détaillés sur vos performances sur
          les re9seaux sociaux, les insights d&apos;audience et plus encore.
        </p> */}
      </div>
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
              Télécharger CSV
            </Button>

            {/* View mode segmented control (grid / list) */}
            <div
              className="ml-2 flex items-center rounded-md shadow-sm overflow-hidden"
              role="tablist"
              aria-label="View switch"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-r-none ${viewMode === "grid"
                    ? "bg-[#7b61f9] text-white border-[#7b61f9]"
                    : "text-gray-600"
                  }`}
              >
                <LayoutGrid
                  className={`h-4 w-4 ${viewMode === "grid" ? "text-white" : "text-gray-600"
                    }`}
                />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-l-none ${viewMode === "list"
                    ? "bg-[#7b61f9] text-white border-[#7b61f9]"
                    : "text-gray-600"
                  }`}
              >
                <List
                  className={`h-4 w-4 ${viewMode === "list" ? "text-white" : "text-gray-600"
                    }`}
                />
              </Button>
            </div>
          </div>

          {/* Right side: controls group */}
          <div className="flex items-center gap-2">
            <Suspense fallback={<div />}>
              <OrderByFilter />
            </Suspense>

            <Select value={source} onValueChange={(v) => setSource(v)}>
              <SelectTrigger className="w-40 bg-white">
                  <SelectValue placeholder="Par source" />
                </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Par source</SelectLabel>
                  {media.map((item) => (
                    <SelectItem key={item.label} value={item.label}>
                      {item.image ? (
                        item.label === "X Platform" ? (
                          <Image
                            src={item.image}
                            alt={item.label}
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
                        ) : (
                          <Image
                            src={item.image}
                            alt={item.label}
                            width={20}
                            height={20}
                          />
                        )
                      ) : (
                        <BookmarkIcon className="h-4 w-4 text-gray-500 mr-2" />
                      )}
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* <p className="text-xs">
              The audience data is based on {source ?? "All Social Medias"}
            </p> */}
          </div>
        </div>

        {viewMode === "list" ? (
          <PostsTable posts={postsTableRows} />
        ) : (
          <div className={`grid grid-cols-4 gap-3`}>
            {data &&
              data.posts &&
              data.posts.length > 0 &&
              data.posts.map((post) => (
                <PostCard key={post.id} post={post} influencer={influencer} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsGrid;
