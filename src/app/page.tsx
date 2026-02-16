import { getAllLessons } from "@/lib/lessons";
import Link from "next/link";
import { Star, Lock } from "lucide-react";

export const revalidate = 0; // Ensure fresh data on reload

export default async function Home() {
    const lessons = await getAllLessons();

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-800">Moja ścieżka (My Path)</h1>
                <p className="text-slate-500 mt-2">Wybierz lekcję i zacznij naukę.</p>
            </header>

            <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {lessons.map((lesson, index) => {
                    const isLocked = index > 0;

                    return (
                        <Link key={lesson.id} href={`/lesson/${lesson.id}`} className={isLocked ? "pointer-events-none" : ""}>
                            <div className={`p-6 rounded-2xl border-b-4 transition-transform hover:-translate-y-1 active:translate-y-0
                    ${isLocked
                                    ? 'bg-slate-100 border-slate-200 text-slate-400'
                                    : 'bg-white border-slate-200 hover:border-blue-300 group'
                                }
                `}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                            ${isLocked ? 'bg-slate-200' : 'bg-blue-500 text-white'}
                        `}>
                                        {index + 1}
                                    </div>
                                    {isLocked ? <Lock className="w-5 h-5" /> : <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 opacity-50 group-hover:opacity-100 transition-opacity" />}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg leading-tight">{lesson.title}</h3>
                                    <p className="text-sm text-slate-500">{lesson.questions.length} pytań</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
