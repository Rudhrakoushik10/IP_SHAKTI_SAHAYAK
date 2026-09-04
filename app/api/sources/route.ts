import { NextResponse } from 'next/server';
import { MOCK_CORPUS } from '@/lib/mock-corpus';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    total_provisions: MOCK_CORPUS.length,
    sources: MOCK_CORPUS.map((s) => ({
      source_id: s.source_id,
      authority: s.authority,
      title: s.title,
      provision: s.provision,
      jurisdiction: s.jurisdiction,
      topic: s.topic,
      dataset_origin: s.dataset_origin,
      authoritative_source_url: s.authoritative_source_url,
      summary: s.summary,
    })),
  });
}
