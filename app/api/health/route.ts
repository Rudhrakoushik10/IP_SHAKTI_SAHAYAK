import { NextResponse } from 'next/server';
import { MOCK_CORPUS } from '@/lib/mock-corpus';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    product: 'IP-SAKTI Sahayak',
    event: 'Smart India Hackathon 2026 Presentation MVP',
    version: '1.0.0-presentation-mvp',
    mock_corpus_count: MOCK_CORPUS.length,
    timestamp: new Date().toISOString(),
    capabilities: [
      'product_classification',
      'source_grounded_retrieval',
      'citation_builder',
      'safe_abstention',
      'abs_helper',
      'tkdl_prior_art_pointer',
      'multilingual_en_hi',
    ],
  });
}
