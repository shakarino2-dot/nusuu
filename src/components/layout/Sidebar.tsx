"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, User, Trophy, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const textStyle = "text-xs font-bold uppercase tracking-widest"

const NAV_ITEMS = [
    { label: "Lekcje", href: "/", icon: Book, color: "text-blue-500" },
    { label: "Ranking", href: "/leaderboard", icon: Trophy, color: "text-yellow-500" },
    { label: "Profil", href: "/profile", icon: User, color: "text-purple-500" },
]

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname()

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={cn(
                "hidden md:flex flex-col w-[256px] border-r-2 border-slate-200 p-4 fixed h-full bg-white z-10",
                className
            )}>
                <div className="mb-8 px-4 py-2">
                    <h1 className="text-2xl font-bold text-green-500 tracking-tighter">nusuu</h1>
                </div>
                <nav className="flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors border-2 border-transparent",
                                pathname === item.href
                                    ? "bg-blue-50 border-blue-200 text-blue-500"
                                    : "text-slate-500 hover:bg-slate-100"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6", pathname === item.href ? item.color : "text-slate-400")} />
                            <span className={cn(textStyle, "text-sm", pathname === item.href ? item.color : "")}>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Mobile Bottom Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 h-20 flex items-center justify-around z-50 px-2 pb-2">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center p-2 rounded-xl transition-colors w-full",
                            pathname === item.href
                                ? "text-blue-500"
                                : "text-slate-400 hover:bg-slate-50"
                        )}
                    >
                        <item.icon className={cn("w-6 h-6 mb-1", pathname === item.href ? item.color : "text-slate-400")} />
                        <span className={cn("text-[10px] font-bold uppercase", pathname === item.href ? item.color : "")}>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </>
    )
}
