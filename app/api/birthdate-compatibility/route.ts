import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function calculateBirthdateScore(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const dayDiff = Math.abs(d1.getDate() - d2.getDate());
  const monthDiff = Math.abs(d1.getMonth() - d2.getMonth());

  const dayScore = 100 - (dayDiff * 2);
  const monthScore = 100 - (monthDiff * 5);

  const yearDiff = Math.abs(d1.getFullYear() - d2.getFullYear());
  const yearScore = Math.max(50, 100 - (yearDiff * 3));

  return Math.round((dayScore + monthScore + yearScore) / 3);
}

export async function POST(request: Request) {
  try {
    const { date1, date2 } = await request.json();

    const score = Math.min(98, Math.max(40, calculateBirthdateScore(date1, date2)));

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const prompt = `Analyze birthday compatibility between two people:
Birth Date 1: ${d1.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Birth Date 2: ${d2.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Compatibility Score: ${score}%

Provide:
1. Analysis of their birth dates and life paths
2. How their birth timing influences compatibility
3. Strengths and potential challenges
4. Advice for harmony

Keep it 3-4 paragraphs. Use plain text with line breaks, no markdown.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    });

    const analysis = completion.choices[0].message.content || '';

    return NextResponse.json({ score, analysis });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate birthdate compatibility' },
      { status: 500 }
    );
  }
}
