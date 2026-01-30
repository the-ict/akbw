'use client';

import { Button } from "@/shared/ui/button";
import WelcomePng from "../../../public/assets/welcome.png"
import Image from "next/image";
import {
  cn
} from "@/shared/lib/utils";
import Product from "../product";
import OverSize from "../../../public/assets/oversize.jpg";
import OldMoney from "../../../public/assets/oldmoney.jpg";
import SportStyle from "../../../public/assets/sport-style.jpg";
import Minimalistik from "../../../public/assets/minimalistik.jpg";
import { monsterrat } from "@/shared/fonts";

export default function Welcome() {

  const logos = [
    {
      name: "VERCAGE",
      style: "font-inter text-sm font-bold text-5xl"
    }, {
      name: "VERCAGE",
      style: "font-inter text-sm font-bold text-5xl"
    }
    , {
      name: "VERCAGE",
      style: "font-inter text-sm font-bold text-5xl"
    }
    , {
      name: "VERCAGE",
      style: "font-inter text-sm font-bold text-5xl"
    }
    , {
      name: "VERCAGE",
      style: "font-inter text-sm font-bold text-5xl"
    }
    , {
      name: "VERCAGE",
      style: "font-inter text-sm font-bold text-5xl"
    }

  ]

  return (
    <div>
      <div className="container flex items-center justify-between py-10 min-h-[calc(100vh-300px)]">
        <div className="flex flex-col gap-5">
          <h1 className={cn("text-6xl font-bold", monsterrat.className)}>FIND CLOSTHER THAT MATCHES YOUR STYLE</h1>
          <p className="text-sm text-gray-500">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <Button className="w-fit rounded-full btn-welcome font-bold" size={"lg"} variant={"outline"}>
            Shop Now
          </Button>
          <div className="flex items-center gap-5">
            <div className="text-center">
              <p className="text-2xl font-bold">100%</p>
              <p>Money Back Guarantee</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">100%</p>
              <p>Money Back Guarantee</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">100%</p>
              <p>Money Back Guarantee</p>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[500px]">
          <Image src={WelcomePng.src} fill alt="welcome" className="object-contain" />
        </div>
      </div>

      <div className="h-[200px] bg-[#D6D3CC] flex items-center justify-center mb-3">
        <div className="container flex items-center gap-3 text-black overflow-hidden">
          {
            logos.map((logo, logoIndex) => (
              <h1 className={cn(logo.style)} key={logoIndex}>{logo.name}</h1>
            ))
          }
        </div>
      </div>

      <div className="container py-20">
        <div>
          <h1 className={cn("text-4xl font-bold text-center uppercase my-10", monsterrat.className)}>New Arrivals</h1>

          <div className="grid grid-cols-4 gap-5 mt-5">
            {
              [1, 2, 3, 4].map((item, index) => (
                <Product key={index} />
              ))
            }
          </div>

          <div className="flex items-center justify-center mt-10">
            <Button className="bg-[#fff]/50 text-[#000] hover:border-[#000]/100 btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl">
              View All
            </Button>
          </div>
        </div>
      </div>
      <hr />


      <div className="container py-20">
        <div>
          <h1 className={cn("text-4xl font-bold text-center uppercase my-10", monsterrat.className)}>Top Selling</h1>

          <div className="grid grid-cols-4 gap-5 mt-5">
            {
              [1, 2, 3, 4].map((item, index) => (
                <Product key={index} />
              ))
            }
          </div>

          <div className="flex items-center justify-center mt-10">
            <Button className="bg-[#fff]/50 text-[#000] hover:border-[#000]/100 btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl">
              View All
            </Button>
          </div>
        </div>
      </div>


      <div className="container bg-[#D6D3CC] p-20 pt-2 rounded-[20px] my-10">
        <h1 className={cn("text-4xl font-bold text-center uppercase my-10", monsterrat.className)}>BROWSE BY DRESS STYLE</h1>

        <div className="flex flex-col items-start w-full gap-5">
          <div className="flex gap-5 w-full">
            <div className="flex-[3] flex items-center">
              <div className="relative w-full h-[330px] rounded-[10px] overflow-hidden">
                <div className="text-sm font-bold z-10 absolute top-5 left-5 text-white bg-[#000]/30 px-3 py-1 rounded-lg">
                  <h1>Oversize</h1>
                </div>
                <Image src={OverSize.src} alt="product" fill className="object-cover z-1" />
              </div>
            </div>
            <div className="flex-[7]">
              <div className="relative w-full h-[330px] rounded-[10px] overflow-hidden">
                <div className="text-sm font-bold z-10 absolute top-5 left-5 text-white bg-[#000]/30 px-3 py-1 rounded-lg">
                  <h1>Old Money</h1>
                </div>
                <Image src={OldMoney.src} alt="product" fill className="object-cover z-1" />
              </div>
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div className="flex-[7] flex items-center">
              <div className="relative w-full h-[330px] rounded-[10px] overflow-hidden">
                <div className="text-sm font-bold z-10 absolute top-5 left-5 text-white bg-[#000]/30 px-3 py-1 rounded-lg">
                  <h1>Sport Style</h1>
                </div>
                <Image src={SportStyle.src} alt="product" fill className="object-cover z-1" />
              </div>
            </div>
            <div className="flex-[3]">
              <div className="relative w-full h-[330px] rounded-[10px] overflow-hidden">
                <div className="text-sm font-bold z-10 absolute top-5 left-5 text-white bg-[#000]/30 px-3 py-1 rounded-lg">
                  <h1>Minimalistik</h1>
                </div>
                <Image src={Minimalistik.src} alt="product" fill className="object-cover z-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
