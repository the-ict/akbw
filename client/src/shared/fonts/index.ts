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