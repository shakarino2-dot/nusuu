export interface Theory {
    id: number;
    topic: string;
    content: string;
}

export interface Question {
    id: number;
    type: string; // 'text', 'multiple-choice', etc.
    question: string;
    answer: string;
}

export interface Lesson {
    id: string;
    title: string;
    theory: Theory;
    questions: Question[];
}
