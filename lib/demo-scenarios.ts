// IP-SAKTI Sahayak — Scripted Demo Scenarios & Answer Contract
// Complies with PRD Section 8, 9, 10, 14

import { MockSourceDocument, MOCK_CORPUS } from './mock-corpus';
import { ProductCategory } from './classification-logic';

export interface StructuredAnswer {
  id: string;
  directAnswerEn: string;
  directAnswerHi: string;
  whyItAppliesEn: string;
  whyItAppliesHi: string;
  category: ProductCategory | 'General';
  jurisdiction: 'India' | 'International';
  relevantLegalAreas: string[];
  citations: MockSourceDocument[];
  confidence: 'High' | 'Medium' | 'Low';
  confidenceReasonEn: string;
  confidenceReasonHi: string;
  nextStepsEn: string[];
  nextStepsHi: string[];
  disclaimerEn: string;
  disclaimerHi: string;
  isAbstained: boolean;
  abstentionReasonEn?: string;
  abstentionReasonHi?: string;
  escalationRecommended: boolean;
}

export interface DemoScenario {
  id: string;
  titleEn: string;
  titleHi: string;
  badge: string;
  queryEn: string;
  queryHi: string;
  suggestedCategory: ProductCategory;
  suggestedJurisdiction: 'India' | 'International';
  descriptionEn: string;
  descriptionHi: string;
  structuredAnswer: StructuredAnswer;
}

const DEFAULT_DISCLAIMER_EN =
  'IMPORTANT LEGAL DISCLAIMER: This guidance is provided for informational and educational decision-support only. It does not constitute formal legal advice, patent certification, or regulatory approval. Consult a registered Patent Agent or AYUSH regulatory attorney before filing.';

const DEFAULT_DISCLAIMER_HI =
  'महत्वपूर्ण कानूनी अस्वीकरण: यह मार्गदर्शन केवल सूचनात्मक और निर्णय-सहायता उद्देश्यों के लिए है। यह औपचारिक कानूनी सलाह, पेटेंट प्रमाणन या विनियामक अनुमोदन नहीं है। अंतिम आवेदन से पूर्व पंजीकृत पेटेंट एजेंट या आयुष विशेषज्ञ से परामर्श लें।';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'scenario-1-tk-patent',
    titleEn: '1. Traditional Knowledge & Patentability',
    titleHi: '१. पारंपरिक ज्ञान और पेटेंट पात्रता',
    badge: 'PRD P0 Scenario',
    queryEn: 'I have a formulation from a traditional text. Can I patent it?',
    queryHi: 'मेरे पास एक प्राचीन ग्रंथ का नुस्खा है। क्या मैं इसका पेटेंट करा सकता हूँ?',
    suggestedCategory: 'Classical Medicine',
    suggestedJurisdiction: 'India',
    descriptionEn: 'Tests Section 3(p) statutory bar, TKDL prior-art relevance, and non-patentability of verbatim ancient recipes.',
    descriptionHi: 'धारा ३(पी) कानूनी रोक और प्राचीन नुस्खों के गैर-पेटेंट योग्य होने का परीक्षण।',
    structuredAnswer: {
      id: 'ans-tk-patent',
      directAnswerEn:
        'No, a formulation taken directly from an authoritative traditional text (such as Charaka Samhita or Sushruta Samhita) cannot be patented as a product in India. Under Section 3(p) of the Indian Patents Act, traditional knowledge and aggregations of known properties are statutory non-patentable subject matter. Furthermore, the CSIR-TKDL database acts as prior art to reject such claims globally.',
      directAnswerHi:
        'नहीं, किसी प्रामाणिक प्राचीन ग्रंथ (जैसे चरक संहिता या सुश्रुत संहिता) से सीधे लिए गए नुस्खे का भारत में उत्पाद पेटेंट नहीं कराया जा सकता है। भारतीय पेटेंट अधिनियम की धारा ३(पी) के तहत पारंपरिक ज्ञान पेटेंट योग्य नहीं है। इसके अलावा, सीएसआईआर-टीकेडीएल डेटाबेस वैश्विक स्तर पर ऐसे दावों को खारिज करने हेतु पूर्व-कला (Prior Art) के रूप में कार्य करता है।',
      whyItAppliesEn:
        'Because the formulation originates verbatim from First Schedule classical texts, it is categorized as Classical Medicine in Indian jurisdiction. Section 3(p) and TKDL guidelines explicitly prohibit monopolizing public traditional knowledge.',
      whyItAppliesHi:
        'चूंकि नुस्खा प्राचीन ग्रंथों से लिया गया है, इसे भारतीय अधिकार क्षेत्र में शास्त्रीय चिकित्सा (क्लासिकल) माना जाता है। धारा ३(पी) और टीकेडीएल नियम सार्वजनिक पारंपरिक ज्ञान पर एकाधिकार को रोकते हैं।',
      category: 'Classical Medicine',
      jurisdiction: 'India',
      relevantLegalAreas: [
        'Patentability (Indian Patents Act 1970)',
        'Traditional Knowledge (Section 3(p))',
        'TKDL Defensive Prior Art',
        'AYUSH Manufacturing Licensing (Sec 3(a))',
      ],
      citations: [
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-001')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-013')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-008')!,
      ],
      confidence: 'High',
      confidenceReasonEn: 'High confidence based on direct statutory bar under Section 3(p) and established CSIR-TKDL prior-art examination protocol.',
      confidenceReasonHi: 'धारा ३(पी) के स्पष्ट कानूनी प्रावधान और सीएसआईआर-टीकेडीएल पूर्व-कला परीक्षा नियमों के आधार पर उच्च विश्वास।',
      nextStepsEn: [
        'Apply for a Classical Ayurvedic Drug Manufacturing License under Drugs & Cosmetics Act Section 3(a)',
        'Protect your brand name through Trademark Registration rather than attempting a product patent',
        'If you develop a novel eco-friendly extraction apparatus or delivery carrier (e.g. liposomes), evaluate a Process Patent',
        'Submit prior intimation to your State Biodiversity Board (SBB) under Section 7 before commercial sales',
      ],
      nextStepsHi: [
        'औषधि एवं प्रसाधन सामग्री अधिनियम की धारा ३(ए) के तहत क्लासिकल आयुर्वेदिक औषधि विनिर्माण लाइसेंस हेतु आवेदन करें',
        'उत्पाद पेटेंट के बजाय ट्रेडमार्क पंजीकरण के माध्यम से अपने ब्रांड नाम को सुरक्षित करें',
        'यदि आप एक नया निष्कर्षण उपकरण या डिलीवरी सिस्टम विकसित करते हैं, तो प्रोसेस पेटेंट पर विचार करें',
        'व्यावसायिक बिक्री से पहले राज्य जैव विविधता बोर्ड (एसबीबी) को धारा ७ के तहत पूर्व सूचना दें',
      ],
      disclaimerEn: DEFAULT_DISCLAIMER_EN,
      disclaimerHi: DEFAULT_DISCLAIMER_HI,
      isAbstained: false,
      escalationRecommended: false,
    },
  },
  {
    id: 'scenario-2-new-formulation',
    titleEn: '2. New Herbal Formulation & Synergy Checklist',
    titleHi: '२. नया हर्बल फॉर्मूलेशन और सिनर्जी चेकलिस्ट',
    badge: 'PRD P0 Scenario',
    queryEn: 'I developed a new herbal formulation. What should I check before commercialization?',
    queryHi: 'मैंने एक नया हर्बल फॉर्मूलेशन विकसित किया है। व्यावसायीकरण से पहले मुझे क्या जांचना चाहिए?',
    suggestedCategory: 'Proprietary Medicine',
    suggestedJurisdiction: 'India',
    descriptionEn: 'Covers Section 3(e) synergy burden, Rule 158B licensing evidence, and NBA Form III requirements.',
    descriptionHi: 'धारा ३(ई) सहक्रियात्मक डेटा, नियम १५८बी लाइसेंसिंग और एनबीए फॉर्म ३ आवश्यकताओं का विवरण।',
    structuredAnswer: {
      id: 'ans-new-formulation',
      directAnswerEn:
        'For a new proprietary herbal formulation, you must evaluate three core pillars: (1) Overcoming Patent Section 3(e) by proving non-obvious synergistic therapeutic efficacy with experimental data; (2) Securing a Rule 158B Proprietary Ayurvedic Medicine license with safety and published rationale; and (3) Obtaining National Biodiversity Authority (NBA Form III) approval before patent sealing if Indian biological resources are utilized.',
      directAnswerHi:
        'एक नए प्रोप्रायटरी हर्बल फॉर्मूलेशन के लिए आपको तीन मुख्य स्तंभों की जांच करनी होगी: (१) प्रायोगिक डेटा द्वारा सहक्रियात्मक (Synergistic) प्रभाव सिद्ध कर धारा ३(ई) को पार करना; (२) सुरक्षा साक्ष्यों के साथ नियम १५८बी के तहत विनिर्माण लाइसेंस लेना; और (३) भारतीय जैविक संसाधनों के उपयोग पर पेटेंट से पूर्व एनबीए (फॉर्म ३) स्वीकृति प्राप्त करना।',
      whyItAppliesEn:
        'Your product is classified as a Proprietary Ayurvedic Medicine in India. It avoids the classical text bar (Section 3(p)) but must overcome the mere admixture objection (Section 3(e)) and meet State AYUSH licensing norms.',
      whyItAppliesHi:
        'आपका उत्पाद भारत में प्रोप्रायटरी आयुर्वेदिक औषधि के रूप में वर्गीकृत है। यह धारा ३(पी) से बाहर है किंतु धारा ३(ई) के तहत सिनर्जी साबित करना अनिवार्य है।',
      category: 'Proprietary Medicine',
      jurisdiction: 'India',
      relevantLegalAreas: [
        'Synergistic Efficacy (Patents Act Section 3(e))',
        'Enhanced Efficacy (Section 3(d))',
        'AYUSH Licensing (Rule 158B)',
        'Biological Diversity Clearance (NBA Form III)',
      ],
      citations: [
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-002')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-009')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-005')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-004')!,
      ],
      confidence: 'High',
      confidenceReasonEn: 'Comprehensive regulatory match across Patent synergy hurdles (3e) and AYUSH Rule 158B requirements.',
      confidenceReasonHi: 'पेटेंट सिनर्जी बाधाओं (३ई) और आयुष नियम १५८बी आवश्यकताओं का व्यापक विनियामक मिलान।',
      nextStepsEn: [
        'Generate laboratory in-vitro/in-vivo synergy indices (Combination Index < 1.0) comparing individual herbs vs the combination',
        'Conduct a prior-art search across CSIR-TKDL and global patent databases before public disclosure or sales',
        'File an Indian Patent Application with mandatory geographical origin disclosure under Section 10(4)',
        'Submit Form III application to the National Biodiversity Authority (NBA) concurrently',
        'Apply for State Licensing Authority manufacturing license under Rule 158B with a stability dossier',
      ],
      nextStepsHi: [
        'अलग-अलग जड़ी-बूटियों बनाम मिश्रण की तुलना करने वाला प्रायोगिक सिनर्जी इंडेक्स (< १.०) तैयार करें',
        'सार्वजनिक प्रदर्शन या बिक्री से पूर्व टीकेडीएल और वैश्विक पेटेंट डेटाबेस में पूर्व-कला खोज करें',
        'धारा १०(४) के तहत जैविक स्रोत प्रकटीकरण के साथ भारतीय पेटेंट आवेदन दायर करें',
        'राष्ट्रीय जैव विविधता प्राधिकरण (एनबीए) को फॉर्म ३ आवेदन जमा करें',
        'स्थिरता परीक्षण रिपोर्ट के साथ नियम १५८बी के तहत राज्य विनिर्माण लाइसेंस के लिए आवेदन करें',
      ],
      disclaimerEn: DEFAULT_DISCLAIMER_EN,
      disclaimerHi: DEFAULT_DISCLAIMER_HI,
      isAbstained: false,
      escalationRecommended: false,
    },
  },
  {
    id: 'scenario-3-abs-check',
    titleEn: '3. ABS & Commercial Medicinal Plant Sourcing',
    titleHi: '३. एबीएस और व्यावसायिक जड़ी-बूटी खरीद',
    badge: 'PRD P1 Scenario',
    queryEn: 'I am using an Indian medicinal plant commercially. What should I check?',
    queryHi: 'मैं व्यावसायिक रूप से एक भारतीय औषधीय पौधे का उपयोग कर रहा हूँ। मुझे क्या जांचना चाहिए?',
    suggestedCategory: 'Proprietary Medicine',
    suggestedJurisdiction: 'India',
    descriptionEn: 'Evaluates Biological Diversity Act compliance, SBB intimation under Section 7, NBA Form I, and ABS benefit sharing levies.',
    descriptionHi: 'जैविक विविधता अधिनियम, धारा ७ एसबीबी पूर्व सूचना और एबीएस लेवी का मूल्यांकन।',
    structuredAnswer: {
      id: 'ans-abs-check',
      directAnswerEn:
        'Commercial utilization of Indian biological resources triggers statutory obligations under the Biological Diversity Act, 2002. If you are an Indian entity with no foreign equity, you must give prior intimation (Form I) to your State Biodiversity Board (SBB) under Section 7. If foreign entities or investors are involved, prior NBA approval (Form I) is mandatory under Section 3. Applicable benefit-sharing levies range from 0.1% to 0.5% of ex-factory sales.',
      directAnswerHi:
        'भारतीय जैविक संसाधनों का व्यावसायिक उपयोग जैविक विविधता अधिनियम, २००२ के तहत अनिवार्य दायित्व उत्पन्न करता है। यदि आप बिना किसी विदेशी हिस्सेदारी वाली भारतीय इकाई हैं, तो आपको धारा ७ के तहत राज्य जैव विविधता बोर्ड (एसबीबी) को पूर्व सूचना देनी होगी। विदेशी भागीदारी होने पर धारा ३ के तहत एनबीए स्वीकृति आवश्यक है। एबीएस शुल्क बिक्री का ०.१% से ०.५% होता है।',
      whyItAppliesEn:
        'Applies under Indian Biodiversity Law for commercial sourcing of medicinal plants (e.g. Ashwagandha, Brahmi, Guggulu). Statutory exemptions exist for traditional local vaidyas and cultivated plants with traceability.',
      whyItAppliesHi:
        'औषधीय पौधों की व्यावसायिक खरीद पर भारतीय जैव विविधता कानून लागू होता है। पारंपरिक स्थानीय वैद्यों और प्रमाणित खेतों से उगाई गई जड़ी-बूटियों के लिए विशेष छूट उपलब्ध हैं।',
      category: 'Proprietary Medicine',
      jurisdiction: 'India',
      relevantLegalAreas: [
        'Access & Benefit Sharing (ABS Regulations 2014)',
        'State Biodiversity Board Intimation (BDA Sec 7/24)',
        'National Biodiversity Authority Approval (BDA Sec 3/6)',
        'Normally Traded Commodities (NTC Exemption Sec 40)',
      ],
      citations: [
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-005')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-006')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-007')!,
      ],
      confidence: 'High',
      confidenceReasonEn: 'High confidence based on Biological Diversity Act 2002 statutory clauses and 2014 NBA Benefit Sharing Regulations.',
      confidenceReasonHi: 'जैविक विविधता अधिनियम २००२ और २०१४ एनबीए विनियमों के आधार पर उच्च विश्वास।',
      nextStepsEn: [
        'Determine entity ownership structure (100% Indian vs Foreign/NRI equity)',
        'Obtain agricultural mandi purchase bills or registered farmer contract certificates to verify cultivated origin',
        'Submit Form I prior intimation to the concerned State Biodiversity Board (SBB)',
        'Check if your herb is listed on the Section 40 Normally Traded Commodities (NTC) exemption list',
        'If planning a patent filing, apply for NBA Form III approval before grant',
      ],
      nextStepsHi: [
        'इकाई का स्वामित्व ढांचा सत्यापित करें (१००% भारतीय बनाम विदेशी/एनआरआई शेयर)',
        'खेत में उगाई गई जड़ी-बूटियों के सत्यापन हेतु मंडी बिल या किसान अनुबंध प्रमाण पत्र एकत्र करें',
        'संबंधित राज्य जैव विविधता बोर्ड (एसबीबी) को फॉर्म १ पूर्व सूचना जमा करें',
        'जांचें कि क्या पौधा धारा ४० सामान्य व्यापारिक वस्तु (NTC) सूची में शामिल है',
        'यदि पेटेंट की योजना है, तो पेटेंट मिलने से पहले एनबीए फॉर्म ३ आवेदन करें',
      ],
      disclaimerEn: DEFAULT_DISCLAIMER_EN,
      disclaimerHi: DEFAULT_DISCLAIMER_HI,
      isAbstained: false,
      escalationRecommended: false,
    },
  },
  {
    id: 'scenario-4-international-export',
    titleEn: '4. International Export & Regulatory Pathways',
    titleHi: '४. अंतरराष्ट्रीय निर्यात और विनियामक मार्ग',
    badge: 'PRD P0 Scenario',
    queryEn: 'I want to export my Ayurvedic product. What should I consider?',
    queryHi: 'मैं अपने आयुर्वेदिक उत्पाद का निर्यात करना चाहता हूँ। मुझे क्या विचार करना चाहिए?',
    suggestedCategory: 'Phytopharmaceutical',
    suggestedJurisdiction: 'International',
    descriptionEn: 'Separates India vs International framework: US FDA Botanical Drug Guidance, EMA THMPD 30-year rule, USPTO 35 U.S.C. 101, and Nagoya Protocol.',
    descriptionHi: 'अंतरराष्ट्रीय ढांचा: यूएस एफडीए बॉटनिकल ड्रग, ईएमए टीएचएमपीडी ३०-वर्षीय नियम और नागोया प्रोटोकॉल।',
    structuredAnswer: {
      id: 'ans-international-export',
      directAnswerEn:
        'Exporting Ayurvedic products requires navigating jurisdiction-specific regulatory and IP pathways. In the United States, products marketed as drugs must follow the US FDA Botanical Drug Guidance (IND/NDA with multi-batch chromatographic fingerprinting) or be sold as Dietary Supplements (DSHEA, no disease treatment claims). In the European Union, the Traditional Herbal Medicinal Products Directive (Directive 2004/24/EC) permits simplified registration only if you prove 30 years of traditional use including 15 years in the EU. Internationally, compliance with the Nagoya Protocol (ABS Clearing-House) is mandatory.',
      directAnswerHi:
        'आयुर्वेदिक उत्पादों के निर्यात हेतु देश-विशिष्ट विनियामक और आईपी नियमों का पालन आवश्यक है। अमेरिका में दवाओं को यूएस एफडीए बॉटनिकल ड्रग गाइडेंस (IND/NDA और क्रोमैटोग्राफिक फिंगरप्रिंटिंग) का पालन करना होता है या डायटरी सप्लीमेंट (DSHEA) के रूप में बेचा जा सकता है। यूरोपीय संघ में, पारंपरिक हर्बल निर्देश (2004/24/EC) के तहत ३० वर्षों के पारंपरिक उपयोग (१५ वर्ष ईयू में) का प्रमाण चाहिए। अंतरराष्ट्रीय स्तर पर नागोया प्रोटोकॉल (एबीएस) का पालन अनिवार्य है।',
      whyItAppliesEn:
        'International mode isolates non-Indian legal frameworks. Foreign patent offices (USPTO 35 U.S.C. 101, EPO Art 54(5)) and health regulators (US FDA, EMA) enforce different standards than Indian AYUSH licenses.',
      whyItAppliesHi:
        'अंतरराष्ट्रीय मोड विदेशी कानूनी ढाँचों को अलग करता है। विदेशी पेटेंट कार्यालय (USPTO, EPO) और स्वास्थ्य नियामक (US FDA, EMA) भारतीय आयुष लाइसेंसों से भिन्न मानक लागू करते हैं।',
      category: 'Phytopharmaceutical',
      jurisdiction: 'International',
      relevantLegalAreas: [
        'US FDA Botanical Drug Development (CDER 2016)',
        'US Patent Code 35 U.S.C. 101 Natural Products Doctrine',
        'European Traditional Herbal Directive 2004/24/EC (EMA)',
        'Nagoya Protocol on Access & Benefit Sharing',
      ],
      citations: [
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-INT-001')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-INT-004')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-INT-002')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-INT-006')!,
      ],
      confidence: 'High',
      confidenceReasonEn: 'Clear separation of US FDA botanical requirements and EU THMPD traditional use criteria.',
      confidenceReasonHi: 'अमेरिकी एफडीए बॉटनिकल आवश्यकताओं और यूरोपीय टीएचएमपीडी पारंपरिक उपयोग मानदंडों का स्पष्ट विभाजन।',
      nextStepsEn: [
        'Select export market pathway: Dietary Supplement / Food vs Prescription Botanical Drug',
        'Establish Chemistry, Manufacturing & Controls (CMC) batch-to-batch chromatographic fingerprints',
        'Perform heavy metal, pesticide residue, and aflatoxin screening per destination pharmacopoeia limits',
        'Secure Nagoya Protocol Internationally Recognized Certificate of Compliance (IRCC) via NBA India',
        'Audit packaging labels to strictly comply with US FDA / EU health claim regulations',
      ],
      nextStepsHi: [
        'निर्यात मार्ग चुनें: डायटरी सप्लीमेंट / फूड बनाम प्रिस्क्रिप्शन बॉटनिकल दवा',
        'बैच-टू-बैच क्रोमैटोग्राफिक फिंगरप्रिंट और विनिर्माण नियंत्रण (CMC) स्थापित करें',
        'गंतव्य देश के मानकों के अनुसार भारी धातुओं और कीटनाशक अवशेषों की जांच करें',
        'एनबीए भारत के माध्यम से नागोया प्रोटोकॉल अनुपालन प्रमाणपत्र (IRCC) प्राप्त करें',
        'यूएस एफडीए और ईयू नियमों के अनुसार पैकेजिंग लेबल का ऑडिट करें',
      ],
      disclaimerEn: DEFAULT_DISCLAIMER_EN,
      disclaimerHi: DEFAULT_DISCLAIMER_HI,
      isAbstained: false,
      escalationRecommended: false,
    },
  },
  {
    id: 'scenario-5-safe-abstention',
    titleEn: '5. Unsupported Guarantee Query (Safe Abstention)',
    titleHi: '५. असंभावित गारंटी प्रश्न (सुरक्षित विरक्ति)',
    badge: 'PRD P0 Safety & Abstention',
    queryEn: 'Will my product definitely receive a patent?',
    queryHi: 'क्या मेरे उत्पाद को निश्चित रूप से पेटेंट मिल जाएगा?',
    suggestedCategory: 'Proprietary Medicine',
    suggestedJurisdiction: 'India',
    descriptionEn: 'Demonstrates mandatory safe abstention: AI cannot guarantee legal grant or patentability. Suggests human escalation and provides concrete criteria.',
    descriptionHi: 'अनिवार्य सुरक्षित विरक्ति का प्रदर्शन: एआई पेटेंट मिलने की कानूनी गारंटी नहीं दे सकता। विशेषज्ञ रेफरल प्रदान करता है।',
    structuredAnswer: {
      id: 'ans-safe-abstention',
      directAnswerEn:
        '[SAFE ABSTENTION TRIGGERED] The AI assistant cannot guarantee, certify, or predict with certainty whether any product or formulation will receive a patent grant. Patentability is a quasi-judicial determination made exclusively by the Controller General of Patents following rigorous examination of Novelty (Section 2(1)(j)), Inventive Step (Section 2(1)(ja)), Industrial Applicability, and statutory exclusions under Section 3 (especially Sections 3(p), 3(e), and 3(d)).',
      directAnswerHi:
        '[सुरक्षित विरक्ति सक्रिय] यह एआई सहायक निश्चित रूप से यह गारंटी या भविष्यवाणी नहीं कर सकता कि किसी उत्पाद को पेटेंट मिलेगा या नहीं। पेटेंट प्रदान करना पेटेंट महानियंत्रक का अर्ध-न्यायिक निर्णय है जो नवीनता, गैर-स्पष्टता और धारा ३ (विशेष रूप से ३(पी), ३(ई), ३(डी)) के परीक्षण के बाद ही होता है।',
      whyItAppliesEn:
        'AI Guardrail Triggered: Speculative legal guarantees and absolute assurances violate system safety protocols and legal ethics. The application requires objective evidence analysis rather than definitive outcome guarantees.',
      whyItAppliesHi:
        'सुरक्षा नियम सक्रिय: कानूनी गारंटी और परिणाम का पक्का दावा सिस्टम सुरक्षा प्रोटोकॉल और कानूनी नैतिकता के खिलाफ है। निश्चित गारंटी के बजाय साक्ष्य विश्लेषण आवश्यक है।',
      category: 'Proprietary Medicine',
      jurisdiction: 'India',
      relevantLegalAreas: [
        'Patentability Criteria (Novelty, Inventive Step, Industrial Applicability)',
        'Statutory Exclusions (Section 3(p), 3(e), 3(d))',
        'Patent Examination & Quasi-Judicial Discretion',
        'Human IPR Facilitator Escalation',
      ],
      citations: [
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-001')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-014')!,
        MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-002')!,
      ],
      confidence: 'Low',
      confidenceReasonEn: 'Confidence intentionally marked Low: AI cannot legally guarantee or certify patent grant outcomes.',
      confidenceReasonHi: 'विश्वास जानबूझकर कम चिह्नित: एआई कानूनी रूप से पेटेंट अनुदान परिणामों की गारंटी नहीं दे सकता।',
      nextStepsEn: [
        'Commission an official Prior-Art Search through a registered Indian Patent Agent',
        'Conduct exhaustive clearance search on CSIR-TKDL, Indian Patent Office database, and WIPO Patentscope',
        'Consult the AYUSH Patent Cell or TIFAC Patent Facilitation Centre (PFC) for government MSME support',
        'Use the "Human Escalation" action below to generate an IPR summary packet for legal counsel',
      ],
      nextStepsHi: [
        'पंजीकृत भारतीय पेटेंट एजेंट के माध्यम से आधिकारिक पूर्व-कला खोज (Prior-Art Search) कराएं',
        'सीएसआईआर-टीकेडीएल, भारतीय पेटेंट कार्यालय और विपो पेटेंटस्कोप पर गहन खोज करें',
        'सरकारी सहायता हेतु आयुष पेटेंट सेल या टाईफैक (TIFAC) पेटेंट सुविधा केंद्र से संपर्क करें',
        'वकील या विशेषज्ञ को भेजने हेतु नीचे दिए गए "विशेषज्ञ सहायता (Escalation)" बटन का उपयोग करें',
      ],
      disclaimerEn:
        'CRITICAL SAFETY NOTICE: This AI system provides informational and decision-support guidance only. It is not an attorney, patent examiner, or government certification body. No response should be construed as a patentability guarantee or legal representation.',
      disclaimerHi:
        'महत्वपूर्ण सुरक्षा सूचना: यह एआई प्रणाली केवल सूचनात्मक मार्गदर्शन प्रदान करती है। यह कोई वकील, पेटेंट परीक्षक या सरकारी निकाय नहीं है। किसी भी उत्तर को पेटेंट गारंटी या कानूनी प्रतिनिधित्व न समझें।',
      isAbstained: true,
      abstentionReasonEn:
        'Query asks for a speculative guarantee of patent grant, which is impossible to certify prior to official examination by the Patent Office.',
      abstentionReasonHi:
        'प्रश्न में पेटेंट मिलने की निश्चित गारंटी मांगी गई है, जिसे पेटेंट कार्यालय की आधिकारिक परीक्षा से पहले प्रमाणित करना असंभव है।',
      escalationRecommended: true,
    },
  },
];

export function findMatchingScenario(query: string): StructuredAnswer | null {
  const q = query.trim().toLowerCase();

  if (q.includes('definitely receive a patent') || q.includes('guarantee') || q.includes('100% patent') || q.includes('will i get patent')) {
    return DEMO_SCENARIOS.find((s) => s.id === 'scenario-5-safe-abstention')!.structuredAnswer;
  }
  if (q.includes('traditional text') || (q.includes('charaka') && q.includes('patent')) || (q.includes('ancient') && q.includes('patent')) || q.includes('classical medicine')) {
    return DEMO_SCENARIOS.find((s) => s.id === 'scenario-1-tk-patent')!.structuredAnswer;
  }
  if (q.includes('new herbal formulation') || q.includes('new formulation') || q.includes('developed a new') || (q.includes('herbal') && q.includes('check'))) {
    return DEMO_SCENARIOS.find((s) => s.id === 'scenario-2-new-formulation')!.structuredAnswer;
  }
  if (q.includes('medicinal plant commercially') || q.includes('abs') || q.includes('biodiversity') || (q.includes('using an indian medicinal plant'))) {
    return DEMO_SCENARIOS.find((s) => s.id === 'scenario-3-abs-check')!.structuredAnswer;
  }
  if (q.includes('export') || q.includes('international') || q.includes('us fda') || q.includes('europe') || q.includes('abroad')) {
    return DEMO_SCENARIOS.find((s) => s.id === 'scenario-4-international-export')!.structuredAnswer;
  }

  return null;
}
