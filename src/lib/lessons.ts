import fs from 'fs'
import path from 'path'
import { Lesson } from '@/types'

const lessonsDir = path.join(process.cwd(), 'data', 'lessons')

export async function getLesson(id: string): Promise<Lesson | null> {
    const filePath = path.join(lessonsDir, `${id}.json`)
    if (!fs.existsSync(filePath)) return null

    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content) as Lesson
}

export async function getAllLessons(): Promise<Lesson[]> {
    if (!fs.existsSync(lessonsDir)) return []

    const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'))
    const lessons = files.map(file => {
        const content = fs.readFileSync(path.join(lessonsDir, file), 'utf-8')
        const lesson = JSON.parse(content) as Lesson;
        return lesson;
    })

    // Sort by ID numeric value if possible, or alphanumeric
    return lessons.sort((a, b) => {
        const numA = parseInt(a.id.replace('lesson-', ''))
        const numB = parseInt(b.id.replace('lesson-', ''))
        return numA - numB
    })
}
