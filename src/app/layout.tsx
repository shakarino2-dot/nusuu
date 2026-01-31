import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nusuu - Naucz się języka",
    description: "Aplikacja do nauki języków inspirowana najlepszymi.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
            <body className={cn(inter.className, "bg-slate-50 min-h-screen")}>
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Sidebar />
                    <main className="flex-1 md:ml-[256px] pb-20 md:pb-0 min-h-screen">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
