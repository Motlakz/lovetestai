import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const zodiacCompatibility: Record<string, Record<string, number>> = {
  'Aries': { 'Leo': 90, 'Sagittarius': 88, 'Gemini': 75, 'Aquarius': 72, 'Libra': 68, 'Aries': 65 },
  'Taurus': { 'Virgo': 92, 'Capricorn': 90, 'Cancer': 78, 'Pisces': 75, 'Scorpio': 70, 'Taurus': 65 },
  'Gemini': { 'Libra': 90, 'Aquarius': 88, 'Aries': 75, 'Leo': 72, 'Sagittarius': 68, 'Gemini': 65 },
  'Cancer': { 'Scorpio': 92, 'Pisces': 90, 'Taurus': 78, 'Virgo': 75, 'Capricorn': 70, 'Cancer': 65 },
  'Leo': { 'Aries': 90, 'Sagittarius': 88, 'Gemini': 72, 'Libra': 75, 'Aquarius': 68, 'Leo': 65 },
  'Virgo': { 'Taurus': 92, 'Capricorn': 90, 'Cancer': 75, 'Scorpio': 78, 'Pisces': 70, 'Virgo': 65 },
  'Libra': { 'Gemini': 90, 'Aquarius': 88, 'Leo': 75, 'Sagittarius': 72, 'Aries': 68, 'Libra': 65 },
  'Scorpio': { 'Cancer': 92, 'Pisces': 90, 'Virgo': 78, 'Capricorn': 75, 'Taurus': 70, 'Scorpio': 65 },
  'Sagittarius': { 'Aries': 88, 'Leo': 90, 'Libra': 72, 'Aquarius': 75, 'Gemini': 68, 'Sagittarius': 65 },
  'Capricorn': { 'Taurus': 90, 'Virgo': 92, 'Scorpio': 75, 'Pisces': 78, 'Cancer': 70, 'Capricorn': 65 },
  'Aquarius': { 'Gemini': 88, 'Libra': 90, 'Aries': 72, 'Sagittarius': 75, 'Leo': 68, 'Aquarius': 65 },
  'Pisces': { 'Cancer': 90, 'Scorpio': 92, 'Taurus': 75, 'Capricorn': 78, 'Virgo': 70, 'Pisces': 65 },
};

function getCompatibilityScore(sign1: string, sign2: string): number {
  const score1 = zodiacCompatibility[sign1]?.[sign2];
  if (score1) return score1;

  const score2 = zodiacCompatibility[sign2]?.[sign1];
  if (score2) return score2;

  return 50 + Math.floor(Math.random() * 30);
}

export async function POST(request: Request) {
  try {
    const { sign1, sign2 } = await request.json();

    const score = getCompatibilityScore(sign1, sign2);

    const prompt = `Provide a zodiac compatibility analysis for ${sign1} and ${sign2}.
Compatibility Score: ${score}%

Include:
1. Overall compatibility summary
2. Key strengths of this pairing
3. Potential challenges
4. Advice for making the relationship work

Keep it 3-4 paragraphs, insightful and encouraging. Use plain text with line breaks, no markdown.`;

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
      { error: 'Failed to calculate zodiac compatibility' },
      { status: 500 }
    );
  }
}
