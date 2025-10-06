import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function calculateBaseScore(name1: string, name2: string): number {
  const combined = (name1 + name2).toLowerCase();
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i);
  }
  return (sum % 50) + 40;
}

export async function POST(request: Request) {
  try {
    const { name1, name2, relationshipStatus, duration } = await request.json();

    const baseScore = calculateBaseScore(name1, name2);
    const score = Math.min(99, Math.max(35, baseScore + Math.floor(Math.random() * 20) - 10));

    const prompt = `Generate a love compatibility insight for ${name1} and ${name2}.
They are: ${relationshipStatus}
Duration/Time: ${duration}
Love Score: ${score}%

Provide:
1. A 2-3 paragraph insightful analysis about their compatibility
2. ${score >= 70 ? 'A positive affirmation or inspiring quote about love' : 'Constructive advice for building a stronger connection'}

Keep it encouraging and thoughtful. Do not use markdown formatting, just plain text with line breaks.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    });

    const fullResponse = completion.choices[0].message.content || '';
    const parts = fullResponse.split('\n\n');
    const insight = parts.slice(0, -1).join('\n\n');
    const message = parts[parts.length - 1];

    return NextResponse.json({ score, insight, message });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate love score' },
      { status: 500 }
    );
  }
}
