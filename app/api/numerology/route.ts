import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function calculateLifePathNumber(dateString: string): number {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const reduceToSingle = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const dayNum = reduceToSingle(day);
  const monthNum = reduceToSingle(month);
  const yearNum = reduceToSingle(year);

  return reduceToSingle(dayNum + monthNum + yearNum);
}

function calculateNameNumber(name: string): number {
  const values: Record<string, number> = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
  };

  const sum = name.toLowerCase().split('').reduce((total, char) => {
    return total + (values[char] || 0);
  }, 0);

  const reduceToSingle = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  return reduceToSingle(sum);
}

function calculateCompatibilityScore(lifePath1: number, lifePath2: number, name1: number, name2: number): number {
  const lifePathDiff = Math.abs(lifePath1 - lifePath2);
  const nameDiff = Math.abs(name1 - name2);

  const lifePathScore = 100 - (lifePathDiff * 10);
  const nameScore = 100 - (nameDiff * 8);

  return Math.round((lifePathScore + nameScore) / 2);
}

export async function POST(request: Request) {
  try {
    const { name1, name2, date1, date2 } = await request.json();

    const lifePath1 = calculateLifePathNumber(date1);
    const lifePath2 = calculateLifePathNumber(date2);
    const nameNum1 = calculateNameNumber(name1);
    const nameNum2 = calculateNameNumber(name2);

    const score = Math.min(98, Math.max(40, calculateCompatibilityScore(lifePath1, lifePath2, nameNum1, nameNum2)));

    const prompt = `Provide a numerology compatibility analysis:
Person 1: ${name1}, Life Path Number: ${lifePath1}, Expression Number: ${nameNum1}
Person 2: ${name2}, Life Path Number: ${lifePath2}, Expression Number: ${nameNum2}
Compatibility Score: ${score}%

Include:
1. What their life path numbers reveal about compatibility
2. How their expression numbers complement each other
3. Strengths and challenges in this numerological pairing
4. Advice for harmonious connection

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
      { error: 'Failed to calculate numerology' },
      { status: 500 }
    );
  }
}
