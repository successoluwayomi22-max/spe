// DiasporaLand AI — Property Cases Mock Data
// Realistic multi-document property investigations with cross-check discrepancies

import type { PropertyCase } from '../types/diasporaland';

export const MOCK_DIASPORALAND_CASES: PropertyCase[] = [
  {
    id: 'CASE-LOK-024',
    caseNumber: 'DL-2026-089',
    name: 'Plot 24, Cadastral Zone E08, Lokogoma District',
    address: 'Sector Centre D, Lokogoma Urban Extension',
    state: 'Federal Capital Territory (FCT)',
    lga: 'Abuja Municipal Area Council',
    country: 'Nigeria',
    propertyType: 'Residential Land',
    purchasePrice: 65000000,
    currency: 'NGN',
    sellerName: 'Alhaji Bashir Dikko (Dikko Properties Ent.)',
    sellerPhone: '+234 803 419 8221',
    agentName: 'Apex Prime Realtors Abuja',
    coordinates: {
      lat: 8.9872,
      lng: 7.4215,
      formattedDMS: '8°59\'13.9"N 7°25\'17.4"E',
      coordinateStatus: 'Potential Issue'
    },
    lifecycle: 'VERIFICATION_REQUIRED',
    riskIndicatorScore: 74,
    riskLevel: 'HIGH',
    evidenceCompletenessPercent: 78,
    documentsCount: 4,
    lastUpdated: '2026-09-13T18:40:00Z',
    assignedTeam: ['Barr. Emeka Okonjo (Legal)', 'Surv. Tunde Balogun (SURCON)'],
    documents: [
      {
        documentId: 'DOC-SRV-01',
        documentName: 'Certified Survey Plan FCT/SURV/2021/0491',
        category: 'Survey Plan',
        version: 1,
        uploadDate: '2026-09-11',
        ocrConfidence: 96,
        plotNumber: '24',
        parcelNumber: 'FCT/KD/E08/24',
        surveyPlanNumber: 'FCT/SURV/2021/0491',
        areaSqm: 1200,
        claimedOwnerName: 'Mallam Sani Kazaure',
        sellerName: 'Alhaji Bashir Dikko',
        state: 'FCT',
        lga: 'AMAC',
        executionDate: '2021-04-14',
        issuingAuthority: 'Office of the Surveyor General of the Federation',
        signatories: ['Surv. P. A. Adebayo (FNIS, SURCON Reg 1402)'],
        rawTextPreview: 'CADATRAL SURVEY OF PLOT 24 CADASTRAL ZONE E08 LOKOGOMA DISTRICT AMAC FCT ABUJA. AREA = 1,200.00 SQ.M. BEACONS PB 8104 TO PB 8107.'
      },
      {
        documentId: 'DOC-DED-02',
        documentName: 'Deed of Assignment (Dikko to Buyer)',
        category: 'Deed of Assignment',
        version: 1,
        uploadDate: '2026-09-11',
        ocrConfidence: 92,
        plotNumber: '42',
        parcelNumber: 'FCT/KD/E08/42',
        surveyPlanNumber: 'FCT/SURV/2019/0812',
        areaSqm: 1850,
        claimedOwnerName: 'Alhaji Bashir Dikko',
        sellerName: 'Alhaji Bashir Dikko',
        state: 'FCT',
        lga: 'AMAC',
        executionDate: '2023-11-20',
        signatories: ['Alhaji Bashir Dikko', 'Chief I. N. Eze (Witness)'],
        rawTextPreview: 'THIS DEED OF ASSIGNMENT MADE THIS 20TH DAY OF NOVEMBER 2023 CONVEYING ALL THAT PARCEL OF LAND MEASURING 1,850 SQM KNOWN AS PLOT 42 LOKOGOMA.'
      },
      {
        documentId: 'DOC-ALL-03',
        documentName: 'FCDA Allocation Letter #AMAC/REV/98/104',
        category: 'Allocation Letter',
        version: 1,
        uploadDate: '2026-09-12',
        ocrConfidence: 89,
        plotNumber: '24',
        claimedOwnerName: 'Mallam Sani Kazaure',
        areaSqm: 1200,
        state: 'FCT',
        lga: 'AMAC',
        executionDate: '1998-06-12',
        issuingAuthority: 'Federal Capital Development Authority (FCDA)'
      },
      {
        documentId: 'DOC-REC-04',
        documentName: 'Family Land Purchase Receipt & Undertaking',
        category: 'Family Receipt',
        version: 1,
        uploadDate: '2026-09-12',
        ocrConfidence: 84,
        plotNumber: 'Unnumbered Family Parcel',
        areaSqm: 1500,
        claimedOwnerName: 'Gbagyi Indigenous Landholders Forum',
        sellerName: 'Chief Ayuba Gomo'
      }
    ],
    crossChecks: [
      {
        id: 'CHK-PLOT-01',
        parameter: 'Plot Number',
        status: 'MISMATCH',
        severity: 'HIGH',
        findingDescription: 'The Survey Plan identifies the parcel as Plot 24 while the Deed of Assignment references Plot 42.',
        docA: { name: 'Certified Survey Plan FCT/SURV/2021/0491', page: 2, value: 'Plot 24' },
        docB: { name: 'Deed of Assignment (Dikko to Buyer)', page: 1, value: 'Plot 42' },
        whyItMatters: 'Conveying Plot 42 while surveying Plot 24 creates an immediate catastrophic boundary dispute with the legitimate allottee of Plot 42.',
        recommendedAction: 'Confirm the exact approved parcel number with AGIS (Abuja Geographic Information Systems) before parting with deposit funds.'
      },
      {
        id: 'CHK-AREA-01',
        parameter: 'Parcel Area',
        status: 'MISMATCH',
        severity: 'HIGH',
        findingDescription: 'Survey Plan demarcates 1,200.00 sqm, whereas the Deed recites 1,850.00 sqm (54.2% surface discrepancy).',
        docA: { name: 'Certified Survey Plan FCT/SURV/2021/0491', page: 1, value: '1,200 sqm' },
        docB: { name: 'Deed of Assignment (Dikko to Buyer)', page: 2, value: '1,850 sqm' },
        whyItMatters: 'Claiming 650 sqm beyond surveyed beacons indicates physical trespass into neighbouring allocated plots or green conservation corridors.',
        recommendedAction: 'Order an independent boundary re-establishment traverse survey through a SURCON-licensed surveyor.'
      },
      {
        id: 'CHK-ROOT-01',
        parameter: 'Parties / Names',
        status: 'UNCERTAIN',
        severity: 'ELEVATED',
        findingDescription: 'Original FCDA Allocation was granted to Mallam Sani Kazaure, but current vendor Alhaji Bashir Dikko offers no Power of Attorney.',
        docA: { name: 'FCDA Allocation Letter', page: 1, value: 'Mallam Sani Kazaure (Allottee)' },
        docB: { name: 'Deed of Assignment', page: 1, value: 'Alhaji Bashir Dikko (Vendor)' },
        whyItMatters: 'Without an unbroken chain of title or registered Irrevocable Power of Attorney, vendor lacks alienable legal standing to convey right of occupancy.',
        recommendedAction: 'Instruct a legal practitioner to obtain Certified True Copies of all intermediate devolution instruments.'
      },
      {
        id: 'CHK-CONSENT-01',
        parameter: 'Document References',
        status: 'MISSING',
        severity: 'HIGH',
        findingDescription: 'Ministerial/Governor\'s Consent endorsement is missing on the Deed of Assignment.',
        docA: { name: 'Deed of Assignment', page: 3, value: 'Unendorsed' },
        docB: { name: 'AGIS Registry Memorial', page: 0, value: 'No Registration Number' },
        whyItMatters: 'Under the Land Use Act 1978, unconsented transactions pass no statutory title and cannot be perfected at AGIS.',
        recommendedAction: 'Make submission and clearance of consent application a strict condition precedent in any escrow contract.'
      }
    ],
    risks: [
      {
        id: 'RSK-DOC-01',
        title: 'Conflicting Plot Identifiers Across Conveyance Instruments',
        category: 'Documentation Risk',
        severity: 'HIGH',
        scoreImpact: -28,
        description: 'Survey Plan designates Plot 24; Deed recites Plot 42.',
        evidence: 'Survey Plan page 2, Deed page 1',
        sourceDocument: 'Deed of Assignment',
        page: 1,
        confidence: 98,
        whyItMatters: 'Risk of buying someone else\'s land or executing an unenforceable instrument.',
        recommendedAction: 'Demarcate cadastral beacon chart at Department of Cadastre AMAC.'
      },
      {
        id: 'RSK-OWN-02',
        title: 'Unperfected Chain of Title from Original Allottee',
        category: 'Ownership Risk',
        severity: 'HIGH',
        scoreImpact: -24,
        description: 'No registered power of attorney connecting original grantee Kazaure to vendor Dikko.',
        evidence: 'FCDA Allocation Letter vs Deed Recitals',
        sourceDocument: 'FCDA Allocation Letter',
        page: 1,
        confidence: 94,
        whyItMatters: 'Prior legal heirs can repudiate the transaction and secure injunctive relief.',
        recommendedAction: 'Conduct physical interview with original allottee and search FCDA files.'
      },
      {
        id: 'RSK-GEO-03',
        title: 'Beacon Closure Variance and Wetland Setback Hazard',
        category: 'Geographic Risk',
        severity: 'ELEVATED',
        scoreImpact: -14,
        description: 'Coordinates lie within 45 metres of natural drainage flood buffer.',
        evidence: 'Hydrological satellite overlay & beacon math',
        sourceDocument: 'Survey Plan',
        page: 2,
        confidence: 91,
        whyItMatters: 'FCDA Development Control demolishes structures built in seasonal water channels.',
        recommendedAction: 'Verify EIA and flood setback approval from FCDA Department of Engineering.'
      }
    ],
    riskCategories: [
      { category: 'Documentation Risk', weightPercent: 20, score: 78, status: 'High', summary: 'Severe plot mismatch (24 vs 42) between Survey and Deed.' },
      { category: 'Ownership Risk', weightPercent: 20, score: 75, status: 'High', summary: 'Missing root title link between original allottee and vendor.' },
      { category: 'Geographic Risk', weightPercent: 15, score: 62, status: 'Elevated', summary: 'Surface area discrepancy of 650 sqm and stream buffer proximity.' },
      { category: 'Legal / Title Consistency', weightPercent: 15, score: 72, status: 'High', summary: 'Absence of statutory Ministerial / Governor\'s Consent.' },
      { category: 'Planning / Zoning', weightPercent: 10, score: 40, status: 'Moderate', summary: 'Residential zoning matched, but stormwater buffer unverified.' },
      { category: 'Transaction Risk', weightPercent: 10, score: 80, status: 'High', summary: 'Vendor requesting direct private offshore transfer before AGIS search.' },
      { category: 'Evidence Completeness', weightPercent: 5, score: 65, status: 'Moderate', summary: '4 of 7 anticipated root documents uploaded.' },
      { category: 'Deadline / Operational', weightPercent: 5, score: 30, status: 'Low', summary: 'No pending statutory revocation notices active on file.' }
    ],
    verificationTasks: [
      {
        id: 'TSK-01',
        title: 'AGIS Official Legal Title Search',
        category: 'Government Authority',
        verificationGroup: 'Official Verification Required',
        status: 'Pending',
        owner: 'Barr. Emeka Okonjo',
        evidenceRequired: 'Certified True Search Report stamped by AGIS Registrar of Titles',
        notes: 'Must confirm whether file is flagged for double-allocation or under court order.',
        dueDate: '2026-09-18'
      },
      {
        id: 'TSK-02',
        title: 'On-Site Cadastral Beacon Recovery & Traverse Check',
        category: 'Physical Verification',
        verificationGroup: 'Professional Review Required',
        status: 'In Progress',
        owner: 'Surv. Tunde Balogun',
        evidenceRequired: 'SURCON Beacon Inspection Certificate and coordinates log',
        notes: 'Confirm physical boundary pins PB 8104, PB 8105, PB 8106, PB 8107 in ground.'
      },
      {
        id: 'TSK-03',
        title: 'Original Grantee Identification & Devolution Verification',
        category: 'Seller',
        verificationGroup: 'User Verified',
        status: 'Flagged',
        owner: 'Diaspora Buyer',
        evidenceRequired: 'Valid NIN / Passport of Mallam Sani Kazaure + Signed Consent Letter',
        notes: 'Seller claims Kazaure is in the UK; independent confirmation required.'
      },
      {
        id: 'TSK-04',
        title: 'AI OCR Document Integrity & Text Extraction',
        category: 'Documents',
        verificationGroup: 'AI Verified',
        status: 'Verified',
        owner: 'DiasporaLand AI Engine',
        evidenceRequired: 'OCR page-by-page token verification and hash seal',
        notes: 'Automated extraction completed with 96% token confidence.'
      }
    ],
    vaultFiles: [
      {
        id: 'VLT-01',
        name: 'Survey_Plan_FCT_2021_0491.pdf',
        category: 'Survey Plan',
        fileSizeMb: 4.8,
        fileType: 'application/pdf',
        uploadDate: '2026-09-11',
        version: 1,
        uploaderName: 'Dr. Chidi Okafor (Buyer)',
        accessLevel: 'Case Team',
        sha256Seal: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        verificationStatus: 'Extracted'
      },
      {
        id: 'VLT-02',
        name: 'Deed_Assignment_Dikko_Unregistered.pdf',
        category: 'Deed of Assignment',
        fileSizeMb: 6.2,
        fileType: 'application/pdf',
        uploadDate: '2026-09-11',
        version: 1,
        uploaderName: 'Dr. Chidi Okafor (Buyer)',
        accessLevel: 'Case Team',
        sha256Seal: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        verificationStatus: 'Flagged Discrepancy'
      },
      {
        id: 'VLT-03',
        name: 'FCDA_Allocation_AMAC_1998.pdf',
        category: 'Allocation Letter',
        fileSizeMb: 2.1,
        fileType: 'application/pdf',
        uploadDate: '2026-09-12',
        version: 1,
        uploaderName: 'Apex Prime Realtors',
        accessLevel: 'Case Team',
        sha256Seal: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        verificationStatus: 'Cross-Checked'
      },
      {
        id: 'VLT-04',
        name: 'Family_Receipt_Gbagyi_Community.jpg',
        category: 'Family Receipt',
        fileSizeMb: 3.4,
        fileType: 'image/jpeg',
        uploadDate: '2026-09-12',
        version: 1,
        uploaderName: 'Apex Prime Realtors',
        accessLevel: 'Case Team',
        sha256Seal: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
        verificationStatus: 'Flagged Discrepancy'
      }
    ]
  },
  {
    id: 'CASE-LEK-108',
    caseNumber: 'DL-2026-104',
    name: 'Parcel 12, Coastal Boulevard, Lekki Phase 1',
    address: 'Admiralty Way Extension, Lekki',
    state: 'Lagos State',
    lga: 'Eti-Osa',
    country: 'Nigeria',
    propertyType: 'Commercial Land',
    purchasePrice: 280000000,
    currency: 'NGN',
    sellerName: 'Oakwood Holdings Ltd.',
    sellerPhone: '+234 802 911 0033',
    agentName: 'Lekki Coastal Advisory',
    coordinates: {
      lat: 6.4474,
      lng: 3.4849,
      formattedDMS: '6°26\'50.6"N 3°29\'05.6"E',
      coordinateStatus: 'Valid'
    },
    lifecycle: 'ANALYSIS_COMPLETE',
    riskIndicatorScore: 32,
    riskLevel: 'MODERATE',
    evidenceCompletenessPercent: 92,
    documentsCount: 6,
    lastUpdated: '2026-09-13T14:15:00Z',
    assignedTeam: ['Barr. Folake Adeleke (Senior Counsel)'],
    documents: [
      {
        documentId: 'DOC-COFO-01',
        documentName: 'Lagos State Certificate of Occupancy #68/68/2004AB',
        category: 'Certificate of Occupancy',
        version: 2,
        uploadDate: '2026-09-08',
        ocrConfidence: 98,
        plotNumber: '12',
        areaSqm: 2400,
        claimedOwnerName: 'Oakwood Holdings Ltd.',
        state: 'Lagos',
        lga: 'Eti-Osa',
        executionDate: '2004-08-15',
        issuingAuthority: 'Governor of Lagos State'
      }
    ],
    crossChecks: [
      {
        id: 'CHK-LEK-01',
        parameter: 'Plot Number',
        status: 'MATCH',
        severity: 'LOW',
        findingDescription: 'Plot 12 verified identically across C of O and approved building layout.',
        docA: { name: 'C of O #68/68/2004AB', page: 1, value: 'Plot 12' },
        docB: { name: 'Approved Layout Plan', page: 1, value: 'Plot 12' },
        whyItMatters: 'Verified cadastral allocation reduces title ambiguity.',
        recommendedAction: 'Cross-reference Lagos State Lands Bureau chart at Alausa.'
      }
    ],
    risks: [
      {
        id: 'RSK-LEK-01',
        title: 'Coastal Highway Expansion Buffer Setback',
        category: 'Planning/Zoning Risk',
        severity: 'MODERATE',
        scoreImpact: -18,
        description: 'Property perimeter is within 80m of planned federal coastal transit reserve.',
        evidence: 'Federal Ministry of Works Gazette Notice 2024',
        sourceDocument: 'Official Gazette',
        page: 4,
        confidence: 88,
        whyItMatters: 'Portions of boundary frontage may be subject to compulsory acquisition setback.',
        recommendedAction: 'Request formal right-of-way clearance certificate from Federal Highways.'
      }
    ],
    riskCategories: [
      { category: 'Documentation Risk', weightPercent: 20, score: 25, status: 'Low', summary: 'Original C of O authenticated with clear seal.' },
      { category: 'Ownership Risk', weightPercent: 20, score: 15, status: 'Low', summary: 'Corporate vendor registered with CAC since 2002.' },
      { category: 'Geographic Risk', weightPercent: 15, score: 45, status: 'Moderate', summary: 'Coastal erosion and highway setback require verification.' },
      { category: 'Legal / Title Consistency', weightPercent: 15, score: 20, status: 'Low', summary: 'Root title verified in Lagos Lands Registry Alausa.' },
      { category: 'Planning / Zoning', weightPercent: 10, score: 50, status: 'Moderate', summary: 'Commercial mixed-use permitted; right-of-way clearance needed.' },
      { category: 'Transaction Risk', weightPercent: 10, score: 25, status: 'Low', summary: 'Standard escrow protocol proposed by commercial bank.' },
      { category: 'Evidence Completeness', weightPercent: 5, score: 92, status: 'Low', summary: 'Comprehensive document bundle provided.' },
      { category: 'Deadline / Operational', weightPercent: 5, score: 20, status: 'Low', summary: 'Ground rent up to date through 2025.' }
    ],
    verificationTasks: [
      {
        id: 'TSK-LEK-01',
        title: 'Federal Ministry of Works Right-of-Way Clearance',
        category: 'Government Authority',
        verificationGroup: 'Official Verification Required',
        status: 'In Progress',
        owner: 'Barr. Folake Adeleke',
        evidenceRequired: 'Official setback confirmation letter from Federal Highways Controller',
        notes: 'Confirm if 10m frontage is within coastal highway corridor.'
      }
    ],
    vaultFiles: [
      {
        id: 'VLT-LEK-01',
        name: 'Lagos_CofO_Oakwood_2004.pdf',
        category: 'Certificate of Occupancy',
        fileSizeMb: 8.4,
        fileType: 'application/pdf',
        uploadDate: '2026-09-08',
        version: 1,
        uploaderName: 'Oakwood Legal Rep',
        accessLevel: 'Case Team',
        sha256Seal: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
        verificationStatus: 'Verified Authenticated'
      }
    ]
  }
];
