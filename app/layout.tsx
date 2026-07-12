import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Vazirmatn covers Persian + Latin, used for both headings and body copy
// (differentiated by weight) since the page is fully RTL/Persian.
const display = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const body = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// Numbers (prices, percentages, timestamps) stay in a monospace Latin
// face — that contrast between Persian prose and typewriter-style
// figures is the core of the "ledger" look.
// const mono = IBM_Plex_Mono({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   variable: "--font-mono",
// });

export const metadata: Metadata = {
  title: "دفتر — ردیاب زنده دارایی‌های دیجیتال",
  description:
    "دفتر بازار برای دارایی‌های دیجیتال: قیمت زنده، جستجو، فیلتر و تاریخچه قیمت — با داده‌ی CoinGecko.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${display.variable} ${body.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
