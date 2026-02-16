import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Theory } from "@/types"

interface TheoryViewProps {
    theory: Theory
    onStart: () => void
}

export function TheoryView({ theory, onStart }: TheoryViewProps) {
    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto p-6">
            <div className="flex-1 overflow-y-auto mb-8 space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-100 pb-4">
                    {theory.topic}
                </h2>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                    <ReactMarkdown>
                        {theory.content}
                    </ReactMarkdown>
                </div>
            </div>

            <div className="pt-4 border-t-2 border-slate-100">
                <Button onClick={onStart} className="w-full" size="lg">
                    Rozpocznij quiz (Start Quiz)
                </Button>
            </div>
        </div>
    )
}
