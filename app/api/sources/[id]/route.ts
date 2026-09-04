import { NextRequest, NextResponse } from 'next/server';
import { MOCK_CORPUS } from '@/lib/mock-corpus';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const source = MOCK_CORPUS.find((s) => s.source_id.toLowerCase() === id.toLowerCase());

  if (!source) {
    return NextResponse.json({ error: `Source with ID ${id} not found in mock corpus` }, { status: 404 });
  }

  return NextResponse.json({
    source_id: source.source_id,
    authority: source.authority,
    title: source.title,
    jurisdiction: source.jurisdiction,
    topic: source.topic,
    provision: source.provision,
    version_date: source.version_date,
    summary: source.summary,
    content: source.content,
    url_placeholder: source.url_placeholder,
    tags: source.tags,
    is_mock: source.is_mock,
  });
}
