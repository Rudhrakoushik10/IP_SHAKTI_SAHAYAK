import { NextRequest, NextResponse } from 'next/server';
import { evaluateAbsRequirements, AbsFormState } from '@/lib/abs-checker-logic';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/abs-check',
    description: 'Biological Diversity Act (ABS) compliance checker endpoint. Use POST with AbsFormState payload.',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: AbsFormState = await req.json();
    const result = evaluateAbsRequirements(body);
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return NextResponse.json({ error: 'ABS evaluation failed' }, { status: 400 });
  }
}
