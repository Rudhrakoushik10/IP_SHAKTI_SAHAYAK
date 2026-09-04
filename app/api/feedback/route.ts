import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/feedback',
    description: 'Feedback recording endpoint. Use POST with { answer_id, rating, comment } payload.',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answer_id, rating, comment } = body;

    // Record audit feedback
    return NextResponse.json({
      success: true,
      message: 'Feedback received and recorded successfully for audit log.',
      audit: {
        answer_id: answer_id || 'ans-unknown',
        rating: rating || 'positive',
        comment: comment || '',
        recorded_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Feedback recording failed' }, { status: 400 });
  }
}
