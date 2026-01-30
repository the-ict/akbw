'use client';

import { Button } from "@/shared/ui/button";
import WelcomePng from "../../../public/assets/welcome.png"
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import Product from "../product";

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
          <h1 className="text-6xl font-bold">FIND CLOSTHER THAT MATCHES YOUR STYLE</h1>
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
          <h1 className="text-4xl font-bold text-center uppercase my-10">New Arrivals</h1>

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
          <h1 className="text-4xl font-bold text-center uppercase my-10">Top Selling</h1>

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
    </div>
  );
}
