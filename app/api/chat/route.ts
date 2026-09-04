import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { findMatchingScenario, StructuredAnswer } from '@/lib/demo-scenarios';
import { retrieveMockSources } from '@/lib/retrieval-service';
import { MOCK_CORPUS, MockSourceDocument } from '@/lib/mock-corpus';
import { ProductCategory } from '@/lib/classification-logic';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/chat',
    description: 'IP-SAKTI Sahayak Grounded Chat Assistant endpoint. Use POST with query payload.',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      query,
      category = 'Proprietary Medicine',
      jurisdiction = 'India',
      language = 'en',
    } = body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json({ error: 'Query string is required' }, { status: 400 });
    }

    const trimmedQuery = query.trim();

    // 1. Check for deterministic demo scenarios first (PRD Section 4: "deterministic fallback for stable demo")
    const matchedScenarioAnswer = findMatchingScenario(trimmedQuery);
    if (matchedScenarioAnswer) {
      return NextResponse.json({
        success: true,
        is_deterministic_demo: true,
        answer: matchedScenarioAnswer,
      });
    }

    // 2. Check for safe abstention triggers
    const queryLower = trimmedQuery.toLowerCase();
    const isGuaranteeQuery =
      queryLower.includes('guarantee') ||
      queryLower.includes('definitely get a patent') ||
      queryLower.includes('100%') ||
      queryLower.includes('promise patent');

    if (isGuaranteeQuery) {
      const abstainedAnswer: StructuredAnswer = {
        id: `ans-abstain-${Date.now()}`,
        directAnswerEn:
          '[SAFE ABSTENTION TRIGGERED] The AI assistant cannot guarantee or predict patent grant outcomes. Under Indian Patent Law, patentability is decided exclusively by the Patent Office examining Novelty (Sec 2(1)(j)), Inventive Step (Sec 2(1)(ja)), and statutory bars under Section 3.',
        directAnswerHi:
          '[सुरक्षित विरक्ति] एआई सहायक पेटेंट मिलने की निश्चित गारंटी नहीं दे सकता। पेटेंट अनुदान केवल पेटेंट कार्यालय द्वारा नवीनता और कानूनी परीक्षणों के बाद ही निर्धारित किया जाता है।',
        whyItAppliesEn:
          'Statutory safety guardrail: Speculative assurances regarding legal determinations are prohibited.',
        whyItAppliesHi:
          'सुरक्षा नियम: कानूनी परिणामों की पक्की गारंटी देना प्रतिबंधित है।',
        category: (category as ProductCategory) || 'Proprietary Medicine',
        jurisdiction: jurisdiction || 'India',
        relevantLegalAreas: ['Patentability Criteria', 'Section 3(p)/3(e)/3(d)', 'IPO Examination'],
        citations: [
          MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-001')!,
          MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-014')!,
        ].filter(Boolean),
        confidence: 'Low',
        confidenceReasonEn: 'Low confidence: Speculative outcome queries cannot be certified by AI.',
        confidenceReasonHi: 'कम विश्वास: काल्पनिक कानूनी परिणामों की गारंटी संभव नहीं है।',
        nextStepsEn: [
          'Perform a professional novelty and freedom-to-operate search with a registered Patent Agent',
          'Consult the AYUSH Patent Facilitation Cell for official assessment',
          'Use the Human Escalation button below for expert referral',
        ],
        nextStepsHi: [
          'पंजीकृत पेटेंट एजेंट के साथ पेशेवर पूर्व-कला खोज करें',
          'आधिकारिक मूल्यांकन हेतु आयुष पेटेंट सुविधा केंद्र से परामर्श लें',
          'विशेषज्ञ रेफरल हेतु नीचे दिए गए बटन का उपयोग करें',
        ],
        disclaimerEn: 'Information only. Not formal legal advice or patentability guarantee.',
        disclaimerHi: 'केवल सूचनात्मक। कोई औपचारिक कानूनी सलाह या पेटेंट गारंटी नहीं।',
        isAbstained: true,
        abstentionReasonEn: 'Query requests definitive prediction of patent grant outcome.',
        abstentionReasonHi: 'प्रश्न में पेटेंट मिलने की निश्चित गारंटी मांगी गई है।',
        escalationRecommended: true,
      };

      return NextResponse.json({
        success: true,
        is_deterministic_demo: false,
        answer: abstainedAnswer,
      });
    }

    // 3. Retrieve relevant mock source chunks
    const retrieved = retrieveMockSources(trimmedQuery, jurisdiction, category);
    const retrievedDocs: MockSourceDocument[] = retrieved.map((r) => r.source);

    // 4. Try LLM generation with Gemini if API key is present
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const contextExcerpts = retrievedDocs
          .map(
            (doc) =>
              `[SOURCE_ID: ${doc.source_id}] Authority: ${doc.authority} | Title: ${doc.title} | Provision: ${doc.provision} | Version: ${doc.version_date}\nExcerpt: ${doc.content}`
          )
          .join('\n\n');

        const systemPrompt = `You are IP-SAKTI Sahayak, an AI assistant for Ayurveda Intellectual Property Rights (IPR) and regulatory guidance (Smart India Hackathon 2026 Presentation MVP).
ROLE: Domain information assistant, NOT legal adviser.
JURISDICTION: ${jurisdiction}.
PRODUCT CATEGORY: ${category}.
RULES:
1. Answer ONLY from the retrieved context below. Never invent statutes, treaties, or source citations.
2. If the context is insufficient or the question asks for guaranteed patent approval, clearly abstain.
3. Return a JSON object adhering to this schema:
{
  "directAnswerEn": "2 to 4 clear, grounded sentences in English",
  "directAnswerHi": "Direct answer translated to natural Hindi",
  "whyItAppliesEn": "Brief explanation of how category and jurisdiction apply",
  "whyItAppliesHi": "Brief explanation in Hindi",
  "relevantLegalAreas": ["array of 3-4 key legal frameworks"],
  "citedSourceIds": ["MOCK-IN-001", ...],
  "confidence": "High" | "Medium" | "Low",
  "confidenceReasonEn": "Brief justification for confidence level",
  "confidenceReasonHi": "Justification in Hindi",
  "nextStepsEn": ["3 to 4 actionable practical steps"],
  "nextStepsHi": ["Actionable steps in Hindi"],
  "isAbstained": boolean,
  "abstentionReasonEn": "reason if abstained, else empty string",
  "abstentionReasonHi": "reason in Hindi if abstained, else empty string"
}`;

        const userPrompt = `Retrieved Legal Context:\n${contextExcerpts}\n\nUser Question: ${trimmedQuery}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const textOutput = response.text?.trim() || '';
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          const citedSources = (parsed.citedSourceIds || [])
            .map((id: string) => MOCK_CORPUS.find((c) => c.source_id === id))
            .filter((c: MockSourceDocument | undefined): c is MockSourceDocument => Boolean(c));

          const finalCitations = citedSources.length > 0 ? citedSources : retrievedDocs.slice(0, 3);

          const structuredAnswer: StructuredAnswer = {
            id: `ans-ai-${Date.now()}`,
            directAnswerEn: parsed.directAnswerEn,
            directAnswerHi: parsed.directAnswerHi || parsed.directAnswerEn,
            whyItAppliesEn: parsed.whyItAppliesEn,
            whyItAppliesHi: parsed.whyItAppliesHi || parsed.whyItAppliesEn,
            category: (category as ProductCategory) || 'Proprietary Medicine',
            jurisdiction: jurisdiction || 'India',
            relevantLegalAreas: parsed.relevantLegalAreas || ['Patentability', 'Ayurveda Regulatory Framework'],
            citations: finalCitations,
            confidence: parsed.confidence || 'High',
            confidenceReasonEn: parsed.confidenceReasonEn || 'Grounding in retrieved statutory provisions.',
            confidenceReasonHi: parsed.confidenceReasonHi || 'प्राप्त विधिक प्रावधानों पर आधारित।',
            nextStepsEn: parsed.nextStepsEn || ['Consult a registered Patent Agent', 'Review applicable AYUSH regulations'],
            nextStepsHi: parsed.nextStepsHi || ['पंजीकृत पेटेंट एजेंट से परामर्श लें', 'लागू आयुष नियमों की समीक्षा करें'],
            disclaimerEn:
              'IMPORTANT LEGAL DISCLAIMER: This guidance is provided for informational and educational decision-support only. It does not constitute formal legal advice, patent certification, or regulatory approval.',
            disclaimerHi:
              'महत्वपूर्ण कानूनी अस्वीकरण: यह मार्गदर्शन केवल सूचनात्मक और निर्णय-सहायता उद्देश्यों के लिए है। यह औपचारिक कानूनी सलाह या पेटेंट प्रमाणन नहीं है।',
            isAbstained: Boolean(parsed.isAbstained),
            abstentionReasonEn: parsed.abstentionReasonEn,
            abstentionReasonHi: parsed.abstentionReasonHi,
            escalationRecommended: Boolean(parsed.isAbstained),
          };

          return NextResponse.json({
            success: true,
            is_deterministic_demo: false,
            answer: structuredAnswer,
          });
        }
      } catch (geminiError) {
        console.warn('Gemini API call skipped or encountered error, using structured RAG fallback:', geminiError);
      }
    }

    // 5. Fallback structured response based on retrieved mock sources
    const primarySource = retrievedDocs[0] || MOCK_CORPUS[0];
    const secondarySource = retrievedDocs[1] || MOCK_CORPUS[1];

    const fallbackAnswer: StructuredAnswer = {
      id: `ans-rag-${Date.now()}`,
      directAnswerEn: `Regarding "${trimmedQuery}", under ${jurisdiction} jurisdiction for ${category}, ${primarySource.summary} Specifically, ${primarySource.provision} establishes the applicable baseline for Ayurveda intellectual property and regulatory compliance.`,
      directAnswerHi: `"${trimmedQuery}" के संबंध में, ${jurisdiction === 'India' ? 'भारतीय' : 'अंतरराष्ट्रीय'} अधिकार क्षेत्र में ${category} के लिए: ${primarySource.summary}`,
      whyItAppliesEn: `This applies because your product query relates to ${primarySource.topic} under ${primarySource.authority}, which directly governs ${category} in ${jurisdiction}.`,
      whyItAppliesHi: `यह इसलिए लागू होता है क्योंकि आपका प्रश्न ${primarySource.authority} के तहत ${primarySource.topic} से संबंधित है।`,
      category: (category as ProductCategory) || 'Proprietary Medicine',
      jurisdiction: jurisdiction || 'India',
      relevantLegalAreas: [primarySource.topic, secondarySource.topic, 'Statutory Compliance'],
      citations: retrievedDocs.slice(0, 3),
      confidence: retrievedDocs.length > 0 ? 'High' : 'Medium',
      confidenceReasonEn: `Matched against ${retrievedDocs.length} relevant provisions in the verified mock corpus.`,
      confidenceReasonHi: `सत्यापित मॉक कॉर्पस में ${retrievedDocs.length} प्रासंगिक प्रावधानों के आधार पर।`,
      nextStepsEn: [
        `Review specific requirements under ${primarySource.provision}`,
        'Verify biological ingredient sourcing and documentation',
        'Consult the State AYUSH Licensing Authority or a certified Patent Facilitator',
      ],
      nextStepsHi: [
        `${primarySource.provision} के तहत विशिष्ट आवश्यकताओं की समीक्षा करें`,
        'जैविक घटकों के स्रोत और दस्तावेजीकरण का सत्यापन करें',
        'राज्य आयुष प्राधिकरण या प्रमाणित पेटेंट सुविधाकर्ता से परामर्श लें',
      ],
      disclaimerEn:
        'IMPORTANT LEGAL DISCLAIMER: This guidance is provided for informational decision-support only. It does not constitute formal legal advice.',
      disclaimerHi:
        'महत्वपूर्ण कानूनी अस्वीकरण: यह मार्गदर्शन केवल निर्णय-सहायता हेतु है, कोई औपचारिक कानूनी सलाह नहीं।',
      isAbstained: false,
      escalationRecommended: false,
    };

    return NextResponse.json({
      success: true,
      is_deterministic_demo: false,
      answer: fallbackAnswer,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Chat processing error' }, { status: 500 });
  }
}
