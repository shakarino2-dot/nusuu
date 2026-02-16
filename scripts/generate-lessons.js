/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const theoryDir = path.join(process.cwd(), 'theory');
const outputDir = path.join(process.cwd(), 'data', 'lessons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Extract JSON part
  const start = content.indexOf('[');
  const end = content.lastIndexOf(']');
  if (start === -1 || end === -1) {
    console.warn(`No JSON found in ${filePath}`);
    return [];
  }
  const jsonStr = content.substring(start, end + 1);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error(`Failed to parse JSON in ${filePath}`, e);
    return [];
  }
}

function generate() {
  const files = fs.readdirSync(theoryDir).filter(f => f.endsWith('.txt') || f.endsWith('.json'));
  let lessonCounter = 1;

  for (const file of files) {
    console.log(`Processing ${file}...`);
    const items = parseFile(path.join(theoryDir, file));
    
    let questionsBuffer = [];
    
    for (const item of items) {
      if (item.typ === 'teoria') {
        // Theory found. Complete the lesson using buffered questions.
        // If buffer is empty, maybe theory starts the lesson?
        // Based on analysis: Questions 1-19 come before Theory 20.
        // So we combine buffer + theory.
        
        const lesson = {
          id: `lesson-${lessonCounter}`,
          title: item.temat || `Lekcja ${lessonCounter}`,
          theory: {
             id: item.id,
             topic: item.temat,
             content: item.tresc
          },
          questions: questionsBuffer.map(q => ({
            id: q.id,
            type: 'text', // default to text input
            question: q.pytanie,
            answer: q.odpowiedz
          }))
        };

        const lessonPath = path.join(outputDir, `${lesson.id}.json`);
        fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2));
        console.log(`Generated ${lesson.id}: ${lesson.title} (${lesson.questions.length} questions)`);
        
        lessonCounter++;
        questionsBuffer = []; // Clear buffer
      } else {
        // Quiz item
        questionsBuffer.push(item);
      }
    }
    
    // Check if any orphans (e.g. file ends with questions but no theory)
    if (questionsBuffer.length > 0) {
       console.warn(`File ${file} ended with ${questionsBuffer.length} orphaned questions without a closing theory.`);
       // Optional: Create a lesson without theory or attach to next?
       // For now, ignore or create partial.
       // Let's create a "Practice" lesson.
        const lesson = {
          id: `lesson-${lessonCounter}`,
          title: `Ćwiczenia ${lessonCounter}`,
          theory: {
             id: 0,
             topic: "Ćwiczenia praktyczne",
             content: "W tej lekcji sprawdzisz swoją wiedzę bez wstępu teoretycznego."
          },
          questions: questionsBuffer.map(q => ({
            id: q.id,
            type: 'text',
            question: q.pytanie,
            answer: q.odpowiedz
          }))
        };
        const lessonPath = path.join(outputDir, `${lesson.id}.json`);
        fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2));
        console.log(`Generated ${lesson.id} (Orphaned): ${questionsBuffer.length} questions`);
        lessonCounter++;
    }
  }
}

generate();
