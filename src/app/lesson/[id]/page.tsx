import { getLesson, getAllLessons } from "@/lib/lessons";
import { LessonView } from "@/components/lesson/LessonView";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        lessonId: string
    }
}

// Generate static params for existing lessons to optimize
export async function generateStaticParams() {
    const lessons = await getAllLessons()
    return lessons.map((lesson) => ({
        lessonId: lesson.id,
    }))
}

export default async function LessonPage({ params }: PageProps) {
    console.log("LessonPage received params.lessonId:", params.lessonId);
    const lesson = await getLesson(params.lessonId)

    if (!lesson) {
        notFound()
    }

    return <LessonView lesson={lesson} />
}
