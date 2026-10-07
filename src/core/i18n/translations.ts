// XERXES Internationalization Dictionary
import type { LanguageCode } from '../../types';

export interface Translations {
  brandStatement: string;
  tagline: string;
  nav: {
    home: string;
    scanner: string;
    passport: string;
    repair: string;
    receipt: string;
    memory: string;
    architecture: string;
    settings: string;
  };
  actions: {
    scan: string;
    askXerxes: string;
    search: string;
    save: string;
    cancel: string;
    viewDetails: string;
    startRepair: string;
    exportProof: string;
    addToPassport: string;
    skipIntro: string;
    offline: string;
    online: string;
  };
  today: {
    title: string;
    subtitle: string;
    activeObjects: string;
    pendingRepairs: string;
    monthlySpend: string;
    systemConfidence: string;
    recentEvents: string;
  };
  scanner: {
    title: string;
    subtitle: string;
    takePhoto: string;
    uploadImage: string;
    liveFeed: string;
    confidence: string;
    detectedObjects: string;
    extractedText: string;
    startScanning: string;
    stopScanning: string;
    demoImage: string;
  };
  passport: {
    title: string;
    subtitle: string;
    registeredItems: string;
    newItem: string;
    serial: string;
    location: string;
    condition: string;
    warranty: string;
    proofHash: string;
    verifiedSeal: string;
  };
  repair: {
    title: string;
    subtitle: string;
    diagnoseDefect: string;
    defectSeverity: string;
    safetyCaution: string;
    steps: string;
    estimatedCost: string;
    toolsNeeded: string;
  };
  receipt: {
    title: string;
    subtitle: string;
    uploadReceipt: string;
    merchant: string;
    totalAmount: string;
    itemsFound: string;
    warrantyNotice: string;
    autoLink: string;
  };
  memory: {
    title: string;
    subtitle: string;
    placeholder: string;
    askButton: string;
    recentQueries: string;
    answerConfidence: string;
    foundRecords: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    brandStatement: 'XERXES — Intelligence for the world around you.',
    tagline: 'The unified operating layer connecting physical objects, people, places, and automation.',
    nav: {
      home: 'Overview',
      scanner: 'Reality Scanner',
      passport: 'Object Passport',
      repair: 'RepairVision',
      receipt: 'Receipt DNA',
      memory: 'AI Memory / Ask',
      architecture: '40 Modules',
      settings: 'Settings',
    },
    actions: {
      scan: 'Scan Reality',
      askXerxes: 'Ask XERXES',
      search: 'Search Memory',
      save: 'Save Record',
      cancel: 'Cancel',
      viewDetails: 'View Details',
      startRepair: 'Inspect Repair',
      exportProof: 'Cryptographic Proof',
      addToPassport: 'Register in Passport',
      skipIntro: 'Skip Intro',
      offline: 'Offline Mode (Queued)',
      online: 'System Live',
    },
    today: {
      title: 'Today’s Physical Pulse',
      subtitle: 'Real-time state of your monitored physical environment and possessions',
      activeObjects: 'Active Objects',
      pendingRepairs: 'Pending Diagnostics',
      monthlySpend: 'Tracked Expenses',
      systemConfidence: 'Neural Confidence',
      recentEvents: 'Event Activity Ledger',
    },
    scanner: {
      title: 'Reality Scanner (01)',
      subtitle: 'AI-assisted computer vision for physical objects, equipment, and text',
      takePhoto: 'Capture Frame',
      uploadImage: 'Upload Photo',
      liveFeed: 'Live Camera Stream',
      confidence: 'Detection Confidence',
      detectedObjects: 'Identified Entities',
      extractedText: 'Text Recognition (OCR)',
      startScanning: 'Start Camera',
      stopScanning: 'Pause Camera',
      demoImage: 'Load Test Object',
    },
    passport: {
      title: 'Object Passport (21)',
      subtitle: 'Immutable digital identity, lifecycle timeline, and tamper-evident history',
      registeredItems: 'Cataloged Possessions',
      newItem: 'Register Object',
      serial: 'Serial / Tag ID',
      location: 'Current Location',
      condition: 'Physical Condition',
      warranty: 'Warranty Status',
      proofHash: 'SHA-256 Ledger Seal',
      verifiedSeal: 'Tamper-Evident Proof',
    },
    repair: {
      title: 'RepairVision (23)',
      subtitle: 'Visual equipment diagnostic guidance, safety bounds, and step-by-step repair protocols',
      diagnoseDefect: 'Analyze Wear & Defects',
      defectSeverity: 'Defect Severity',
      safetyCaution: 'Safety & Risk Warning',
      steps: 'Remediation Steps',
      estimatedCost: 'Estimated Parts Cost',
      toolsNeeded: 'Required Tools',
    },
    receipt: {
      title: 'Receipt DNA (28)',
      subtitle: 'Automated purchasing breakdown, expense ledgering, and warranty asset creation',
      uploadReceipt: 'Scan Paper or Digital Receipt',
      merchant: 'Vendor / Merchant',
      totalAmount: 'Total Amount',
      itemsFound: 'Parsed Line Items',
      warrantyNotice: 'Active Warranty Detected',
      autoLink: 'Link to Object Passport',
    },
    memory: {
      title: 'AI Memory Search & Ask (09)',
      subtitle: 'Natural language reasoning across your permitted physical objects, places, and repairs',
      placeholder: 'Ask XERXES (e.g. "Where did I last see my charger?", "Show recent repairs")...',
      askButton: 'Query Brain',
      recentQueries: 'Suggested Inquiries',
      answerConfidence: 'AI Grounding Confidence',
      foundRecords: 'Referenced Entity Matches',
    },
  },

  pcm: {
    brandStatement: 'XERXES — Sabi intelligence for di world wey dey around you.',
    tagline: 'Di one place wey join all your things, people, places, and work together.',
    nav: {
      home: 'Overview',
      scanner: 'Reality Scanner',
      passport: 'Object Passport',
      repair: 'RepairVision',
      receipt: 'Receipt DNA',
      memory: 'AI Memory / Ask',
      architecture: '40 Modules',
      settings: 'Settings',
    },
    actions: {
      scan: 'Scan Something',
      askXerxes: 'Ask XERXES',
      search: 'Search Memory',
      save: 'Save Am',
      cancel: 'Cancel',
      viewDetails: 'Check Details',
      startRepair: 'Check di Fault',
      exportProof: 'Get Cryptographic Proof',
      addToPassport: 'Put for Passport',
      skipIntro: 'Skip Intro',
      offline: 'You Dey Offline',
      online: 'System Dey Connected',
    },
    today: {
      title: 'Today Matter',
      subtitle: 'How your things and environment dey do right now',
      activeObjects: 'Things Wey You Get',
      pendingRepairs: 'Things Wey Need Repair',
      monthlySpend: 'Money Wey You Spend',
      systemConfidence: 'AI Confidence Level',
      recentEvents: 'Recent Actions',
    },
    scanner: {
      title: 'Reality Scanner (01)',
      subtitle: 'Use camera and AI recognize anything wey dey front of you',
      takePhoto: 'Snap Photo',
      uploadImage: 'Upload Photo',
      liveFeed: 'Live Camera',
      confidence: 'How Sure di AI Dey',
      detectedObjects: 'Things Wey We See',
      extractedText: 'Writings Wey We Read',
      startScanning: 'Start Camera',
      stopScanning: 'Stop Camera',
      demoImage: 'Use Test Sample',
    },
    passport: {
      title: 'Object Passport (21)',
      subtitle: 'Complete identity, history, and guarantee for your property',
      registeredItems: 'Your Saved Things',
      newItem: 'Register New Thing',
      serial: 'Serial Number',
      location: 'Where E Dey',
      condition: 'How E Dey',
      warranty: 'Warranty Status',
      proofHash: 'Digital Proof Stamp',
      verifiedSeal: 'Verified Proof',
    },
    repair: {
      title: 'RepairVision (23)',
      subtitle: 'Make AI look your machine or tool see wetin spoil and how to fix am safely',
      diagnoseDefect: 'Check Wetin Spoil',
      defectSeverity: 'How Bad di Spoil Dey',
      safetyCaution: 'Safety Warning (Be Careful)',
      steps: 'Step-by-Step How to Fix Am',
      estimatedCost: 'Approximate Cost',
      toolsNeeded: 'Tools Wey You Need',
    },
    receipt: {
      title: 'Receipt DNA (28)',
      subtitle: 'Scan receipt make e bring out all the items and calculate wetin you spend',
      uploadReceipt: 'Scan or Upload Receipt',
      merchant: 'Shop Wey You Buy From',
      totalAmount: 'Total Money',
      itemsFound: 'Things Wey You Buy',
      warrantyNotice: 'Warranty Dey Here',
      autoLink: 'Connect to Object Passport',
    },
    memory: {
      title: 'AI Memory & Ask (09)',
      subtitle: 'Ask question about your things, where you keep am, or recent repairs',
      placeholder: 'Ask XERXES (e.g. "Where my charger dey?", "How much I spend this month?")...',
      askButton: 'Ask Question',
      recentQueries: 'Sample Questions',
      answerConfidence: 'Accuracy Level',
      foundRecords: 'Records Wey Match',
    },
  },

  yo: {
    brandStatement: 'XERXES — Ọpọlọ fún gbogbo ayé tó yí ọ ká.',
    tagline: 'Ètò tó so ohun ìní rẹ, àwọn ènìyàn, ibùgbé, àti ìmọ̀-ẹ̀rọ pọ̀ ní ìṣọ̀kan.',
    nav: {
      home: 'Àkópọ̀',
      scanner: 'Awò-fín-ní-fín',
      passport: 'Ìwé Ìdánimọ̀ Nnkan',
      repair: 'Àyẹ̀wò Àtúnṣe',
      receipt: 'Àyẹ̀wò Ìwé-èrí Owó',
      memory: 'Ìrántí Ọpọlọ AI',
      architecture: 'Ẹ̀ka 40',
      settings: 'Ètò',
    },
    actions: {
      scan: 'Ṣàyẹ̀wò Nnkan',
      askXerxes: 'Béèrè lọ́wọ́ XERXES',
      search: 'Wá Ìrántí',
      save: 'Fi Pamọ́',
      cancel: 'Fagilé',
      viewDetails: 'Wo Àlàyé',
      startRepair: 'Ṣàyẹ̀wò Àtúnṣe',
      exportProof: 'Ẹ̀rí Pípé',
      addToPassport: 'Fi sínú Ìwé Ìdánimọ̀',
      skipIntro: 'Rekọjá Àkọ́kọ́',
      offline: 'Kò Sí Lórí Íńtánẹ́ẹ̀tì',
      online: 'Ètò Wà Lórí Íńtánẹ́ẹ̀tì',
    },
    today: {
      title: 'Ipo Ti Òní',
      subtitle: 'Ipo àwọn ohun ìní àti àyíká rẹ ní àkókò gidi',
      activeObjects: 'Àwọn Ohun Ìní Rẹ',
      pendingRepairs: 'Àtúnṣe Tó Ṣẹ́kù',
      monthlySpend: 'Owó Tó Ti Nà',
      systemConfidence: 'Ìgbẹ́kẹ̀lé Ọpọlọ AI',
      recentEvents: 'Àkọsílẹ̀ Ìṣẹ̀lẹ̀ Òní',
    },
    scanner: {
      title: 'Awò-fín-ní-fín (01)',
      subtitle: 'Fídíò àti ìmọ̀-ẹ̀rọ AI láti mọ àwọn ohun kọ̀ọ̀kan àti ọ̀rọ̀',
      takePhoto: 'Ya Àwòrán',
      uploadImage: 'Gbé Àwòrán Wọlé',
      liveFeed: 'Kámẹ́rà Lóyè',
      confidence: 'Ìwọ̀n Ìdánilójú',
      detectedObjects: 'Àwọn Nnkan Tó Rí',
      extractedText: 'Ọ̀rọ̀ Tó Kà',
      startScanning: 'Bẹ̀rẹ̀ Kámẹ́rà',
      stopScanning: 'Dá Kámẹ́rà Dúró',
      demoImage: 'Lo Àwòrán Àpẹẹrẹ',
    },
    passport: {
      title: 'Ìwé Ìdánimọ̀ Nnkan (21)',
      subtitle: 'Ìdánimọ̀ pípé, ìtàn àtúnṣe, àti ẹ̀rí àìṣeépààrọ̀ fún ohun ìní rẹ',
      registeredItems: 'Àwọn Nnkan Tó Wà Níbẹ̀',
      newItem: 'Forúkọ Nnkan Sílẹ̀',
      serial: 'Nọ́mbà Ìdánimọ̀',
      location: 'Ibi Tó Wà',
      condition: 'Ipo Tó Wà',
      warranty: 'Ìdánilójú Àtìlẹ́yìn',
      proofHash: 'Àmì Ẹ̀rí Pípé (SHA-256)',
      verifiedSeal: 'Ẹ̀rí Tó Dájú',
    },
    repair: {
      title: 'Àyẹ̀wò Àtúnṣe (23)',
      subtitle: 'Ìtọ́sọ́nà láti mọ ohun tó bàjẹ́ lára ẹ̀rọ àti bí a ṣe lè tún un ṣe láìsí ewu',
      diagnoseDefect: 'Ṣàyẹ̀wò Ẹ̀rọ',
      defectSeverity: 'Bí Àbùkù Ṣe Pọ̀ Tó',
      safetyCaution: 'Ìkìlọ̀ Ewu Ààbò',
      steps: 'Àwọn Ìgbésẹ̀ Àtúnṣe',
      estimatedCost: 'Iye Owó Àfojúsùn',
      toolsNeeded: 'Àwọn Irinṣẹ́ Tó Yẹ',
    },
    receipt: {
      title: 'Àyẹ̀wò Ìwé-èrí Owó (28)',
      subtitle: 'Kíka ìwé-èrí owó láti mọ àwọn nǹkan tí o rà àti iye owó wọn',
      uploadReceipt: 'Ṣàyẹ̀wò Ìwé-èrí',
      merchant: 'Ilé Ìtajà',
      totalAmount: 'Àpapọ̀ Owó',
      itemsFound: 'Àwọn Nnkan Tó Rà',
      warrantyNotice: 'Àtìlẹ́yìn Rí Níbẹ̀',
      autoLink: 'So Pọ̀ Mọ́ Ìwé Ìdánimọ̀',
    },
    memory: {
      title: 'Ìrántí Ọpọlọ AI & Ìbéèrè (09)',
      subtitle: 'Béèrè ìbéèrè lórí àwọn nǹkan rẹ, ibi tí o fi wọ́n sí, àti ìnáwó rẹ',
      placeholder: 'Béèrè lọ́wọ́ XERXES (fún àpẹẹrẹ: "Níbo ni mo fi ṣájà mi sí?")...',
      askButton: 'Béèrè Nísinsìnyí',
      recentQueries: 'Àwọn Ìbéèrè Àpẹẹrẹ',
      answerConfidence: 'Ìwọ̀n Ìdánilójú',
      foundRecords: 'Àwọn Ẹ̀rí Tó Bá A Mu',
    },
  },

  ha: {
    brandStatement: 'XERXES — Fasaha don duniyar da ke kusa da ku.',
    tagline: 'Cikakken tsarin da ke hada kayayyaki, mutane, wurare, da fasahar sarrafa kanta.',
    nav: {
      home: 'Bayanin Duka',
      scanner: 'Kyamarar Ganowa',
      passport: 'Fasfo din Kayan Aiki',
      repair: 'Duba Gyara',
      receipt: 'Binciken Rasit',
      memory: 'Kwakwalwar AI',
      architecture: 'Rukunai 40',
      settings: 'Saituna',
    },
    actions: {
      scan: 'Duba Kayan Aiki',
      askXerxes: 'Tambayi XERXES',
      search: 'Bincika Kwakwalwa',
      save: 'Ajiye',
      cancel: 'Soke',
      viewDetails: 'Duba Cikakken Bayani',
      startRepair: 'Fara Binciken Gyara',
      exportProof: 'Hujjar Shaida',
      addToPassport: 'Sanya a Fasfo',
      skipIntro: 'Tsallake Gabatarwa',
      offline: 'Babu Intanet',
      online: 'Tsari Na Aiki',
    },
    today: {
      title: 'Yanayin Yau',
      subtitle: 'Matsayin kayanku da muhallinku a halin yanzu',
      activeObjects: 'Kayayyakin da ke Aiki',
      pendingRepairs: 'Kayayyakin da ke Bukatar Gyara',
      monthlySpend: 'Kudaden da aka Kashe',
      systemConfidence: 'Tabbacin AI',
      recentEvents: 'Ayyukan da aka Yi Kwanan Nan',
    },
    scanner: {
      title: 'Kyamarar Ganowa (01)',
      subtitle: 'Amfani da kyamara da AI don gano kayayyaki da rubutu',
      takePhoto: 'Dauki Hoto',
      uploadImage: 'Loda Hoto',
      liveFeed: 'Kyamara kai tsaye',
      confidence: 'Matakin Tabbaci',
      detectedObjects: 'Abubuwan da aka Gano',
      extractedText: 'Rubutun da aka Karanta',
      startScanning: 'Fara Kyamara',
      stopScanning: 'Dakatad da Kyamara',
      demoImage: 'Gwada da Misali',
    },
    passport: {
      title: 'Fasfo din Kayan Aiki (21)',
      subtitle: 'Tabbataccen asali, tarihin amfani, da shaidar mallakar kaya',
      registeredItems: 'Kayayyakin da aka Yi Rijista',
      newItem: 'Yi Rijistar Sabon Kaya',
      serial: 'Lambar Kaya',
      location: 'Inda yake a yanzu',
      condition: 'Yanayin Kaya',
      warranty: 'Shaidar Garanti',
      proofHash: 'Tabbatacciyar Shaidar Dijital (SHA-256)',
      verifiedSeal: 'Tabbaci mai Hujja',
    },
    repair: {
      title: 'Duba Gyara (23)',
      subtitle: 'Binciken abin da ya lalace da kuma hanyoyin gyara lafiya mataki-mataki',
      diagnoseDefect: 'Bincika Lalacewa',
      defectSeverity: 'Girman Matsalar',
      safetyCaution: 'Gargadin Tsaro',
      steps: 'Matakan Gyara',
      estimatedCost: 'Kiyasin Kudi',
      toolsNeeded: 'Kayan Aikin da ake Bukata',
    },
    receipt: {
      title: 'Binciken Rasit (28)',
      subtitle: 'Karanta rasit don cire bayanan abubuwan da aka saya da lissafin kudi',
      uploadReceipt: 'Loda ko Dauki Rasit',
      merchant: 'Wurin Sayayya',
      totalAmount: 'Jimlar Kudi',
      itemsFound: 'Abubuwan da aka Saya',
      warrantyNotice: 'Akwai Garanti a ciki',
      autoLink: 'Hada da Fasfon Kaya',
    },
    memory: {
      title: 'Kwakwalwar AI & Tambayoyi (09)',
      subtitle: 'Yi tambayoyi game da kayanku, inda kuka ajiye su, da kudaden da kuka kashe',
      placeholder: 'Tambayi XERXES (misali: "Ina caja ta take?", "Kayan da aka gyara kwanan nan")...',
      askButton: 'Yi Tambaya',
      recentQueries: 'Misalan Tambayoyi',
      answerConfidence: 'Matakin Amincewa',
      foundRecords: 'Bayanai da suka Dace',
    },
  },

  ig: {
    brandStatement: 'XERXES — Amamihe maka ụwa gbara gị gburugburu.',
    tagline: 'Otu sistemụ na-ejikọta ihe onwunwe gị, mmadụ, ebe dị iche iche, na teknụzụ.',
    nav: {
      home: 'Nchịkọta',
      scanner: 'Ihe Nlele Anya',
      passport: 'Paspọtụ Ngwongwo',
      repair: 'Nlele Mmezi',
      receipt: 'Nnyocha Nnata Ego',
      memory: 'Ncheta AI',
      architecture: 'Ngalaba 40',
      settings: 'Ntọala',
    },
    actions: {
      scan: 'Nyochaa Ihe',
      askXerxes: 'Jụọ XERXES',
      search: 'Chọọ na Ncheta',
      save: 'Chekwaa',
      cancel: 'Kagbuo',
      viewDetails: 'Hụ Nkọwa',
      startRepair: 'Malite Nlele Mmezi',
      exportProof: 'Ihe Akaebe Zuru Ezu',
      addToPassport: 'Tinye na Paspọtụ',
      skipIntro: 'Kwụsị Nkọwa Mbụ',
      offline: 'Ọ nọghị n’ịntanetị',
      online: 'Sistemụ na-arụ ọrụ',
    },
    today: {
      title: 'Ọnọdụ Taa',
      subtitle: 'Ọnọdụ ihe onwunwe gị na ebe ị nọ n’oge ugbu a',
      activeObjects: 'Ihe Ndị Na-arụ Ọrụ',
      pendingRepairs: 'Ihe Ndị Chọrọ Mmezi',
      monthlySpend: 'Ego Emefuru',
      systemConfidence: 'Ntụkwasị Obi AI',
      recentEvents: 'Ihe Ndị Mere Na Nso Nso',
    },
    scanner: {
      title: 'Ihe Nlele Anya (01)',
      subtitle: 'Iji igwefoto na AI mara ihe dị n’ihu gị na ederede',
      takePhoto: 'Sụọ Foto',
      uploadImage: 'Bulite Foto',
      liveFeed: 'Igwefoto Ndụ',
      confidence: 'Ogo Ntụkwasị Obi',
      detectedObjects: 'Ihe Ndị Anyị Hụrụ',
      extractedText: 'Ederede Anyị Gụrụ',
      startScanning: 'Gbanwuo Igwefoto',
      stopScanning: 'Kwụsịtụ Igwefoto',
      demoImage: 'Nwalee Ihe Nlereanya',
    },
    passport: {
      title: 'Paspọtụ Ngwongwo (21)',
      subtitle: 'Ezigbo njirimara, akụkọ mmezi, na ihe akaebe maka ihe onwunwe gị',
      registeredItems: 'Ihe Ndị E Debanyere Aha',
      newItem: 'Debanye Aha Ihe Ọhụrụ',
      serial: 'Nọmba Ngwaahịa',
      location: 'Ebe Ọ Dị Ugbu A',
      condition: 'Ọnọdụ Ọ Dị',
      warranty: 'Nkwa Nkwado (Garanti)',
      proofHash: 'Akara Ihe Akaebe (SHA-256)',
      verifiedSeal: 'Akaebe E Kwadoro',
    },
    repair: {
      title: 'Nlele Mmezi (23)',
      subtitle: 'Nduzi iji mara ihe mebiri na igwe gị na ụzọ nchekwa iji mezie ya',
      diagnoseDefect: 'Nyochaa Mmebi',
      defectSeverity: 'Ogo Mmebi ahụ',
      safetyCaution: 'Ịdọ Aka Ná Ntị Maka Nchekwa',
      steps: 'Usoro Mmezi',
      estimatedCost: 'Ego Atụrụ Anya Ọ Ga-eri',
      toolsNeeded: 'Ngwa Ọrụ Dị Mkpa',
    },
    receipt: {
      title: 'Nnyocha Nnata Ego (28)',
      subtitle: 'Nyochaa nnata ego iji wepụta ndepụta ihe ndị ị zụrụ na ego ha',
      uploadReceipt: 'Nyochaa Nnata Ego',
      merchant: 'Ụlọ Ahịa Ị Zụrụ Ya',
      totalAmount: 'Mkpokọta Ego',
      itemsFound: 'Ihe Ndị Dị na Ya',
      warrantyNotice: 'A Hụrụ Garanti na Ya',
      autoLink: 'Jikọọ na Paspọtụ Ngwongwo',
    },
    memory: {
      title: 'Ncheta AI & Ajụjụ (09)',
      subtitle: 'Jụọ ajụjụ banyere ihe gị, ebe ị debere ha, na ego i mefuru',
      placeholder: 'Jụọ XERXES (dịka: "Ebee ka chaja m dị?", "Ihe m mefuru ọnwa a")...',
      askButton: 'Jụọ Ajụjụ',
      recentQueries: 'Ajụjụ Nlereanya',
      answerConfidence: 'Ogo Eziokwu',
      foundRecords: 'Ihe Ndị Dabara na Ya',
    },
  },
};
