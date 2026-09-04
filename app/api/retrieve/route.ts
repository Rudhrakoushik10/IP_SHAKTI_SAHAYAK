import { NextRequest, NextResponse } from 'next/server';
import { retrieveMockSources } from '@/lib/retrieval-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const jurisdiction = searchParams.get('jurisdiction') || 'India';
  const category = searchParams.get('category') || undefined;

  if (q) {
    const results = retrieveMockSources(q, jurisdiction as any, category as any);
    return NextResponse.json({
      success: true,
      query: q,
      jurisdiction,
      category,
      count: results.length,
      sources: results.map((r) => ({
        source_id: r.source.source_id,
        authority: r.source.authority,
        title: r.source.title,
        provision: r.source.provision,
        jurisdiction: r.source.jurisdiction,
        topic: r.source.topic,
        summary: r.source.summary,
        score: r.score,
        matched_terms: r.matchedTerms,
        is_mock: r.source.is_mock,
      })),
    });
  }

  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/retrieve',
    description: 'Statutory corpus retrieval endpoint. Send GET with ?q=... or POST with { query }.',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, jurisdiction = 'India', category } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const results = retrieveMockSources(query, jurisdiction, category);

    return NextResponse.json({
      success: true,
      query,
      jurisdiction,
      category,
      count: results.length,
      sources: results.map((r) => ({
        source_id: r.source.source_id,
        authority: r.source.authority,
        title: r.source.title,
        provision: r.source.provision,
        jurisdiction: r.source.jurisdiction,
        topic: r.source.topic,
        summary: r.source.summary,
        score: r.score,
        matched_terms: r.matchedTerms,
        is_mock: r.source.is_mock,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Retrieval failed' }, { status: 500 });
  }
}
