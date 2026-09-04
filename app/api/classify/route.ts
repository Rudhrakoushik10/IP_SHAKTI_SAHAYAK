import { NextRequest, NextResponse } from 'next/server';
import { determineCategory } from '@/lib/classification-logic';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/classify',
    description: 'Ayurveda & AYUSH product classification endpoint. Use POST with classification answers payload.',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answers = body.answers || {};

    const result = determineCategory(answers);

    return NextResponse.json({
      success: true,
      category: result.category,
      categoryHi: result.categoryHi,
      plainMeaning: result.plainMeaningEn,
      plainMeaningHi: result.plainMeaningHi,
      whyItMatters: result.whyItMattersEn,
      whyItMattersHi: result.whyItMattersHi,
      patentabilityImpact: result.patentabilityImpactEn,
      patentabilityImpactHi: result.patentabilityImpactHi,
      regulatoryPathway: result.regulatoryPathwayEn,
      regulatoryPathwayHi: result.regulatoryPathwayHi,
      confidence: result.confidence,
      confidenceReason: result.confidenceReason,
      suggestedActionItems: result.suggestedActionItems,
      relevantSourceIds: result.relevantSourceIds,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process classification' },
      { status: 400 }
    );
  }
}
