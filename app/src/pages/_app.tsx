import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Playfair_Display } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-playfair",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <div className={`${inter.className} ${playfair.variable}`}>
        <Component {...pageProps} />
      </div>
    </TooltipProvider>
  );
}
