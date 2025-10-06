import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { name1, name2, theme, poemLength, rhyming } = await request.json();

    if (!name1 || !name2) {
      return NextResponse.json(
        { error: 'Both names are required' },
        { status: 400 }
      );
    }

    const prompt = `You are a romantic poet. Create a heartfelt love poem based on the given details.

    Names: ${name1} and ${name2}
    Theme: ${theme || 'Love and Connection'}
    Stanzas: ${poemLength || '4'}
    Rhyming: ${rhyming ? 'Yes' : 'No'}

    Instructions:
    - Mention both names at least once.
    - Keep the poem emotional, beautiful, and flowing naturally.
    - Maintain a consistent tone and rhythm.
    - Use line breaks and stanza spacing for readability.
    - End with a hopeful or affectionate sentiment.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a master of romantic poetry, skilled in crafting meaningful, emotional verses.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
    });

    const poem = completion.choices[0].message.content;

    return NextResponse.json({ poem });
  } catch (error) {
    console.error('Error generating poem:', error);
    return NextResponse.json(
      { error: 'Failed to generate poem' },
      { status: 500 }
    );
  }
}
