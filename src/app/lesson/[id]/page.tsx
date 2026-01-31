import { getLesson, getAllLessons } from "@/lib/lessons";
import { LessonView } from "@/components/lesson/LessonView";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        id: string
    }
}

// Generate static params for existing lessons to optimize
export async function generateStaticParams() {
    const lessons = await getAllLessons()
    return lessons.map((lesson) => ({
        id: lesson.id,
    }))
}

export default async function LessonPage({ params }: PageProps) {
    const lesson = await getLesson(params.id)

    if (!lesson) {
        notFound()
    }

    return <LessonView lesson={lesson} />
}
