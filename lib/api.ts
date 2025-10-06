export async function analyzeLoveCompatibility(
  person1: string,
  person2: string,
  loveLanguage1: string,
  loveLanguage2: string,
  score: number
): Promise<string> {
  try {
    const response = await fetch('/api/analyze-compatibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        person1,
        person2,
        loveLanguage1,
        loveLanguage2,
        score
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze compatibility');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error analyzing compatibility:', error);
    throw error;
  }
}

export async function calculateLoveScore(
  name1: string,
  name2: string,
  relationshipStatus: string,
  duration: string
): Promise<{ score: number; insight: string; message: string }> {
  try {
    const response = await fetch('/api/calculate-love', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name1,
        name2,
        relationshipStatus,
        duration
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate love score');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calculating love score:', error);
    throw error;
  }
}

export async function calculateZodiacCompatibility(
  sign1: string,
  sign2: string
): Promise<{ score: number; analysis: string }> {
  try {
    const response = await fetch('/api/zodiac-compatibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sign1, sign2 }),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate zodiac compatibility');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calculating zodiac compatibility:', error);
    throw error;
  }
}

export async function calculateBirthdateCompatibility(
  date1: string,
  date2: string
): Promise<{ score: number; analysis: string }> {
  try {
    const response = await fetch('/api/birthdate-compatibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date1, date2 }),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate birthdate compatibility');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calculating birthdate compatibility:', error);
    throw error;
  }
}

export async function calculateNumerology(
  name1: string,
  name2: string,
  date1: string,
  date2: string
): Promise<{ score: number; analysis: string }> {
  try {
    const response = await fetch('/api/numerology', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name1, name2, date1, date2 }),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate numerology');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calculating numerology:', error);
    throw error;
  }
}

export async function findSoulmate(data: {
  name: string;
  birthday: string;
  zodiacSign: string;
  interests: string[];
  loveLanguage: string;
}): Promise<{ analysis: string; traits: string[] }> {
  try {
    const response = await fetch('/api/soulmate-finder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to find soulmate');
    }

    return await response.json();
  } catch (error) {
    console.error('Error finding soulmate:', error);
    throw error;
  }
}

export async function generatePoem( 
  name1: string,
  name2: string,
  theme: string,
  poemLength: number,
  rhyming: boolean
): Promise<string> {
  if (!name1 || !name2) {
    throw new Error('Both names are required');
  }

  try {
    const response = await fetch('/api/generate-poem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name1, name2, theme, poemLength, rhyming }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate poem');
    }

    const data = await response.json();
    return data.poem;
  } catch (error) {
    throw error;
  }
}
