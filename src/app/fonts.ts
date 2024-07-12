import { Bebas_Neue, Inter, Jost, PT_Sans } from "next/font/google";
import localFonts from "next/font/local";

export const market_deco = localFonts({
  src: [{ path: "../../public/fonts/Market_Deco.ttf" }],
});
export const inter = Inter({ subsets: ["latin"] });
export const jost = Jost({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
export const pt_sans = PT_Sans({ weight: "400", subsets: ["latin"] });
