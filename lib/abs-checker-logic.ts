// IP-SAKTI Sahayak — Access & Benefit Sharing (ABS) Engine
// Implements Biological Diversity Act (BDA) 2002 Decision Support

export interface AbsFormState {
  entityType: 'indian_individual' | 'indian_company' | 'foreign_or_nri_company' | 'vaidya_individual';
  activityType: 'commercial_manufacturing' | 'research_only' | 'ipr_patent_filing' | 'export_biological_material';
  sourceOrigin: 'cultivated_farms' | 'wild_forest' | 'mandi_ntc' | 'foreign_import';
  annualTurnoverBracket: 'under_1cr' | '1cr_to_3cr' | 'above_3cr';
}

export interface AbsCheckResult {
  governingAuthority: 'NBA (National Biodiversity Authority)' | 'SBB (State Biodiversity Board)' | 'Exempted';
  approvalRequired: boolean;
  prescribedForm: string;
  levyPercentage: string;
  statutoryProvisions: string[];
  exemptionsApplicable: string[];
  summaryEn: string;
  summaryHi: string;
  checklistEn: string[];
  checklistHi: string[];
  riskAlertsEn: string[];
  riskAlertsHi: string[];
  relevantSourceIds: string[];
}

export function evaluateAbsRequirements(state: AbsFormState): AbsCheckResult {
  // Check statutory exemption for traditional vaidyas
  if (state.entityType === 'vaidya_individual' && state.activityType !== 'ipr_patent_filing' && state.activityType !== 'export_biological_material') {
    return {
      governingAuthority: 'Exempted',
      approvalRequired: false,
      prescribedForm: 'None (Statutory Exemption under Section 7 proviso)',
      levyPercentage: '0% (Exempt)',
      statutoryProvisions: ['BDA Section 7 Proviso', 'NBA ABS Guidelines 2014'],
      exemptionsApplicable: ['Registered Ayurvedic Vaidyas and local traditional healers practicing indigenous healing'],
      summaryEn: 'Local Ayurvedic Vaidyas, Hakims, and indigenous healers practicing traditional medicine for personal or community livelihood are statutorily exempt from prior intimation and ABS payments.',
      summaryHi: 'स्थानीय आयुर्वेदिक वैद्य और पारंपरिक चिकित्सक जो समुदाय में पारंपरिक चिकित्सा करते हैं, धारा ७ के तहत एबीएस और पूर्व सूचना से पूरी तरह मुक्त हैं।',
      checklistEn: [
        'Maintain local clinical practice registry or State Ayurvedic Board registration',
        'Ensure preparation is for direct patient dispensing and not commercial mass packaged distribution',
      ],
      checklistHi: [
        'राज्य आयुर्वेदिक बोर्ड पंजीकरण या वैद्य प्रमाणपत्र सुरक्षित रखें',
        'सुनिश्चित करें कि दवा सीधे रोगी को दी जा रही है, न कि व्यावसायिक बड़े पैमाने पर बेची जा रही है',
      ],
      riskAlertsEn: [],
      riskAlertsHi: [],
      relevantSourceIds: ['MOCK-IN-006'],
    };
  }

  // Foreign entity or IPR filing
  const isForeign = state.entityType === 'foreign_or_nri_company';
  const isPatentFiling = state.activityType === 'ipr_patent_filing';
  const isExport = state.activityType === 'export_biological_material';

  if (isPatentFiling) {
    return {
      governingAuthority: 'NBA (National Biodiversity Authority)',
      approvalRequired: true,
      prescribedForm: 'Form III (Application for seeking approval for applying for IPR)',
      levyPercentage: '0.2% to 1.0% on commercialization or fixed one-time fee on patent grant per NBA agreement',
      statutoryProvisions: ['BDA Section 6', 'Patents Act Section 10(4)(d)(ii)', 'NBA Regulation 2014'],
      exemptionsApplicable: ['None for patent applications based on Indian biological resources'],
      summaryEn: 'MANDATORY: Under Section 6(1) of the Biological Diversity Act, ANY person (Indian or foreign) applying for any IPR / patent in or outside India based on Indian biological resources MUST obtain prior approval of the NBA before the grant of patent.',
      summaryHi: 'अनिवार्य: जैविक विविधता अधिनियम की धारा ६(१) के अनुसार, भारतीय जैविक संसाधनों पर आधारित पेटेंट के लिए आवेदन करने से पूर्व राष्ट्रीय जैव विविधता प्राधिकरण (एनबीए) की पूर्व स्वीकृति (फॉर्म ३) अनिवार्य है।',
      checklistEn: [
        'Disclose accurate geographical coordinates/origin in Patent Specification (Form 1)',
        'Submit Form III to National Biodiversity Authority (NBA, Chennai) before final patent sealing',
        'Execute benefit-sharing agreement with NBA upon commercialization of patent',
        'Ensure that raw herb procurement vouchers are catalogued',
      ],
      checklistHi: [
        'पेटेंट विनिर्देश में सटीक भौगोलिक स्रोत का उल्लेख करें',
        'पेटेंट जारी होने से पूर्व चेन्नई स्थित एनबीए को फॉर्म ३ जमा करें',
        'व्यावसायिक लाभ होने पर एनबीए के साथ लाभ-साझाकरण अनुबंध निष्पादित करें',
      ],
      riskAlertsEn: [
        'CRITICAL: Failure to obtain Form III approval from NBA can lead to opposition/revocation of patent under Section 64 of Indian Patents Act.',
      ],
      riskAlertsHi: [
        'चेतावनी: एनबीए फॉर्म ३ स्वीकृति न मिलने पर पेटेंट अधिनियम की धारा ६४ के तहत पेटेंट रद्द हो सकता है।',
      ],
      relevantSourceIds: ['MOCK-IN-005', 'MOCK-IN-004', 'MOCK-IN-001'],
    };
  }

  if (isForeign || isExport) {
    return {
      governingAuthority: 'NBA (National Biodiversity Authority)',
      approvalRequired: true,
      prescribedForm: isExport ? 'Form II (Transfer of Research Results) / Form I' : 'Form I (Access for Commercial Utilization)',
      levyPercentage: '3% to 5% of purchase price or 0.5% to 2.0% of ex-factory gross sales',
      statutoryProvisions: ['BDA Section 3', 'BDA Section 4', 'NBA Regulations 2014'],
      exemptionsApplicable: state.sourceOrigin === 'mandi_ntc' ? ['Section 40 Normally Traded Commodities (NTC) exemption for raw agricultural items'] : ['None'],
      summaryEn: 'Entities with ANY foreign shareholding, NRI involvement, or foreign export of Indian bio-resources must obtain prior approval from the National Biodiversity Authority (NBA) under Section 3 before accessing resources.',
      summaryHi: 'विदेशी शेयरधारिता, एनआरआई भागीदारी या जैविक संसाधनों के निर्यात वाली सभी संस्थाओं को धारा ३ के तहत एनबीए (फॉर्म १) से पूर्व अनुमोदन लेना अनिवार्य है।',
      checklistEn: [
        'Submit Form I application to NBA Chennai with complete project proposal',
        'Negotiate Mutually Agreed Terms (MAT) for fair and equitable benefit sharing',
        'Verify if any accessed plant species is categorized under Section 40 Normally Traded Commodities (NTC)',
        'Obtain Internationally Recognized Certificate of Compliance (IRCC) under Nagoya Protocol for export',
      ],
      checklistHi: [
        'एनबीए चेन्नई को परियोजना प्रस्ताव के साथ फॉर्म १ जमा करें',
        'न्यायसंगत लाभ-साझाकरण हेतु पारस्परिक रूप से सहमत शर्तें (MAT) तय करें',
        'जांचें कि क्या कोई जड़ी-बूटी धारा ४० सामान्य व्यापारिक वस्तु (NTC) सूची में है',
      ],
      riskAlertsEn: [
        'Accessing biological resources without Form I approval by foreign-invested entities is a cognizable and non-bailable offense under Section 55.',
      ],
      riskAlertsHi: [
        'विदेशी निवेश वाली संस्थाओं द्वारा बिना फॉर्म १ अनुमति जैविक संसाधन लेना धारा ५५ के तहत दंडनीय अपराध है।',
      ],
      relevantSourceIds: ['MOCK-IN-005', 'MOCK-INT-006', 'MOCK-IN-007'],
    };
  }

  // Indian domestic entity commercial utilization
  let levy = '0.1% of gross ex-factory sales';
  if (state.annualTurnoverBracket === '1cr_to_3cr') levy = '0.2% of gross ex-factory sales';
  if (state.annualTurnoverBracket === 'above_3cr') levy = '0.5% of gross ex-factory sales';

  return {
    governingAuthority: 'SBB (State Biodiversity Board)',
    approvalRequired: true,
    prescribedForm: 'Form I (State SBB Prior Intimation Form for Commercial Utilization)',
    levyPercentage: levy,
    statutoryProvisions: ['BDA Section 7', 'BDA Section 24', 'State SBB ABS Rules'],
    exemptionsApplicable:
      state.sourceOrigin === 'cultivated_farms'
        ? ['Cultivated medicinal plants from registered growers with traceability certificates benefit from streamlined SBB compliance.']
        : state.sourceOrigin === 'mandi_ntc'
        ? ['Section 40 Normally Traded Commodities (NTC) list — check if herb is listed as general food/commodity.']
        : ['None (Wild harvest requires Biodiversity Management Committee intimation)'],
    summaryEn: `Indian corporate / MSME entity sourcing biological materials for commercial manufacture must submit prior intimation to the State Biodiversity Board (SBB) where resources are procured or processed. Applicable ABS benefit levy is approx. ${levy}.`,
    summaryHi: `व्यावसायिक विनिर्माण हेतु जड़ी-बूटियाँ खरीदने वाली भारतीय एमएसएमई संस्थाओं को संबंधित राज्य जैव विविधता बोर्ड (एसबीबी) को धारा ७ के तहत पूर्व सूचना देनी होगी। अनुमानित एबीएस शुल्क: ${levy}।`,
    checklistEn: [
      'Submit Form I / prior intimation to the concerned State Biodiversity Board (SBB)',
      'Collect agricultural mandi bills or contract farming traceability certificates to expedite clearance',
      'Pay prescribed annual ABS sharing fee based on ex-factory sales slab',
      'Maintain batch procurement register for annual SBB compliance audits',
    ],
    checklistHi: [
      'संबंधित राज्य जैव विविधता बोर्ड (एसबीबी) को फॉर्म १ पूर्व सूचना जमा करें',
      'सत्यापन शीघ्र करने हेतु कृषि मंडी बिल या किसान अनुबंध ट्रेसेबिलिटी प्रमाण पत्र एकत्र करें',
      'बिक्री स्लैब के आधार पर निर्धारित वार्षिक एबीएस शुल्क का भुगतान करें',
    ],
    riskAlertsEn: [],
    riskAlertsHi: [],
    relevantSourceIds: ['MOCK-IN-006', 'MOCK-IN-007', 'MOCK-IN-009'],
  };
}
