"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { HeartSystem } from "./HeartSystem"
import { Question } from "@/types"
import { cn } from "@/lib/utils"

interface QuizViewProps {
    questions: Question[]
    initialHearts?: number
    onComplete: (success: boolean) => void
}

export function QuizView({ questions, initialHearts = 3, onComplete }: QuizViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [hearts, setHearts] = useState(initialHearts)
    const [answer, setAnswer] = useState("")
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')

    const currentQuestion = questions[currentIndex]
    const progress = (currentIndex / questions.length) * 100

    const normalizeString = (str: string) => {
        return str.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    }

    const handleCheck = () => {
        if (!answer.trim()) return

        const isCorrect = normalizeString(answer) === normalizeString(currentQuestion.answer)

        if (isCorrect) {
            setStatus('correct')
        } else {
            setStatus('wrong')
            setHearts(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if (status === 'wrong' && hearts <= 0) {
            onComplete(false)
            return
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setAnswer("")
            setStatus('idle')
        } else {
            onComplete(hearts > 0)
        }
    }

    if (hearts === 0 && status !== 'idle') {
        // Fail screen handled by next click or immediately?
        // Let's show the wrong feedback first, then fail on "Continue".
    }

    // Fail state override if hearts 0 and user acknowledged
    // Actually handleNext will trigger onComplete(false)

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Progress value={progress} className="w-1/2" />
                <HeartSystem hearts={hearts} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full"
                    >
                        <h2 className="text-2xl font-bold text-slate-700 mb-6">{currentQuestion.question}</h2>

                        <div className="w-full max-w-md mx-auto">
                            {/* Using textarea for flexible input or simple input */}
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                disabled={status !== 'idle'}
                                placeholder="Wpisz odpowiedź..."
                                className={cn(
                                    "w-full p-4 text-lg border-2 rounded-xl focus:outline-none focus:border-blue-400 transition-colors bg-slate-50",
                                    status === 'correct' && "border-green-500 bg-green-50 text-green-700",
                                    status === 'wrong' && "border-red-500 bg-red-50 text-red-700"
                                )}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && status === 'idle') handleCheck()
                                    else if (e.key === 'Enter' && status !== 'idle') handleNext()
                                }}
                                autoFocus
                            />
                            {status === 'wrong' && (
                                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl text-left">
                                    <p className="font-bold text-sm uppercase mb-1">Poprawna odpowiedź:</p>
                                    <p>{currentQuestion.answer}</p>
                                </div>
                            )}
                            {status === 'correct' && (
                                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-xl text-left">
                                    <p className="font-bold">Świetnie!</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t-2 border-slate-100">
                {status === 'idle' ? (
                    <Button
                        onClick={handleCheck}
                        disabled={!answer.trim()}
                        className="w-full"
                        size="lg"
                    >
                        Sprawdź (Check)
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        variant={status === 'wrong' ? "destructive" : "default"}
                        className="w-full"
                        size="lg"
                    >
                        {currentIndex === questions.length - 1 && hearts > 0 ? "Zakończ" : "Kontynuuj"} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                )}
            </div>
        </div>
    )
}
