import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { person1, person2, loveLanguage1, loveLanguage2, score } = await request.json();

    const prompt = `Analyze the love compatibility between ${person1} and ${person2}.
${person1}'s love language is ${loveLanguage1} and ${person2}'s love language is ${loveLanguage2}.
Their compatibility quiz score is ${score}%.

Provide a detailed but concise compatibility analysis (3-4 paragraphs) that includes:
1. Overall compatibility assessment
2. How their love languages complement each other
3. Potential strengths in their relationship
4. Areas to work on
5. Practical advice for building a stronger connection

Keep the tone warm, encouraging, and insightful. Format the response in markdown.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze compatibility' },
      { status: 500 }
    );
  }
}
