"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TheoryView } from "./TheoryView"
import { QuizView } from "./QuizView"
import { Lesson } from "@/types"
import { Button } from "@/components/ui/button"
import { RotateCcw, CheckCircle } from "lucide-react"

interface LessonViewProps {
    lesson: Lesson
}

export function LessonView({ lesson }: LessonViewProps) {
    const router = useRouter()
    const [view, setView] = useState<'theory' | 'quiz' | 'success' | 'fail'>('theory')

    const handleQuizComplete = (success: boolean) => {
        if (success) {
            setView('success')
        } else {
            setView('fail')
        }
    }

    return (
        <div className="h-[calc(100vh-80px)] md:h-screen w-full bg-white flex flex-col">
            {view === 'theory' && (
                <TheoryView
                    theory={lesson.theory}
                    onStart={() => setView('quiz')}
                />
            )}

            {view === 'quiz' && (
                <QuizView
                    questions={lesson.questions}
                    onComplete={handleQuizComplete}
                    onRetry={() => setView('theory')}
                />
            )}

            {view === 'success' && (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                    <CheckCircle className="w-24 h-24 text-green-500" />
                    <h2 className="text-3xl font-bold text-green-600">Lekcja Ukończona!</h2>
                    <p className="text-xl text-slate-600">Zdobyłeś wiedzę i punkty XP.</p>
                    <Button size="lg" onClick={() => router.push('/')} className="w-full max-w-sm">Wróć do menu</Button>
                </div>
            )}

            {view === 'fail' && (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                    <RotateCcw className="w-24 h-24 text-red-500" />
                    <h2 className="text-3xl font-bold text-red-600">Nie udało się...</h2>
                    <p className="text-xl text-slate-600">Zabrakło żyć. Przeczytaj teorię jeszcze raz!</p>
                    <Button size="lg" onClick={() => setView('theory')} variant="secondary" className="w-full max-w-sm">
                        Powtórz Teorię
                    </Button>
                </div>
            )}
        </div>
    )
}
