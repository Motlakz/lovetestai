import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { name, birthday, zodiacSign, interests, loveLanguage } = await request.json();

    const prompt = `Based on this person's profile, describe their ideal soulmate:
Name: ${name}
Birthday: ${birthday}
Zodiac Sign: ${zodiacSign}
Love Language: ${loveLanguage}
Interests: ${interests.join(', ')}

Provide:
1. A detailed description of their ideal soulmate (personality, values, characteristics) - 2-3 paragraphs
2. A list of 5-7 specific traits to look for in a potential partner

Format the response as:
First provide the analysis paragraphs.
Then on a new line, provide "TRAITS:" followed by each trait on its own line starting with "- ".`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    });

    const fullResponse = completion.choices[0].message.content || '';
    const parts = fullResponse.split('TRAITS:');
    const analysis = parts[0].trim();
    const traitsText = parts[1] || '';
    const traits = traitsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => line.substring(1).trim());

    return NextResponse.json({ analysis, traits });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to find soulmate' },
      { status: 500 }
    );
  }
}
