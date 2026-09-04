// IP-SAKTI Sahayak — Classification Engine
// Implements 6 Product Categories specified in PRD Section 7

export type ProductCategory =
  | 'Classical Medicine'
  | 'Proprietary Medicine'
  | 'New/Non-Classical Drug'
  | 'Phytopharmaceutical'
  | 'Ayurveda-Aahar / Nutraceutical'
  | 'Cosmetic';

export interface ClassificationQuestion {
  id: string;
  questionEn: string;
  questionHi: string;
  hintEn: string;
  hintHi: string;
  options: {
    id: string;
    labelEn: string;
    labelHi: string;
    descriptionEn: string;
    descriptionHi: string;
  }[];
}

export interface ClassificationResult {
  category: ProductCategory;
  categoryHi: string;
  plainMeaningEn: string;
  plainMeaningHi: string;
  whyItMattersEn: string;
  whyItMattersHi: string;
  patentabilityImpactEn: string;
  patentabilityImpactHi: string;
  regulatoryPathwayEn: string;
  regulatoryPathwayHi: string;
  confidence: 'High' | 'Medium' | 'Low';
  confidenceReason: string;
  suggestedActionItems: string[];
  relevantSourceIds: string[];
}

export const CLASSIFICATION_QUESTIONS: ClassificationQuestion[] = [
  {
    id: 'primary_intent',
    questionEn: '1. What is the primary intended use and form of your product?',
    questionHi: '१. आपके उत्पाद का प्राथमिक उपयोग और स्वरूप क्या है?',
    hintEn: 'Select the primary format in which your formulation will be marketed and consumed.',
    hintHi: 'वह मुख्य प्रारूप चुनें जिसमें आपका फॉर्मूलेशन तैयार और उपयोग किया जाएगा।',
    options: [
      {
        id: 'therapeutic_ingest',
        labelEn: 'Therapeutic / Medicinal Treatment (Internal/External)',
        labelHi: 'रोग उपचार / औषधीय प्रयोग (आंतरिक/बाहरी)',
        descriptionEn: 'Formulation aimed at preventing, diagnosing, treating, or managing specific diseases/disorders.',
        descriptionHi: 'विशिष्ट बीमारियों के इलाज, रोकथाम या प्रबंधन के उद्देश्य से बनाई गई औषधि।',
      },
      {
        id: 'food_nutrition',
        labelEn: 'Dietary, Food or Nutritional Supplement (Aahar)',
        labelHi: 'आहार, खाद्य या पोषण पूरक (आयुर्वेद आहार)',
        descriptionEn: 'Dietary recipe, herbal tea, tonic, or functional nutrition formulated for daily wellness/poshana.',
        descriptionHi: 'दैनिक पोषण, स्वास्थ्य संवर्धन या पथ्य हेतु तैयार खाद्य या टॉनिक।',
      },
      {
        id: 'topical_cosmetic',
        labelEn: 'Cosmetic / Personal Care & Grooming (Skin, Hair, Beauty)',
        labelHi: 'सौंदर्य प्रसाधन / त्वचा एवं केश देखभाल (कॉस्मेटिक)',
        descriptionEn: 'External beauty, cleansing, conditioning, moisturizing, or anti-aging application.',
        descriptionHi: 'त्वचा, बाल या शारीरिक सुंदरता निखारने हेतु बाहरी लेप, तेल या क्रीम।',
      },
    ],
  },
  {
    id: 'textual_origin',
    questionEn: '2. What is the source or formulation origin of the ingredients and recipe?',
    questionHi: '२. सामग्री और नुस्खे का स्रोत अथवा मूल आधार क्या है?',
    hintEn: 'Ayurveda law differentiates formulations cited verbatim in ancient texts from novel modified combinations.',
    hintHi: 'आयुर्वेद कानून प्राचीन ग्रंथों में उल्लिखित नुस्खों और आधुनिक संशोधनों में अंतर करता है।',
    options: [
      {
        id: 'classical_exact',
        labelEn: 'Verbatim from Authoritative Ancient Texts (First Schedule)',
        labelHi: 'प्राचीन प्रामाणिक ग्रंथों (प्रथम अनुसूची) से हूबहू',
        descriptionEn: 'Formulation cited in Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Sahasrayogam, etc.',
        descriptionHi: 'चरक, सुश्रुत, अष्टांग हृदय, सहस्रयोगम जैसे मान्यता प्राप्त ग्रंथों में दर्ज नुस्खा।',
      },
      {
        id: 'modified_classical',
        labelEn: 'Classical Ingredients in Modern Dosage / Custom Rationale',
        labelHi: 'पारंपरिक घटक लेकिन आधुनिक खुराक/नया स्वरूप',
        descriptionEn: 'Contains recognized Ayurvedic herbs but combined with proprietary ratios, novel excipients, or modern capsules/syrups.',
        descriptionHi: 'पारंपरिक जड़ी-बूटियाँ किंतु अपनी विशेष मात्रा, आधुनिक कैप्सूल, सीरप या नए रूप में।',
      },
      {
        id: 'standardized_fraction',
        labelEn: 'Purified & Standardized Botanical Fraction (Bioactive Markers)',
        labelHi: 'मानकीकृत और शुद्ध पादप अंश (बायोएक्टिव मार्कर)',
        descriptionEn: 'Chromatographically purified extract with minimum 4 quantified biomarker molecules.',
        descriptionHi: 'न्यूनतम ४ परिमाणित बायोएक्टिव मार्करों वाला शुद्ध व मानकीकृत हर्बल अर्क।',
      },
      {
        id: 'novel_untested',
        labelEn: 'Novel Herbal Blend / Outside Traditional Classical Records',
        labelHi: 'नवीन हर्बल मिश्रण / पारंपरिक ग्रंथों से बाहर',
        descriptionEn: 'Newly researched combination or non-codified folklore plant usage requiring novel validation.',
        descriptionHi: 'नया शोधित संयोजन या गैर-संहिताबद्ध वनस्पति जिसका नया सत्यापन आवश्यक है।',
      },
    ],
  },
  {
    id: 'synergy_evidence',
    questionEn: '3. Do you possess scientific experimental data demonstrating synergistic therapeutic action?',
    questionHi: '३. क्या आपके पास सहक्रियात्मक (Synergistic) प्रभाव सिद्ध करने वाला प्रयोगात्मक डेटा है?',
    hintEn: 'Indian Patent Act Section 3(e) requires proof that the mixture is more than a mere sum of ingredients.',
    hintHi: 'भारतीय पेटेंट अधिनियम की धारा ३(ई) के तहत साबित करना होता है कि प्रभाव घटकों के योग से अधिक है।',
    options: [
      {
        id: 'synergy_proven',
        labelEn: 'Yes, rigorous laboratory / in-vitro / animal synergy data available',
        labelHi: 'हाँ, प्रयोगशाला / इन-विट्रो / पशु परीक्षण का सिनर्जी डेटा उपलब्ध है',
        descriptionEn: 'Statistically significant synergy index (<1.0) or enhanced therapeutic efficacy documented.',
        descriptionHi: 'सांख्यिकीय रूप से सिद्ध सिनर्जी या बेहतर प्रभावशीलता का दस्तावेजीकरण।',
      },
      {
        id: 'literature_only',
        labelEn: 'Traditional literature references & historical use proof only',
        labelHi: 'केवल पारंपरिक साहित्य संदर्भ और ऐतिहासिक उपयोग का प्रमाण',
        descriptionEn: 'Reliance on codified texts and safety records without new combination lab tests.',
        descriptionHi: 'बिना नए प्रयोगशाला परीक्षण के केवल ऐतिहासिक संहिताओं और सुरक्षा रिकॉर्ड पर निर्भरता।',
      },
      {
        id: 'clinical_trials',
        labelEn: 'Formal CDSCO Phase I / II / III Clinical Trial clearance',
        labelHi: 'सीडीएससीओ औपचारिक चरण १ / २ / ३ नैदानिक परीक्षण',
        descriptionEn: 'Standard clinical trial reports conducted under GCP guidelines.',
        descriptionHi: 'जीसीपी दिशानिर्देशों के तहत आयोजित नैदानिक परीक्षण रिपोर्ट।',
      },
    ],
  },
  {
    id: 'biological_sourcing',
    questionEn: '4. How are the raw biological materials (herbs/minerals) sourced?',
    questionHi: '४. कच्ची जैविक सामग्री (जड़ी-बूटियाँ/खनिज) कहाँ से प्राप्त की जाती हैं?',
    hintEn: 'Access and Benefit Sharing (ABS) compliance under Biological Diversity Act depends on sourcing and entity status.',
    hintHi: 'जैविक विविधता अधिनियम के तहत एबीएस अनुपालन जड़ी-बूटियों के स्रोत और इकाई के प्रकार पर निर्भर करता है।',
    options: [
      {
        id: 'cultivated_farms',
        labelEn: 'Cultivated on registered farms in India (with traceability certificate)',
        labelHi: 'भारत में पंजीकृत खेतों पर खेती (ट्रेसेबिलिटी प्रमाण पत्र सहित)',
        descriptionEn: 'Sourced from contracted growers or agricultural mandi with purchase invoices.',
        descriptionHi: 'अनुबंधित किसानों या कृषि मंडी से खरीद चालान के साथ प्राप्त।',
      },
      {
        id: 'wild_harvest',
        labelEn: 'Wild harvested from Indian forest / tribal community lands',
        labelHi: 'भारतीय वन क्षेत्रों / जनजातीय सामुदायिक भूमि से प्राकृतिक संग्रह',
        descriptionEn: 'Harvested from natural habitats requiring State Biodiversity Board (SBB) / BMC intimation.',
        descriptionHi: 'प्राकृतिक जंगलों से एकत्रित, राज्य जैव विविधता बोर्ड को पूर्व सूचना आवश्यक।',
      },
      {
        id: 'imported_overseas',
        labelEn: 'Imported from international suppliers outside India',
        labelHi: 'भारत के बाहर विदेशी आपूर्तिकर्ताओं से आयातित',
        descriptionEn: 'Biological material origin is non-Indian, subject to Nagoya Protocol / customs import rules.',
        descriptionHi: 'विदेशी जैविक सामग्री, नागोया प्रोटोकॉल और आयात नियमों के अधीन।',
      },
    ],
  },
];

export function determineCategory(answers: Record<string, string>): ClassificationResult {
  const intent = answers.primary_intent || 'therapeutic_ingest';
  const origin = answers.textual_origin || 'classical_exact';
  const synergy = answers.synergy_evidence || 'literature_only';

  if (intent === 'food_nutrition') {
    return {
      category: 'Ayurveda-Aahar / Nutraceutical',
      categoryHi: 'आयुर्वेद आहार / न्यूट्रास्युटिकल',
      plainMeaningEn: 'Food or nutritional wellness preparation formulated in accordance with Ayurvedic dietary principles (Pathya/Ahara).',
      plainMeaningHi: 'आयुर्वेदिक आहार सिद्धांतों (पथ्य/आहार) के अनुसार तैयार किया गया खाद्य या पोषण संबंधी उत्पाद।',
      whyItMattersEn: 'Regulated under FSSAI Ayurveda Aahar Regulations (2022). Cannot claim drug disease cure properties, but permitted to bear the official Ayurveda Aahar logo and wellness/physiological balance claims.',
      whyItMattersHi: 'एफएसएसएआई आयुर्वेद आहार विनियम (२०२२) के तहत विनियमित। रोग निवारण का दावा नहीं कर सकते, किंतु आधिकारिक आयुर्वेद आहार लोगो और स्वास्थ्य संवर्धन के दावे मान्य हैं।',
      patentabilityImpactEn: 'Traditional recipes are non-patentable under Section 3(p). Proprietary fortification processes or novel shelf-life stabilization methods may be patentable.',
      patentabilityImpactHi: 'धारा ३(पी) के तहत पारंपरिक व्यंजन गैर-पेटेंट योग्य हैं। स्वामित्व वाली स्थिरीकरण विधि पेटेंट योग्य हो सकती है।',
      regulatoryPathwayEn: 'FSSAI Ayurveda Aahar License with compliance to Schedule A ingredient limits.',
      regulatoryPathwayHi: 'अनुसूची ए घटक सीमाओं के अनुपालन के साथ एफएसएसएआई आयुर्वेद आहार लाइसेंस।',
      confidence: 'High',
      confidenceReason: 'Clear dietary/food intent aligning with FSSAI 2022 statutory definitions.',
      suggestedActionItems: [
        'Obtain FSSAI Central / State License under Ayurveda Aahar category',
        'Ensure packaging prominently features the dedicated Ayurveda Aahar logo',
        'Audit all marketing claims to avoid prohibited therapeutic disease-cure claims',
        'Verify biological ingredients against permitted FSSAI traditional food schedules',
      ],
      relevantSourceIds: ['MOCK-IN-011', 'MOCK-IN-001', 'MOCK-IN-006'],
    };
  }

  if (intent === 'topical_cosmetic') {
    return {
      category: 'Cosmetic',
      categoryHi: 'हर्बल कॉस्मेटिक (सौंदर्य प्रसाधन)',
      plainMeaningEn: 'Topical beauty, cleansing, or skincare formulation incorporating botanical and classical Ayurvedic ingredients.',
      plainMeaningHi: 'वानस्पतिक और शास्त्रीय आयुर्वेदिक घटकों से युक्त त्वचा, केश या सौंदर्य देखभाल हेतु उत्पाद।',
      whyItMattersEn: 'Regulated under the Cosmetics Rules, 2020 and State Licensing Authority. Prohibited from making systemic disease claims, but has faster time-to-market compared to prescription drugs.',
      whyItMattersHi: 'कॉस्मेटिक नियम २०२० और राज्य लाइसेंसिंग प्राधिकरण के तहत विनियमित। गंभीर रोग निवारण के दावों पर प्रतिबंध, किंतु बाजार में शीघ्र उपलब्धता।',
      patentabilityImpactEn: 'Base botanical ingredients excluded under Section 3(p). Novel skin permeation delivery systems (e.g. liposomal nanocarriers) or proven synergistic anti-aging complexes can be patented.',
      patentabilityImpactHi: 'मूल वनस्पति घटक धारा ३(पी) के तहत बाहर हैं। नवीन त्वचा पारगम्यता प्रणाली (नैनोकैरियर) पेटेंट योग्य हो सकती है।',
      regulatoryPathwayEn: 'Cosmetics Manufacturing License (Form 32) from State Licensing Authority + Bureau of Indian Standards (BIS) compliance.',
      regulatoryPathwayHi: 'राज्य प्राधिकरण से कॉस्मेटिक्स विनिर्माण लाइसेंस (फॉर्म ३२) और बीआईएस मानक अनुपालन।',
      confidence: 'High',
      confidenceReason: 'Topical application targeting beauty and grooming classification criteria.',
      suggestedActionItems: [
        'Apply for State Cosmetic Manufacturing License under Cosmetics Rules 2020',
        'Ensure microbiological and heavy metal limits conform to BIS standards',
        'Conduct dermatological safety and patch tests',
        'File SBB intimation if sourcing raw wild herbs from Indian states',
      ],
      relevantSourceIds: ['MOCK-IN-012', 'MOCK-IN-001', 'MOCK-IN-006'],
    };
  }

  // Therapeutic Intent Routes:
  if (origin === 'standardized_fraction' || synergy === 'clinical_trials') {
    return {
      category: 'Phytopharmaceutical',
      categoryHi: 'फाइटोफार्मास्युटिकल (मानकीकृत पादप औषधि)',
      plainMeaningEn: 'Purified and standardized fraction of medicinal plant extract with at least 4 defined active biomarker molecules.',
      plainMeaningHi: 'कम से कम ४ परिभाषित सक्रिय बायोमार्कर अणुओं वाला औषधीय पौधे के अर्क का मानकीकृत और शुद्ध अंश।',
      whyItMattersEn: 'Evaluated under CDSCO Schedule Y / Phytopharmaceutical Drug regulations like modern pharmaceutical NDAs. Eligible for both composition and process patent claims.',
      whyItMattersHi: 'सीडीएससीओ अनुसूची वाई के तहत आधुनिक दवाओं की भांति मूल्यांकित। यौगिक और निर्माण प्रक्रिया दोनों पेटेंट हेतु पात्र।',
      patentabilityImpactEn: 'High patentability potential. Strong defense against Section 3(p) and 3(d) when accompanied by chromatographic characterization and human clinical efficacy.',
      patentabilityImpactHi: 'उच्च पेटेंट क्षमता। क्रोमैटोग्राफिक प्रोफाइल और मानव नैदानिक प्रभावकारिता के साथ धारा ३(पी) और ३(डी) से सुरक्षित।',
      regulatoryPathwayEn: 'Central Drugs Standard Control Organization (CDSCO) / DCGI New Drug Approval + Phase I-III Clinical Trial Clearance.',
      regulatoryPathwayHi: 'केंद्रीय औषधि मानक नियंत्रण संगठन (सीडीएससीओ) / डीसीजीआई नई दवा अनुमोदन + नैदानिक परीक्षण।',
      confidence: 'High',
      confidenceReason: 'Meets scientific criteria of standardized fraction with quantified biomarkers.',
      suggestedActionItems: [
        'Perform complete fingerprint chromatography (HPLC/LC-MS) for 4+ active markers',
        'File patent application with complete characterization data before public disclosure',
        'Apply for NBA Form III prior approval for patent grant based on Indian biological resources',
        'Submit IND dossier to CDSCO for clinical trial permissions',
      ],
      relevantSourceIds: ['MOCK-IN-010', 'MOCK-IN-003', 'MOCK-IN-004', 'MOCK-IN-005'],
    };
  }

  if (origin === 'classical_exact') {
    return {
      category: 'Classical Medicine',
      categoryHi: 'शास्त्रीय आयुर्वेदिक औषधि (क्लासिकल मेडिसिन)',
      plainMeaningEn: 'Formulation manufactured strictly in accordance with authoritative Ayurvedic treatises listed in the First Schedule of the Drugs & Cosmetics Act.',
      plainMeaningHi: 'औषधि एवं प्रसाधन सामग्री अधिनियम की प्रथम अनुसूची में सूचीबद्ध प्रामाणिक आयुर्वेदिक ग्रंथों के अनुसार निर्मित दवा।',
      whyItMattersEn: 'Exempt from animal toxicology and clinical trial requirements for AYUSH manufacturing license. However, strictly non-patentable as product claims under Section 3(p) due to Traditional Knowledge Digital Library (TKDL) prior art.',
      whyItMattersHi: 'आयुष लाइसेंस हेतु पशु परीक्षण और बड़े क्लिनिकल ट्रायल से छूट। किंतु टीकेडीएल में दर्ज होने के कारण धारा ३(पी) के तहत उत्पाद पेटेंट असंभव।',
      patentabilityImpactEn: 'Cannot be patented as a product claim (Section 3(p) statutory bar). Only novel modified manufacturing apparatus or high-yield eco-friendly extraction processes might be patentable.',
      patentabilityImpactHi: 'उत्पाद पेटेंट वर्जित (धारा ३(पी) रोक)। केवल नवीन पर्यावरण-अनुकूल निष्कर्षण तकनीक ही प्रक्रिया पेटेंट हेतु पात्र हो सकती है।',
      regulatoryPathwayEn: 'State AYUSH Licensing Authority (ASU Drug License under Section 3(a)).',
      regulatoryPathwayHi: 'राज्य आयुष लाइसेंसिंग प्राधिकरण (धारा ३(ए) के तहत एएसयू औषधि लाइसेंस)।',
      confidence: 'High',
      confidenceReason: 'Verbatim classical textual origin triggers definitive Traditional Knowledge exclusion.',
      suggestedActionItems: [
        'Apply for Classical Ayurvedic Drug License with textual citation (First Schedule)',
        'Register distinctive brand trademark rather than relying on generic formulation names',
        'Submit SBB intimation under Biological Diversity Act Section 7 if commercialized',
        'Do not spend funds attempting product patent on exact classical formulation',
      ],
      relevantSourceIds: ['MOCK-IN-001', 'MOCK-IN-008', 'MOCK-IN-013', 'MOCK-IN-006'],
    };
  }

  if (origin === 'modified_classical' || synergy === 'synergy_proven') {
    return {
      category: 'Proprietary Medicine',
      categoryHi: 'स्वामित्व वाली आयुर्वेदिक औषधि (प्रोप्रायटरी मेडिसिन)',
      plainMeaningEn: 'Ayurvedic medicine containing recognized classical ingredients but formulated in a proprietary ratio, novel dosage form, or custom therapeutic blend.',
      plainMeaningHi: 'मान्यता प्राप्त शास्त्रीय घटकों वाली किंतु अपनी विशेष मात्रा, नए स्वरूप या विशिष्ट फॉर्मूले में तैयार आयुर्वेदिक दवा।',
      whyItMattersEn: 'Requires Rule 158B licensing evidence (safety documentation and pilot clinical data). Patentable only if applicant proves non-obvious synergistic efficacy under Section 3(e) to overcome TKDL prior art objections.',
      whyItMattersHi: 'नियम १५८बी के तहत सुरक्षा और पायलट डेटा आवश्यक। पेटेंट तभी संभव जब टीकेडीएल आपत्तियों को खारिज करने हेतु धारा ३(ई) के तहत सिनर्जी सिद्ध हो।',
      patentabilityImpactEn: 'Patentable only with robust experimental synergy data (Combination Index < 1.0) and novel pharmacokinetic advantage to satisfy Sections 3(e) and 3(d).',
      patentabilityImpactHi: 'केवल ठोस प्रायोगिक सिनर्जी डेटा और बेहतर औषधीय लाभ सिद्ध करने पर ही धारा ३(ई) और ३(डी) के तहत पेटेंट संभव।',
      regulatoryPathwayEn: 'Ayurvedic Proprietary Medicine License from State Licensing Authority under Rule 158B.',
      regulatoryPathwayHi: 'नियम १५८बी के तहत राज्य लाइसेंसिंग प्राधिकरण से प्रोप्रायटरी आयुर्वेदिक औषधि लाइसेंस।',
      confidence: 'High',
      confidenceReason: 'Combination of classical ingredients in custom formulation matches Rule 158B & Section 3(e) criteria.',
      suggestedActionItems: [
        'Generate laboratory synergy index and stability data for the proprietary combination',
        'Conduct TKDL prior-art clearance search before submitting patent application',
        'File NBA Form III application concurrently when submitting Indian patent specification',
        'Apply for Rule 158B State AYUSH Manufacturing License',
      ],
      relevantSourceIds: ['MOCK-IN-002', 'MOCK-IN-009', 'MOCK-IN-001', 'MOCK-IN-005'],
    };
  }

  return {
    category: 'New/Non-Classical Drug',
    categoryHi: 'नवीन / गैर-शास्त्रीय हर्बल औषधि',
    plainMeaningEn: 'Herbal drug formulated outside classical First Schedule treatises using newly researched botanical extracts or uncodified traditional remedies.',
    plainMeaningHi: 'प्रथम अनुसूची ग्रंथों से बाहर नए शोधित वनस्पति अर्क या गैर-संहिताबद्ध पारंपरिक उपचारों पर आधारित दवा।',
    whyItMattersEn: 'Cannot rely on classical textual exemptions. Requires full preclinical safety toxicology, stability testing, and clinical trial evidence before commercial marketing authorization.',
    whyItMattersHi: 'शास्त्रीय छूट का लाभ नहीं। व्यावसायीकरण से पूर्व पूर्ण सुरक्षा विष विज्ञान, स्थिरता और नैदानिक परीक्षण आवश्यक।',
    patentabilityImpactEn: 'High patent eligibility provided novelty and non-obviousness criteria are satisfied. Mandatory biological source origin disclosure required under Section 10(4).',
    patentabilityImpactHi: 'नवीनता और गैर-स्पष्टता सिद्ध होने पर उच्च पेटेंट पात्रता। धारा १०(४) के तहत जैविक स्रोत का अनिवार्य प्रकटीकरण आवश्यक।',
    regulatoryPathwayEn: 'CDSCO New Botanical Drug Pathway + State AYUSH/DCGI approval with safety dossier.',
    regulatoryPathwayHi: 'सीडीएससीओ न्यू बॉटनिकल ड्रग पाथवे + सुरक्षा डोजियर के साथ राज्य आयुष/डीसीजीआई अनुमोदन।',
    confidence: 'Medium',
    confidenceReason: 'Non-classical categorization requires detailed botanical identification and safety validation.',
    suggestedActionItems: [
      'Document botanical specimen taxonomy and deposit voucher specimen in certified herbarium',
      'Undertake acute and sub-acute animal toxicity studies per OECD guidelines',
      'File provisional patent application with detailed compositional claims',
      'Obtain NBA Form 1 approval if foreign equity/collaborators are involved',
    ],
    relevantSourceIds: ['MOCK-IN-003', 'MOCK-IN-004', 'MOCK-IN-005', 'MOCK-IN-010'],
  };
}
