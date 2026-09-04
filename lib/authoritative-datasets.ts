// Authoritative Public Datasets for IP-SAKTI Sahayak
// Open public sources from which the corpus and legal knowledge base are assembled.

export interface AuthoritativeDataset {
  id: 'tkdl' | 'indiacode' | 'ipindia' | 'nbaindia';
  name: string;
  shortName: string;
  governingBody: string;
  domain: string;
  url: string;
  descriptionEn: string;
  descriptionHi: string;
  badge: string;
  primaryPortals: {
    name: string;
    subUrl: string;
    description: string;
  }[];
  keyCoverage: string[];
  patentExaminationRole: string;
}

export const AUTHORITATIVE_DATASETS: AuthoritativeDataset[] = [
  {
    id: 'tkdl',
    name: 'Traditional Knowledge Digital Library (TKDL)',
    shortName: 'TKDL',
    governingBody: 'Council of Scientific & Industrial Research (CSIR) & Ministry of AYUSH',
    domain: 'tkdl.res.in',
    url: 'https://tkdl.res.in',
    descriptionEn:
      'Pioneering digital repository containing over 34 million pages translating classical Sanskrit, Urdu, Persian, and Tamil Ayurvedic formulations into IPC international patent classifications. Used by patent offices globally to block biopiracy and invalid patents.',
    descriptionHi:
      'पारंपरिक ज्ञान डिजिटल लाइब्रेरी (सीएसआईआर और आयुष मंत्रालय): ३.४ करोड़ से अधिक पृष्ठों का अग्रदूत भंडार जो शास्त्रीय संस्कृत, उर्दू, फारसी और तमिल नुस्खों को अंतरराष्ट्रीय पेटेंट वर्गीकरण में अनुवादित करता है।',
    badge: 'Anti-Biopiracy & Prior Art',
    primaryPortals: [
      {
        name: 'TKDL Official Portal',
        subUrl: 'https://tkdl.res.in',
        description: 'CSIR-TKDL public portal and institutional access gateway for patent offices worldwide.',
      },
      {
        name: 'Prior-Art Search Database',
        subUrl: 'https://tkdl.res.in/tkdl/langdefault/common/Home.asp?GL=Eng',
        description: 'International Patent Classification (IPC) mapped search for classical Ayurvedic formulations.',
      },
      {
        name: 'Classical Formulations Corpus',
        subUrl: 'https://tkdl.res.in',
        description: 'Digitized references from Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya.',
      },
    ],
    keyCoverage: [
      'Classical Ayurvedic Formulations (Charaka, Sushruta, Vagbhata)',
      'IPC Group A61K 36/00 (Medicinal plant preparations)',
      'Defensive Prior-Art Citations across USPTO, EPO, JPO & IPO',
      'Non-patentable subject matter under Indian Patents Act Section 3(p)',
    ],
    patentExaminationRole:
      'Primary ground-truth database referenced by examiners to verify lack of novelty or Section 3(p) TK statutory bars.',
  },
  {
    id: 'indiacode',
    name: 'India Code: Digital Repository of All Central & State Acts',
    shortName: 'India Code',
    governingBody: 'Legislative Department, Ministry of Law and Justice, Government of India',
    domain: 'indiacode.nic.in',
    url: 'https://indiacode.nic.in',
    descriptionEn:
      'The single official digital repository of all Central and State legislation, statutory rules, regulations, and official gazette notifications enacted by the Parliament of India and state assemblies.',
    descriptionHi:
      'इंडिया कोड (विधि और न्याय मंत्रालय): भारत की संसद और राज्य विधानसभाओं द्वारा अधिनियमित सभी केंद्रीय और राज्य कानूनों, संविधिक नियमों और विनियमों का आधिकारिक डिजिटल भंडार।',
    badge: 'Statutes & Statutory Rules',
    primaryPortals: [
      {
        name: 'The Patents Act, 1970 (Act No. 39 of 1970)',
        subUrl: 'https://indiacode.nic.in/handle/123456789/1392',
        description: 'Section 3(p), Section 3(e), Section 3(d), and Section 10(4) statutory exclusion provisions.',
      },
      {
        name: 'Biological Diversity Act, 2002 (Act No. 18 of 2003)',
        subUrl: 'https://indiacode.nic.in/handle/123456789/2046',
        description: 'Section 3, 6, 7 & 24 mandates for ABS, prior approval, and benefit sharing on bio-resources.',
      },
      {
        name: 'Drugs and Cosmetics Act, 1940 & Rules 1945',
        subUrl: 'https://indiacode.nic.in/handle/123456789/2405',
        description: 'First Schedule Ayurvedic classical texts, Section 3(a), Section 3(h), and Rule 158B licensing.',
      },
      {
        name: 'Food Safety and Standards Act, 2006 (FSSAI)',
        subUrl: 'https://indiacode.nic.in/handle/123456789/2014',
        description: 'Ayurveda Aahar Regulations 2022 and permissible botanical ingredients for nutritional wellness.',
      },
    ],
    keyCoverage: [
      'The Patents Act, 1970 (amended 2005)',
      'Biological Diversity Act, 2002 & Amendments',
      'Drugs and Cosmetics Act, 1940 & First Schedule',
      'Food Safety & Standards (Ayurveda Aahar) Regulations, 2022',
    ],
    patentExaminationRole:
      'Binding statutory authority providing the legal definitions, section exclusions, and penalty provisions.',
  },
  {
    id: 'ipindia',
    name: 'Intellectual Property India Public Databases (CGPDTM)',
    shortName: 'IP India',
    governingBody: 'Controller General of Patents, Designs and Trade Marks (CGPDTM), DPIIT, Ministry of Commerce & Industry',
    domain: 'ipindia.gov.in',
    url: 'https://ipindia.gov.in',
    descriptionEn:
      'The official Indian IP authority administering patents, designs, trademarks, and geographical indications. Houses real-time public search registries like InPASS, TM Public Search, and GI Register.',
    descriptionHi:
      'आईपी इंडिया (सीएपीडीटीएम / वाणिज्य और उद्योग मंत्रालय): पेटेंट, डिजाइन, ट्रेडमार्क और भौगोलिक संकेतकों का प्रशासनिक सार्वजनिक डेटाबेस, जिसमें InPASS और टीएम रजिस्ट्री शामिल हैं।',
    badge: 'Patents / InPASS / TM / GI',
    primaryPortals: [
      {
        name: 'InPASS: Indian Patent Advanced Search System',
        subUrl: 'https://ipindiaservices.gov.in/publicsearch',
        description: 'Full-text patent search across published patent applications and granted specifications.',
      },
      {
        name: 'Trade Marks Public Search System',
        subUrl: 'https://ipindiaservices.gov.in/tmrpublicsearch',
        description: 'Class 5 (Pharmaceuticals/Herbal) and Class 3 (Cosmetics) trademark clearance search.',
      },
      {
        name: 'Geographical Indications (GI) Registry',
        subUrl: 'https://ipindia.gov.in/gi.htm',
        description: 'Registered Ayurvedic herbs, regional cultivars, and indigenous therapeutic goods.',
      },
      {
        name: 'Guidelines for Examination of TK Patent Applications',
        subUrl: 'https://ipindia.gov.in/writereaddata/Portal/Images/pdf/Final_Guidelines_for_Examination_of_Traditional_Knowledge_and_Biological_Materials.pdf',
        description: 'Official IPO criteria for synergism, Section 3(e) admixtures, and Form 1 source declarations.',
      },
    ],
    keyCoverage: [
      'InPASS (Patent Application Search & Patent Grants)',
      'IPO Traditional Knowledge Guidelines (Clause 5.1–5.4)',
      'Trade Marks Registry Class 03 (Herbal Cosmetics) & Class 05 (Ayurvedic Drugs)',
      'GI Registry for Geographical Provenance & Origin Protection',
    ],
    patentExaminationRole:
      'Operational search engine for Indian patent status, prosecution histories, Form 1 filings, and trademark clearance.',
  },
  {
    id: 'nbaindia',
    name: 'National Biodiversity Authority (NBA) & ABS Portal',
    shortName: 'NBA India',
    governingBody: 'National Biodiversity Authority, Ministry of Environment, Forest and Climate Change',
    domain: 'nbaindia.org',
    url: 'https://nbaindia.org',
    descriptionEn:
      'Statutory autonomous body established under the Biological Diversity Act 2002 to facilitate conservation, sustainable use, and fair & equitable sharing of benefits arising from the utilization of Indian biological resources.',
    descriptionHi:
      'राष्ट्रीय जैव विविधता प्राधिकरण (एनबीए / पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय): भारतीय जैविक संसाधनों के उपयोग पर लाभ साझाकरण (एबीएस) और अनुमोदन को विनियमित करने वाला संविधिक निकाय।',
    badge: 'ABS / Benefit Sharing / Bio-Resources',
    primaryPortals: [
      {
        name: 'NBA India Official Portal',
        subUrl: 'https://nbaindia.org',
        description: 'Statutory approvals, circulars, and guidelines on commercial utilization of bio-resources.',
      },
      {
        name: 'Form III: Prior Approval for IPR Application',
        subUrl: 'https://nbaindia.org/content/683/61/1/approvals.html',
        description: 'Mandatory Form III application filing before grant of patent on Indian bio-resources.',
      },
      {
        name: 'ABS Regulations 2014 & Benefit-Sharing Sliders',
        subUrl: 'https://nbaindia.org/uploaded/pdf/Notification_of_ABS_Guidlines.pdf',
        description: 'Official schedule of levies (0.1% to 0.5% ex-factory price) and cultivated plant exemptions.',
      },
      {
        name: 'State Biodiversity Boards (SBB) Directory',
        subUrl: 'https://nbaindia.org/content/19/16/1/sbb.html',
        description: 'Directory for Section 7 prior intimation for Indian citizens and domestic Ayurvedic companies.',
      },
    ],
    keyCoverage: [
      'Form I (Commercial Utilization by Foreign Entities/NRIs)',
      'Form III (Mandatory IPR Approval before Patent Grant)',
      'ABS Guidelines 2014 (0.1% to 0.5% ex-factory levy)',
      'State Biodiversity Boards (SBB) Section 7 Prior Intimation',
    ],
    patentExaminationRole:
      'Enforces Section 6(1) compliance; lack of NBA approval invalidates patent grants or halts final patent seal.',
  },
];
