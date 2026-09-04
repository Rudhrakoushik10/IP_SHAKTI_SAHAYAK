// IP-SAKTI Sahayak — Retrieval Service
// Search & ranking engine over mock legal corpus

import { MOCK_CORPUS, MockSourceDocument } from './mock-corpus';
import { ProductCategory } from './classification-logic';

export interface RetrievalResult {
  source: MockSourceDocument;
  score: number;
  matchedTerms: string[];
}

export function retrieveMockSources(
  query: string,
  jurisdiction: 'India' | 'International' | 'Both' = 'India',
  category?: ProductCategory | 'Unknown'
): RetrievalResult[] {
  const queryLower = query.toLowerCase();
  const tokens = queryLower
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const results: RetrievalResult[] = [];

  for (const doc of MOCK_CORPUS) {
    let score = 0;
    const matchedTerms: string[] = [];

    // Jurisdiction match boost
    if (jurisdiction === 'Both' || doc.jurisdiction === jurisdiction || doc.jurisdiction === 'Both') {
      score += 15;
    } else {
      score -= 30; // penalize mismatch jurisdiction
    }

    // Category matching boost
    if (category && category !== 'Unknown') {
      if (category === 'Classical Medicine' && (doc.topic === 'Traditional Knowledge / TKDL' || doc.provision.includes('3(p)'))) {
        score += 25;
      } else if (category === 'Proprietary Medicine' && (doc.provision.includes('3(e)') || doc.provision.includes('158B'))) {
        score += 25;
      } else if (category === 'Phytopharmaceutical' && (doc.topic === 'Drugs & Cosmetics' || doc.tags.includes('phytopharmaceutical'))) {
        score += 25;
      } else if (category === 'Ayurveda-Aahar / Nutraceutical' && doc.topic === 'Food / Ayurveda-Aahar') {
        score += 30;
      } else if (category === 'Cosmetic' && doc.topic === 'Cosmetics') {
        score += 30;
      }
    }

    // Keyword relevance matching
    const searchTarget = `${doc.title} ${doc.provision} ${doc.authority} ${doc.summary} ${doc.content} ${doc.tags.join(' ')}`.toLowerCase();

    for (const token of tokens) {
      if (searchTarget.includes(token)) {
        score += 10;
        if (!matchedTerms.includes(token)) {
          matchedTerms.push(token);
        }
      }
    }

    // Specific domain keywords
    if ((queryLower.includes('patent') || queryLower.includes('ipr')) && doc.topic === 'Patentability') {
      score += 20;
    }
    if ((queryLower.includes('abs') || queryLower.includes('biodiversity') || queryLower.includes('plant') || queryLower.includes('herb')) && doc.topic === 'ABS / Biodiversity') {
      score += 20;
    }
    if ((queryLower.includes('tkdl') || queryLower.includes('traditional knowledge') || queryLower.includes('charaka') || queryLower.includes('ancient')) && doc.topic === 'Traditional Knowledge / TKDL') {
      score += 25;
    }
    if ((queryLower.includes('export') || queryLower.includes('fda') || queryLower.includes('europe') || queryLower.includes('us') || queryLower.includes('international')) && (doc.jurisdiction === 'International' || doc.topic === 'International / Export')) {
      score += 25;
    }
    if ((queryLower.includes('food') || queryLower.includes('aahar') || queryLower.includes('fssai') || queryLower.includes('supplement')) && doc.topic === 'Food / Ayurveda-Aahar') {
      score += 25;
    }
    if ((queryLower.includes('cosmetic') || queryLower.includes('skin') || queryLower.includes('hair') || queryLower.includes('beauty')) && doc.topic === 'Cosmetics') {
      score += 25;
    }

    if (score > 10) {
      results.push({
        source: doc,
        score,
        matchedTerms,
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  // Return top 5 ranked sources
  return results.slice(0, 5);
}
