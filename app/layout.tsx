import type { Metadata } from "next";
import { Inter, Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/lib/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });
const notoSansLao = Noto_Sans_Lao({
  subsets: ["lao"],
  display: "swap",
  weight: ["400", "500", "700"],
});
export const metadata: Metadata = {
  title: "Mineral Inventory",
  description: "Mineral Inventory system by Bizgital",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansLao.className}`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <main className="">{children}</main>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
