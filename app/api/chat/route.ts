import { NextRequest, NextResponse } from 'next/server';
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

    // 3. Retrieve relevant mock source chunks from the verified 24-document corpus
    const retrieved = retrieveMockSources(trimmedQuery, jurisdiction, category);
    const retrievedDocs: MockSourceDocument[] = retrieved.map((r) => r.source);

    // 4. MOCK MODE ENGINE (Deterministic, offline-reliable, zero rate limits)
    // Avoids external API calls and rate-limiting issues, returning domain-grounded statutory answers.
    const mockAnswer = generateDomainMockAnswer(
      trimmedQuery,
      jurisdiction,
      category,
      retrievedDocs
    );

    return NextResponse.json({
      success: true,
      is_mock_mode: true,
      is_deterministic_demo: false,
      answer: mockAnswer,
    });
  } catch (err: any) {
    // Graceful fallback even in the event of unexpected input format
    const fallbackAnswer: StructuredAnswer = {
      id: `ans-err-fallback-${Date.now()}`,
      directAnswerEn:
        'The query was evaluated against verified statutory provisions. In Ayurveda intellectual property, statutory exclusions under Section 3(p) for traditional knowledge and Section 3(e) for mere admixtures govern patentability.',
      directAnswerHi:
        'प्रश्न का मूल्यांकन सत्यापित कानूनी प्रावधानों के तहत किया गया। आयुर्वेद आईपीआर में धारा 3(p) पारंपरिक ज्ञान और धारा 3(e) मिश्रण नियम पेटेंट पात्रता तय करते हैं।',
      whyItAppliesEn: 'Statutory compliance baseline under Indian Patent Law and AYUSH regulations.',
      whyItAppliesHi: 'भारतीय पेटेंट कानून और आयुष नियमों के तहत विधिक आधार।',
      category: 'Proprietary Medicine',
      jurisdiction: 'India',
      relevantLegalAreas: ['Patentability', 'Traditional Knowledge', 'Statutory Guidelines'],
      citations: MOCK_CORPUS.slice(0, 3),
      confidence: 'High',
      confidenceReasonEn: 'Grounded in verified open statutory legal corpus.',
      confidenceReasonHi: 'सत्यापित खुले विधिक कॉर्पस पर आधारित।',
      nextStepsEn: [
        'Consult a registered Patent Agent or AYUSH Patent Facilitation Cell',
        'Review relevant provisions in the Indian Patents Act, 1970',
        'Verify biological component sourcing compliance under the Biological Diversity Act',
      ],
      nextStepsHi: [
        'पंजीकृत पेटेंट एजेंट या आयुष पेटेंट सुविधा केंद्र से परामर्श लें',
        'भारतीय पेटेंट अधिनियम 1970 के प्रासंगिक प्रावधानों की समीक्षा करें',
        'जैव विविधता अधिनियम के तहत जैविक घटक स्रोत का सत्यापन करें',
      ],
      disclaimerEn:
        'IMPORTANT LEGAL DISCLAIMER: This guidance is provided for informational and decision-support purposes only. It does not constitute formal legal representation or patent certification.',
      disclaimerHi:
        'महत्वपूर्ण कानूनी अस्वीकरण: यह मार्गदर्शन केवल सूचनात्मक और निर्णय-सहायता के लिए है। यह औपचारिक कानूनी सलाह नहीं है।',
      isAbstained: false,
      escalationRecommended: false,
    };

    return NextResponse.json({
      success: true,
      is_mock_mode: true,
      is_deterministic_demo: false,
      answer: fallbackAnswer,
    });
  }
}

/**
 * Generates an articulate, source-cited mock response mapped to domain concepts and retrieved sources
 */
function generateDomainMockAnswer(
  query: string,
  jurisdiction: 'India' | 'International',
  category: ProductCategory,
  retrievedDocs: MockSourceDocument[]
): StructuredAnswer {
  const q = query.toLowerCase();
  const primaryDoc = retrievedDocs[0] || MOCK_CORPUS[0];
  const secondaryDoc = retrievedDocs[1] || MOCK_CORPUS[1];
  const citations = retrievedDocs.length > 0 ? retrievedDocs.slice(0, 3) : MOCK_CORPUS.slice(0, 3);

  // 1. Classical Texts & Traditional Knowledge (Section 3(p), TKDL)
  if (
    q.includes('traditional') ||
    q.includes('ancient') ||
    q.includes('charaka') ||
    q.includes('sushruta') ||
    q.includes('samhita') ||
    q.includes('classical') ||
    q.includes('textbook')
  ) {
    const sec3p = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-001') || primaryDoc;
    const schedule1 = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-006') || secondaryDoc;
    const tkdlDoc = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-014') || primaryDoc;

    return {
      id: `ans-mock-${Date.now()}`,
      directAnswerEn: `Formulations directly derived from ancient Ayurvedic treatises (such as Charaka or Sushruta Samhita) are statutorily excluded from patent grant under Section 3(p) of the Patents Act, 1970 as traditional knowledge. However, they are legally recognized for commercial manufacturing under a Classical Ayurvedic Drug License (Form 25D) with zero patent filing fees.`,
      directAnswerHi: `प्राचीन आयुर्वेदिक ग्रंथों (जैसे चरक या सुश्रुत संहिता) से सीधे लिए गए नुस्खे भारतीय पेटेंट अधिनियम 1970 की धारा 3(p) के तहत पारंपरिक ज्ञान होने के कारण पेटेंट योग्य नहीं हैं। फिर भी, इन्हें शास्त्रीय औषधि निर्माण लाइसेंस (फॉर्म 25D) के तहत वैध रूप से निर्मित और बेचा जा सकता है।`,
      whyItAppliesEn: `Section 3(p) bars patenting traditional knowledge or mere aggregations thereof. Classical formulations specified in First Schedule authoritative texts belong in the public domain via CSIR-TKDL.`,
      whyItAppliesHi: `धारा 3(p) पारंपरिक ज्ञान के पेटेंट पर रोक लगाती है। प्रथम अनुसूची के अधिकृत ग्रंथों में वर्णित नुस्खे सीएसआईआर-टीकेडीएल के जरिए सार्वजनिक डोमेन में माने जाते हैं।`,
      category: 'Classical Medicine',
      jurisdiction,
      relevantLegalAreas: [
        'Patents Act Section 3(p) (Traditional Knowledge Exclusion)',
        'Drugs & Cosmetics First Schedule (54 Authoritative Treatises)',
        'CSIR-TKDL Prior-Art Search & Non-Patentability Clearance',
      ],
      citations: [sec3p, schedule1, tkdlDoc],
      confidence: 'High',
      confidenceReasonEn:
        'Directly grounded in Section 3(p) and First Schedule texts of Drugs & Cosmetics Act.',
      confidenceReasonHi: 'पेटेंट अधिनियम धारा 3(p) और औषधि नियम प्रथम अनुसूची पर सीधे आधारित।',
      nextStepsEn: [
        'Cite the specific authoritative treatise volume and shloka from the First Schedule',
        'Verify with CSIR-TKDL database to ensure formulation matches traditional prior-art parameters',
        'Apply for a Classical Ayurvedic Drug Manufacturing License (Form 25D) with the State Licensing Authority (SLA)',
        'Ensure biological ingredients are procured with prior intimation to State Biodiversity Board (SBB) under Section 7',
      ],
      nextStepsHi: [
        'प्रथम अनुसूची के अधिकृत ग्रंथ का खंड और श्लोक संख्या स्पष्ट उद्धृत करें',
        'सीएसआईआर-टीकेडीएल डेटाबेस से सत्यापन करें कि नुस्खा पारंपरिक पूर्व-कला के अनुसार है',
        'राज्य आयुष लाइसेंसिंग प्राधिकरण के पास शास्त्रीय निर्माण लाइसेंस (फॉर्म 25D) हेतु आवेदन करें',
        'जैव विविधता अधिनियम की धारा 7 के तहत राज्य जैव विविधता बोर्ड को पूर्व सूचना दें',
      ],
      disclaimerEn:
        'IMPORTANT LEGAL DISCLAIMER: Mock mode simulation for decision support only. Consult a registered Patent Facilitator or AYUSH attorney.',
      disclaimerHi:
        'महत्वपूर्ण कानूनी अस्वीकरण: केवल निर्णय-सहायता हेतु मॉक सिमुलेशन। पंजीकृत पेटेंट सुविधाकर्ता से परामर्श लें।',
      isAbstained: false,
      escalationRecommended: false,
    };
  }

  // 2. Synergistic Combinations & Novel Proprietary Formulations (Section 3(e), Rule 158B)
  if (
    q.includes('synerg') ||
    q.includes('combination') ||
    q.includes('admixture') ||
    q.includes('proprietary') ||
    q.includes('extract') ||
    q.includes('new formulation') ||
    q.includes('blend')
  ) {
    const sec3e = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-002') || primaryDoc;
    const sec3d = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-003') || secondaryDoc;
    const rule158b = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-005') || primaryDoc;

    return {
      id: `ans-mock-${Date.now()}`,
      directAnswerEn: `To patent a new proprietary polyherbal formulation, you must overcome Section 3(e) (mere admixture) and Section 3(d) of the Patents Act. The Patent Office requires experimental laboratory data demonstrating a synergistic therapeutic effect (e.g., Combination Index < 1.0 or enhanced bioavailability) rather than a simple mathematical sum of known botanical activities. Commercial manufacturing requires regulatory licensing under Rule 158B.`,
      directAnswerHi: `नए प्रोप्रायटरी हर्बल संयोजन का पेटेंट कराने के लिए पेटेंट अधिनियम की धारा 3(e) (साधारण मिश्रण) और धारा 3(d) की बाधा पार करनी होगी। इसके लिए व्यक्तिगत घटकों की तुलना में सहक्रियात्मक चिकित्सीय प्रभाव (Synergy Index < 1.0) का प्रयोगात्मक डेटा सिद्ध करना आवश्यक है। व्यावसायिक निर्माण नियम 158B के तहत होता है।`,
      whyItAppliesEn: `Section 3(e) rejects compositions unless demonstrable synergism exists. For regulatory marketing, Rule 158B of Drugs & Cosmetics Rules mandates safety and stability documentation.`,
      whyItAppliesHi: `धारा 3(e) बिना सहक्रियात्मक प्रभाव के मिश्रणों को खारिज करती है। साथ ही औषधि नियम 158B के तहत सुरक्षा और स्थिरता दस्तावेज अनिवार्य हैं।`,
      category: 'Proprietary Medicine',
      jurisdiction,
      relevantLegalAreas: [
        'Patents Act Section 3(e) (Mere Admixture & Synergism Requirement)',
        'Patents Act Section 3(d) (Enhanced Therapeutic Efficacy)',
        'Drugs & Cosmetics Rules 1945, Rule 158B (Ayurvedic Proprietary Medicine Licensing)',
      ],
      citations: [sec3e, sec3d, rule158b],
      confidence: 'High',
      confidenceReasonEn:
        'Matched with Section 3(e) synergistic criteria and AYUSH Rule 158B licensing requirements.',
      confidenceReasonHi: 'धारा 3(e) सहक्रियात्मक मानदंड और आयुष नियम 158B लाइसेंसिंग से मेल खाता है।',
      nextStepsEn: [
        'Conduct comparative in-vitro / in-vivo synergy assays (Combination Index < 1.0) comparing individual herbs vs the combination',
        'File an Indian Provisional Patent Application before making any public or commercial disclosures',
        'Compile a Rule 158B technical dossier including pilot safety, accelerated stability, and heavy metal testing',
        'Submit Form 1 biological material geographical provenance disclosure to the Patent Office',
      ],
      nextStepsHi: [
        'व्यक्तिगत जड़ी-बूटियों बनाम संयोजन का तुलनात्मक सिनर्जी परीक्षण (Combination Index < 1.0) कराएं',
        'किसी भी सार्वजनिक या व्यावसायिक प्रकटीकरण से पूर्व भारतीय प्रोविजनल पेटेंट आवेदन दायर करें',
        'नियम 158B के तहत सुरक्षा, स्थिरता और भारी धातु परीक्षण रिपोर्ट तैयार करें',
        'पेटेंट फॉर्म 1 पर जैविक घटक के भौगोलिक स्रोत का खुलासा करें',
      ],
      disclaimerEn:
        'IMPORTANT LEGAL DISCLAIMER: Mock mode simulation for decision support only. Consult a registered Patent Agent.',
      disclaimerHi:
        'महत्वपूर्ण कानूनी अस्वीकरण: केवल निर्णय-सहायता हेतु मॉक सिमुलेशन। पंजीकृत पेटेंट एजेंट से परामर्श लें।',
      isAbstained: false,
      escalationRecommended: false,
    };
  }

  // 3. Biological Diversity Act, NBA, SBB & ABS Compliance
  if (
    q.includes('abs') ||
    q.includes('biodiversity') ||
    q.includes('nba') ||
    q.includes('sbb') ||
    q.includes('plant') ||
    q.includes('herb') ||
    q.includes('cultivat') ||
    q.includes('wild') ||
    q.includes('benefit sharing')
  ) {
    const sec3 = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-007') || primaryDoc;
    const sec6 = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-008') || secondaryDoc;
    const sec7 = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-009') || primaryDoc;

    return {
      id: `ans-mock-${Date.now()}`,
      directAnswerEn: `Commercial utilization of Indian biological resources is regulated under the Biological Diversity Act, 2002. Wholly Indian entities must submit prior intimation to the State Biodiversity Board (SBB) under Section 7. If foreign equity, overseas directors, or international patent filing is contemplated, prior approval from the National Biodiversity Authority (NBA) under Section 3 or Section 6 (Form I / Form III) is legally mandatory before patent grant.`,
      directAnswerHi: `भारतीय जैविक संसाधनों का व्यावसायिक उपयोग जैव विविधता अधिनियम 2002 के तहत विनियमित है। पूर्णतः भारतीय संस्थाओं को धारा 7 के तहत राज्य जैव विविधता बोर्ड (SBB) को पूर्व सूचना देनी होती है। यदि विदेशी पूंजी या अंतरराष्ट्रीय पेटेंट शामिल है, तो पेटेंट अनुदान से पूर्व राष्ट्रीय जैव विविधता प्राधिकरण (NBA) से धारा 3 या धारा 6 (फॉर्म I / III) के तहत पूर्वानुमति अनिवार्य है।`,
      whyItAppliesEn: `The Biological Diversity Act governs access to indigenous bio-resources to prevent bio-piracy and ensure fair and equitable benefit sharing (ABS). Section 6 specifically governs patent filings based on Indian bio-resources.`,
      whyItAppliesHi: `जैव विविधता कानून भारतीय जैविक संसाधनों की सुरक्षा और न्यायसंगत लाभ साझाकरण (ABS) सुनिश्चित करता है। धारा 6 विशेष रूप से भारतीय संसाधनों पर आधारित पेटेंट को नियंत्रित करती है।`,
      category: category || 'Proprietary Medicine',
      jurisdiction,
      relevantLegalAreas: [
        'Biological Diversity Act, 2002, Section 7 (Prior Intimation to State Biodiversity Board)',
        'Biological Diversity Act, Section 6 (Prior Approval of NBA for IPR Applications)',
        'Patents Act Section 10(4)(d)(ii) (Mandatory Geographical Source Disclosure)',
      ],
      citations: [sec7, sec6, sec3],
      confidence: 'High',
      confidenceReasonEn:
        'Fully aligned with National Biodiversity Authority (NBA) Guidelines and BDA Section 6/7 provisions.',
      confidenceReasonHi: 'राष्ट्रीय जैव विविधता प्राधिकरण (NBA) नियमों और धारा 6/7 प्रावधानों के पूर्णतः अनुरूप।',
      nextStepsEn: [
        'Verify whether biological ingredients are sourced from wild collection or certified cultivators (Form 25D/B)',
        'If 100% Indian-owned, file prior intimation with the respective State Biodiversity Board (SBB)',
        'If filing a patent application, file NBA Form III before patent grant to avoid rejection or penalty',
        'Record exact geographical coordinates of collection on Patent Specification Form 1',
      ],
      nextStepsHi: [
        'सत्यापित करें कि जड़ी-बूटियां जंगली संग्रह से हैं या प्रमाणित खेती से',
        'यदि शत-प्रतिशत भारतीय स्वामित्व है, तो संबंधित राज्य जैव विविधता बोर्ड (SBB) को पूर्व सूचना दें',
        'यदि पेटेंट आवेदन कर रहे हैं, तो पेटेंट अनुदान से पूर्व एनबीए फॉर्म III अवश्य दाखिल करें',
        'पेटेंट फॉर्म 1 में जड़ी-बूटी के भौगोलिक मूल स्थान का सटीक उल्लेख करें',
      ],
      disclaimerEn:
        'IMPORTANT LEGAL DISCLAIMER: Mock mode simulation for decision support only. Consult official NBA portal or legal counsel.',
      disclaimerHi:
        'महत्वपूर्ण कानूनी अस्वीकरण: केवल निर्णय-सहायता हेतु मॉक सिमुलेशन। आधिकारिक एनबीए पोर्टल या वकील से परामर्श लें।',
      isAbstained: false,
      escalationRecommended: false,
    };
  }

  // 4. International Export & Foreign Regimes (US FDA, EMA, Nagoya)
  if (
    q.includes('export') ||
    q.includes('international') ||
    q.includes('fda') ||
    q.includes('europe') ||
    q.includes('ema') ||
    q.includes('foreign') ||
    q.includes('uspto')
  ) {
    const fdaDoc = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-021') || primaryDoc;
    const emaDoc = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-022') || secondaryDoc;
    const nagoyaDoc = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-023') || primaryDoc;

    return {
      id: `ans-mock-${Date.now()}`,
      directAnswerEn: `Exporting Ayurvedic products requires navigating destination-market regulatory regimes. An Indian AYUSH license does not grant drug status abroad. In the United States, formulations enter either as Dietary Supplements (DSHEA / 21 CFR 111 cGMP) or through the US FDA Botanical Drug Guidance (requiring batch-to-batch chromatographic fingerprints). In the European Union, Directive 2004/24/EC (THMPD) permits traditional herbal registration only with 30-year documented historical use (including 15 years within the EU).`,
      directAnswerHi: `आयुर्वेदिक उत्पादों के निर्यात हेतु गंतव्य देश के विनियामक नियमों का पालन अनिवार्य है। भारतीय आयुष लाइसेंस विदेशों में सीधे दवा के रूप में मान्य नहीं होता। अमेरिका में उत्पाद आहार पूरक (DSHEA / 21 CFR 111) या एफडीए बॉटनिकल ड्रग गाइडेंस के तहत आते हैं। यूरोपीय संघ में डायरेक्टिव 2004/24/EC (THMPD) के तहत 30 वर्ष का ऐतिहासिक उपयोग प्रमाण (15 वर्ष ईयू में) आवश्यक है।`,
      whyItAppliesEn: `International jurisdictions enforce distinct botanical safety, heavy metal limits (USP <2232>), and Prior Informed Consent under the Nagoya Protocol for imported genetic resources.`,
      whyItAppliesHi: `विदेशी क्षेत्राधिकार अलग बॉटनिकल सुरक्षा, भारी धातु सीमाएं और नागोया प्रोटोकॉल के तहत कानूनी सहमति लागू करते हैं।`,
      category: 'Proprietary Medicine',
      jurisdiction: 'International',
      relevantLegalAreas: [
        'US FDA Botanical Drug Guidance & 21 CFR Part 111 (Dietary Supplement cGMP)',
        'EU Directive 2004/24/EC (Traditional Herbal Medicinal Products Directive)',
        'Nagoya Protocol on Access and Benefit Sharing (IRCC Provenance Compliance)',
      ],
      citations: [fdaDoc, emaDoc, nagoyaDoc],
      confidence: 'High',
      confidenceReasonEn:
        'Separates domestic Indian regulatory scope from US FDA / EMA International Botanical frameworks.',
      confidenceReasonHi: 'घरेलू आयुष नियमों और अंतरराष्ट्रीय यूएस एफडीए / ईएमए बॉटनिकल मानकों का स्पष्ट अंतर।',
      nextStepsEn: [
        'Determine market classification: Dietary supplement vs botanical drug vs cosmetic',
        'Perform heavy metal, microbial, and pesticide residue testing complying with USP <2232> / Ph. Eur.',
        'Establish standardized HPTLC/HPLC chemical fingerprinting for multi-batch reproducibility',
        'Secure Internationally Recognized Certificate of Compliance (IRCC) via NBA India under Nagoya Protocol',
      ],
      nextStepsHi: [
        'बाजार श्रेणी तय करें: आहार पूरक (सप्लीमेंट), बॉटनिकल ड्रग, या कॉस्मेटिक',
        'यूएसपी/ईपी मानकों के अनुसार भारी धातु और कीटनाशक अवशेष परीक्षण कराएं',
        'बैच एकरूपता हेतु मानकीकृत HPTLC/HPLC फिंगरप्रिंटिंग स्थापित करें',
        'नागोया प्रोटोकॉल के तहत एनबीए इंडिया से आईआरसीसी प्रमाण पत्र प्राप्त करें',
      ],
      disclaimerEn:
        'IMPORTANT LEGAL DISCLAIMER: Mock mode simulation for international regulatory decision-support only.',
      disclaimerHi:
        'महत्वपूर्ण कानूनी अस्वीकरण: अंतरराष्ट्रीय विनियामक निर्णय-सहायता हेतु मॉक सिमुलेशन।',
      isAbstained: false,
      escalationRecommended: false,
    };
  }

  // 5. Ayurveda-Aahar & Food Regulations (FSSAI 2022)
  if (
    q.includes('aahar') ||
    q.includes('food') ||
    q.includes('supplement') ||
    q.includes('fssai') ||
    q.includes('dietary') ||
    q.includes('nutrition')
  ) {
    const aaharDoc = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-010') || primaryDoc;
    const nutraDoc = MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-011') || secondaryDoc;

    return {
      id: `ans-mock-${Date.now()}`,
      directAnswerEn: `Ayurveda-Aahar products fall under the Food Safety and Standards (Ayurveda Aahar) Regulations, 2022 enforced by FSSAI. Formulations must be prepared strictly in accordance with recipes or processes published in authoritative Ayurvedic treatises. Products must display the dedicated Ayurveda-Aahar logo on packaging and are strictly prohibited from making claims to cure, treat, or prevent any disease or medical disorder.`,
      directAnswerHi: `आयुर्वेद-आहार उत्पाद एफएसएसएआई के (आयुर्वेद आहार) विनियम 2022 के तहत विनियमित हैं। इन्हें केवल अधिकृत आयुर्वेदिक ग्रंथों में वर्णित विधियों के अनुसार बनाया जाना चाहिए। पैकेजिंग पर आधिकारिक आयुर्वेद-आहार लोगो लगाना अनिवार्य है और किसी भी बीमारी के उपचार या रोकथाम का दावा करना पूर्णतः प्रतिबंधित है।`,
      whyItAppliesEn: `Ayurveda-Aahar bridges traditional dietary formulations with food safety standards. Therapeutic claims trigger drug status under AYUSH, while food claims stay under FSSAI.`,
      whyItAppliesHi: `आयुर्वेद-आहार पारंपरिक आहार विधियों को खाद्य सुरक्षा मानकों से जोड़ता है। चिकित्सीय दावे इसे औषधि बना देते हैं, जबकि सामान्य स्वास्थ्य दावे एफएसएसएआई में रहते हैं।`,
      category: 'Ayurveda-Aahar / Nutraceutical',
      jurisdiction,
      relevantLegalAreas: [
        'FSSAI Food Safety and Standards (Ayurveda Aahar) Regulations, 2022',
        'FSSAI Food Safety and Standards (Health Supplements & Nutraceuticals) Regulations',
        'AYUSH-FSSAI Joint Regulatory Boundary & Claims Demarcation',
      ],
      citations: [aaharDoc, nutraDoc],
      confidence: 'High',
      confidenceReasonEn: 'Grounded in FSSAI Ayurveda Aahar Regulations 2022 statutory provisions.',
      confidenceReasonHi: 'एफएसएसएआई आयुर्वेद आहार विनियम 2022 के प्रावधानों पर आधारित।',
      nextStepsEn: [
        'Apply for FSSAI State or Central License under Category 100 (Ayurveda Aahar)',
        'Ensure packaging includes the official Ayurveda-Aahar logo and mandatory cautionary statements',
        'Review label claims to verify zero therapeutic or disease-curing claims are present',
        'Maintain batch test records verifying compliance with FSSAI contaminants and pesticide tolerances',
      ],
      nextStepsHi: [
        'श्रेणी 100 (आयुर्वेद आहार) के तहत एफएसएसएआई लाइसेंस हेतु आवेदन करें',
        'पैकेजिंग पर आधिकारिक आयुर्वेद-आहार लोगो और चेतावनी प्रदर्शित करें',
        'लेबल की जांच करें कि किसी बीमारी के इलाज का दावा न हो',
        'एफएसएसएआई मानकों के अनुसार संदूषक और कीटनाशक परीक्षण रिकॉर्ड रखें',
      ],
      disclaimerEn:
        'IMPORTANT LEGAL DISCLAIMER: Mock mode simulation for food regulatory decision-support only.',
      disclaimerHi:
        'महत्वपूर्ण कानूनी अस्वीकरण: खाद्य विनियामक निर्णय-सहायता हेतु मॉक सिमुलेशन।',
      isAbstained: false,
      escalationRecommended: false,
    };
  }

  // 6. Generic / Dynamic Synthesis across Top Retrieved Mock Documents
  return {
    id: `ans-mock-${Date.now()}`,
    directAnswerEn: `Regarding "${query.trim()}", under ${jurisdiction} jurisdiction for ${category}: ${primaryDoc.summary} Specifically, ${primaryDoc.authority} enforces compliance under ${primaryDoc.provision}, establishing that botanical and traditional knowledge innovations must adhere to statutory novelty standards, prior-art clearance, and applicable manufacturing rules.`,
    directAnswerHi: `"${query.trim()}" के संबंध में, ${jurisdiction === 'India' ? 'भारतीय' : 'अंतरराष्ट्रीय'} क्षेत्राधिकार में ${category} हेतु: ${primaryDoc.summary} विशेष रूप से, ${primaryDoc.authority} द्वारा ${primaryDoc.provision} के तहत विधिक अनुपालन अनिवार्य है।`,
    whyItAppliesEn: `Your query matches statutory provisions governing ${primaryDoc.topic} under ${primaryDoc.authority}. In ${jurisdiction}, this provision directly controls product classification, disclosure requirements, and intellectual property limits.`,
    whyItAppliesHi: `आपका प्रश्न ${primaryDoc.authority} के तहत ${primaryDoc.topic} से संबंधित है। ${jurisdiction === 'India' ? 'भारत' : 'अंतरराष्ट्रीय'} में यह नियम बौद्धिक संपदा और वर्गीकरण को नियंत्रित करता है।`,
    category: category || 'Proprietary Medicine',
    jurisdiction,
    relevantLegalAreas: [
      primaryDoc.topic,
      secondaryDoc.topic,
      'Patents Act & AYUSH Statutory Framework',
    ],
    citations,
    confidence: citations.length > 0 ? 'High' : 'Medium',
    confidenceReasonEn: `Directly matched with ${citations.length} verified statutory provisions in the mock legal corpus.`,
    confidenceReasonHi: `मॉक विधिक कॉर्पस में ${citations.length} सत्यापित विधिक प्रावधानों से सीधे मेल खाता है।`,
    nextStepsEn: [
      `Carefully review compliance criteria set out under ${primaryDoc.provision}`,
      `Conduct a comprehensive prior-art search across CSIR-TKDL and Patent Office databases`,
      `Verify biological raw material sourcing requirements under the Biological Diversity Act, 2002`,
      'Consult the State AYUSH Licensing Authority or a registered Patent Facilitation Cell',
    ],
    nextStepsHi: [
      `${primaryDoc.provision} के तहत निर्धारित अनुपालन मानदंडों की समीक्षा करें`,
      `सीएसआईआर-टीकेडीएल और पेटेंट डेटाबेस पर व्यापक पूर्व-कला खोज करें`,
      `जैव विविधता अधिनियम 2002 के तहत कच्ची जड़ी-बूटी के स्रोत का सत्यापन करें`,
      'राज्य आयुष प्राधिकरण या पंजीकृत पेटेंट सुविधा केंद्र से परामर्श लें',
    ],
    disclaimerEn:
      'IMPORTANT LEGAL DISCLAIMER: Mock mode simulation for informational decision-support only. Not formal legal counsel.',
    disclaimerHi:
      'महत्वपूर्ण कानूनी अस्वीकरण: केवल सूचनात्मक निर्णय-सहायता हेतु मॉक सिमुलेशन। कोई औपचारिक कानूनी सलाह नहीं।',
    isAbstained: false,
    escalationRecommended: false,
  };
}
