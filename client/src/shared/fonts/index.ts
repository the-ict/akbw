import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const Kenao = localFont({
    src: [
        {
            path: "../../../public/fonts/Kenao.otf",
            weight: "400",
            style: "normal"
        }
    ],
    variable: "--font-kenao",
    display: "swap",
});

export const monsterrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
})
