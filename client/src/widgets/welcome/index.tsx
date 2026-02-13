'use client';

import {
  Button
} from "@/shared/ui/button";
import WelcomePng from "../../../public/assets/welcome-right.png"
import Image from "next/image";
import {
  cn
} from "@/shared/lib/utils";
import Product from "../product";
import OverSize from "../../../public/assets/oversize.jpg";
import OldMoney from "../../../public/assets/oldmoney.jpg";
import SportStyle from "../../../public/assets/sport-style.jpg";
import Minimalistik from "../../../public/assets/minimalistik.jpg";
import {
  monsterrat
} from "@/shared/fonts";
import {
  ArrowLeft,
  ArrowRight,
  MapPinCheckInside,
  Star,
} from "lucide-react";
import {
  useRef,
  useState,
} from "react";
import { useRecommendedProducts, useStyles } from "@/features/products/lib/hooks";
import { IProduct } from "@/shared/config/api/product/product.model";
import { IStyle } from "@/shared/config/api/product/style.model";
import { Link } from "@/shared/config/i18n/navigation";

import ShoppingCartIcon from "../../../public/icons/shoppingcart.png";
import Futbolka from "../../../public/icons/futbolka.png";
import TufliIcon from "../../../public/icons/tufli.png";
import KiyimIcon from "../../../public/icons/kiyim.png";

const logos = [
  {
    name: "VERCAGE",
    style: "font-radiant text-sm font-bold text-5xl"
  },
  {
    name: "ZARA",
    style: "font-didot text-sm font-bold text-5xl"

  }, {
    name: "GUCCI",
    style: "font-granjon text-sm font-bold text-5xl"
  }, {
    name: "PRADA",
    style: "font-rosan text-sm font-bold text-5xl"
  },
  {
    name: "Calvin Klein",
    style: "font-futura text-sm font-bold text-5xl"
  }
]

export default function Welcome() {
  const { data: recommendedData, isLoading } = useRecommendedProducts();
  const { data: stylesData } = useStyles();
  const [showAllNewest, setShowAllNewest] = useState(false);
  const [showAllMostSold, setShowAllMostSold] = useState(false);

  const newest = recommendedData?.newest || [];
  const mostSold = recommendedData?.mostSold || [];
  const styles = stylesData?.data || [];

  const displayNewest = showAllNewest ? newest : newest.slice(0, 4);
  const displayMostSold = showAllMostSold ? mostSold : mostSold.slice(0, 4);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (wrapperRef.current && reviewRef.current) {
      const scrollAmount = reviewRef.current.offsetWidth + 20;
      const newScrollPosition = direction === "left" ? wrapperRef.current.scrollLeft - scrollAmount : wrapperRef.current.scrollLeft + scrollAmount;
      wrapperRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth"
      })
    }
  };

  return (
    <div>
      <div className="container flex flex-col lg:flex-row items-center justify-between py-10 min-h-[calc(100vh-300px)] gap-10">
        <div className="flex flex-col gap-5 lg:w-1/2">
          <h1 className={cn("text-3xl lg:text-[40px] font-bold leading-tight", monsterrat.className)}>
            AKBW YANGI AVLOD ONLINE KIYIM PLATFORMASI
          </h1>
          <p className="text-sm text-gray-500 lg:text-base">
            Maqsadimiz nafaqat O‘zbekistonda, balki xalqaro bozorda ham ishonchli brendga aylanish.
            <br />
            Biz kiyimga bo‘lgan munosabatni o‘zgartiramiz. Chunki kiyim — shunchaki kundalik vosita emas, u sizning tashqi ko‘rinishingiz va o‘zingizga bo‘lgan ishonchingizdir.
          </p>
          <Link href="/filters">
            <Button className="w-full lg:w-fit rounded-full btn-welcome font-bold" size={"lg"} variant={"outline"}>
              Maxsulotlarni ko'rish
            </Button>
          </Link>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 lg:gap-10 mt-5">
            <div className="text-center lg:text-left">
              <p className="text-2xl lg:text-3xl font-bold text-center">1000+</p>
              <p className="text-xs text-gray-500">Mijozlar</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl lg:text-3xl font-bold text-center">300+</p>
              <p className="text-xs text-gray-500">Maxsulotlar</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl lg:text-3xl font-bold text-center">900+</p>
              <p className="text-xs text-gray-500">Minnatdor Mijozlar</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl lg:text-3xl font-bold text-center">5+</p>
              <p className="text-xs text-gray-500">Asartimentlar</p>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[800px] xl:h-[800px] 2xl:h-[800px] 2xl:w-1/2">
          <Image src={WelcomePng.src} fill alt="welcome" className="object-contain" priority />

          <Image
            src={ShoppingCartIcon.src}
            width={300}
            height={300}
            alt="shopping cart icon"
            className="w-[50px] md:w-[100px] lg:w-[150px] absolute bottom-40 left-10 lg:left-0 animate-float object-contain z-10 opacity-15"
            priority
          />
          <Image
            src={TufliIcon.src}
            width={300}
            height={300}
            alt="tufli icon"
            className="w-[50px] md:w-[100px] lg:w-[150px] absolute top-10 left-0 lg:left-[-50px] animate-float object-contain z-10 opacity-15"
            priority
          />
          <Image
            src={KiyimIcon.src}
            width={300}
            height={300}
            alt="kiyim icon"
            className="w-[50px] md:w-[100px] lg:w-[150px] absolute top-10 right-0 lg:right-[-50px] animate-float object-contain z-10 opacity-15"
            priority
          />
          <Image
            src={Futbolka.src}
            width={300}
            height={300}
            alt="futbolka icon"
            className="w-[50px] md:w-[100px] lg:w-[150px] absolute bottom-40 right-10 lg:right-0 animate-float object-contain z-10 opacity-15"
            priority
          />
        </div>
      </div>

      <div className="py-10 lg:h-[120px] bg-[#D6D3CC]/40 flex items-center justify-center mb-3 overflow-hidden">
        <div className="container flex flex-wrap items-center justify-between gap-8 lg:justify-between text-black">
          {
            logos.map((logo, logoIndex) => (
              <h1 className={cn(logo.style)} key={logoIndex}>{logo.name}</h1>
            ))
          }
        </div>
      </div>

      <div className="container py-20">
        <div>
          <h1 className={cn("text-4xl font-bold text-center uppercase my-10", monsterrat.className)}>Yangi Qo'shilganlar</h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {
              isLoading ? (
                [1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="w-full aspect-[3/4] rounded-2xl bg-gray-200 animate-pulse" />
                ))
              ) : (
                displayNewest.map((product: IProduct) => (
                  <Product key={product.id} product={product} />
                ))
              )
            }
          </div>

          {!isLoading && newest.length > 4 && (
            <div className="flex items-center justify-center mt-10">
              <Button
                onClick={() => setShowAllNewest(!showAllNewest)}
                className="bg-[#fff]/50 text-[#000] hover:border-[#000]/100 btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl"
              >
                {showAllNewest ? "Kamroq ko'rish" : "Ko'proq ko'rish"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <hr />


      <div className="container py-20">
        <div>
          <h1 className={cn("text-4xl font-bold text-center uppercase my-10", monsterrat.className)}>Eng ko'p sotilayotganlar</h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {
              isLoading ? (
                [1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="w-full aspect-[3/4] rounded-2xl bg-gray-200 animate-pulse" />
                ))
              ) : (
                displayMostSold.map((product: IProduct) => (
                  <Product key={product.id} product={product} />
                ))
              )
            }
          </div>

          {!isLoading && mostSold.length > 4 && (
            <div className="flex items-center justify-center mt-10">
              <Button
                onClick={() => setShowAllMostSold(!showAllMostSold)}
                className="bg-[#fff]/50 text-[#000] hover:border-[#000]/100 btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl"
              >
                {showAllMostSold ? "Show Less" : "View All"}
              </Button>
            </div>
          )}
        </div>
      </div>


      <div className="container bg-[#D6D3CC]/40 p-6 lg:p-20 pt-10 rounded-[20px] my-10">
        <h1 className={cn("text-3xl lg:text-4xl font-bold text-center uppercase mb-10", monsterrat.className)}>
          Fasllar
        </h1>

        <div className="flex flex-col gap-5 w-full">
          {styles.reduce((acc: IStyle[][], style: IStyle, i: number) => {
            if (i % 2 === 0) acc.push([style]);
            else acc[acc.length - 1].push(style);
            return acc;
          }, []).map((pair: IStyle[], rowIndex: number) => (
            <div key={rowIndex} className="flex flex-col lg:flex-row gap-5 w-full">
              {pair.map((style: IStyle, colIndex: number) => {
                const isFirst = colIndex === 0;
                // Swap ratios every row for visual interest, or keep consistent
                // Original: row 1 (3,7), row 2 (7,3)
                const isThree = (rowIndex % 2 === 0) ? isFirst : !isFirst;

                return (
                  <Link
                    key={style.id}
                    href={`/filters?category_id=${style.categoryId}`}
                    className={cn(
                      "w-full cursor-pointer",
                      isThree ? "lg:flex-[3]" : "lg:flex-[7]"
                    )}
                  >
                    <div className="relative w-full h-[190px] lg:h-[330px] rounded-[10px] overflow-hidden group">
                      <div className="text-sm font-bold z-10 absolute top-5 left-5 text-white bg-[#000]/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                        <h1>{style.category.name}</h1>
                      </div>
                      <img
                        src={style.image}
                        alt={style.category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}

          {styles.length === 0 && !isLoading && (
            <div className="py-20 text-center text-gray-400">
              <p>Hozircha fasllar mavjud emas</p>
            </div>
          )}
        </div>
      </div>

      <div className="py-20">
        <div className="container mb-10 flex items-end justify-between">
          <h1 className={cn("text-4xl font-bold uppercase", monsterrat.className)}>Bizning minnatdor mijozlarimiz</h1>
          <div className="flex gap-4">
            <button onClick={() => handleScroll('left')} className="p-2 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <button onClick={() => handleScroll('right')} className="p-2 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-scroll px-5 no-scrollbar" ref={wrapperRef}>
          {[
            {
              name: "Sarah M.",
              text: "I'm blown away by the quality and style of the clothes I received from AKBW. From everyday essentials to standout pieces, every item I've purchased has exceeded my expectations.",
            },
            {
              name: "Sarah M.",
              text: "I'm blown away by the quality and style of the clothes I received from AKBW. From everyday essentials to standout pieces, every item I've purchased has exceeded my expectations.",
            },
            {
              name: "Alex K.",
              text: "Finding clothes that align with my personal style used to be a challenge until I discovered AKBW. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
            },
            {
              name: "James L.",
              text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have come across AKBW. The selection of clothes is not only diverse but also on-point with the latest trends.",
            },
            {
              name: "Michael R.",
              text: "The customer service at AKBW is top-notch. I had a small issue with my order and they handled it quickly and professionally. Plus, the clothes look even better in person!",
            },
            {
              name: "Emma D.",
              text: "I love the minimalist aesthetic of AKBW. The fabrics are so comfortable and the fit is perfect. Highly recommend for anyone looking for quality basics.",
            },
          ].map((review, index) => (
            <div ref={reviewRef} key={index} className="flex flex-col gap-3 border-1 border-black/10 p-5 rounded-[20px] bg-[#D6D3CC]/20 w-[300px] shrink-0">
              <div className="flex items-center gap-2">
                <Star size={20} fill="yellow" className="text-yellow-500" />
                <Star size={20} fill="yellow" className="text-yellow-500" />
                <Star size={20} fill="yellow" className="text-yellow-500" />
                <Star size={20} fill="yellow" className="text-yellow-500" />
                <Star size={20} fill="yellow" className="text-yellow-500" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold">{review.name}</h1>
                <MapPinCheckInside size={20} />
              </div>
              <p className="text-sm line-clamp-3">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
