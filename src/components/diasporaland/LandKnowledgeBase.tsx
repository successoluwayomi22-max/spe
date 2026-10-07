import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ShieldAlert, 
  FileCheck, 
  Scale, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileText
} from 'lucide-react';

interface StatutoryArticle {
  id: string;
  category: 'statutes' | 'instruments' | 'cadastral' | 'scams' | 'registry';
  title: string;
  statutoryReference?: string;
  summary: string;
  legalImpact: string;
  diasporaWarning: string;
  keyChecklist: string[];
}

const STATUTORY_KNOWLEDGE_BASE: StatutoryArticle[] = [
  {
    id: 'lua-sec-22',
    category: 'statutes',
    title: "Mandatory Governor's Consent Requirement",
    statutoryReference: 'Land Use Act 1978, Section 22(1)',
    summary: 'Under Nigerian law, it is unlawful for the holder of a statutory right of occupancy to alienate their right (by assignment, mortgage, transfer of possession, or sublease) without the prior consent of the State Governor.',
    legalImpact: 'Any deed or purchase executed without obtaining Governor’s Consent is inchoate and legally voidable under Section 26 of the Land Use Act. The buyer holds only an equitable interest that cannot defend against a subsequent buyer who obtains consent first.',
    diasporaWarning: 'Sellers frequently tell overseas buyers that "Governor’s Consent is in processing" or "the original C of O covers you". This is false. Every subsequent sale of land requires a distinct Governor’s Consent.',
    keyChecklist: [
      'Demand to inspect the Governor’s Consent file number and date of approval.',
      'Verify the consent at the State Lands Bureau (e.g., Alausa in Lagos or AGIS in Abuja).',
      'Never disburse more than a refundable earnest deposit until consent is certified or held in formal escrow.'
    ]
  },
  {
    id: 'lua-sec-28',
    category: 'statutes',
    title: 'Compulsory Acquisition & Revocation for Overriding Public Interest',
    statutoryReference: 'Land Use Act 1978, Section 28',
    summary: 'The Governor holds statutory authority to revoke any right of occupancy for overriding public interest, including development of infrastructure, highways, ports, or non-compliance with building regulations.',
    legalImpact: 'If land was already gazetted for compulsory acquisition prior to your purchase, your title is void ab initio. The state owes compensation only for unexhausted improvements (buildings) to the original holder, not to an unauthorized buyer.',
    diasporaWarning: 'Corrupt syndicates frequently parcel and sell land situated inside committed government acquisitions, green verges, or coastal highway right-of-ways to buyers who do not conduct physical cadastral charting.',
    keyChecklist: [
      'Commission a Surveyor-General Land Information Certificate (Charting).',
      'Confirm the coordinates do not intersect Federal or State road reserves (minimum 50m–150m setback).',
      'Check State Official Gazettes for notices of revocation.'
    ]
  },
  {
    id: 'inst-cofo',
    category: 'instruments',
    title: 'Certificate of Occupancy (C of O) vs Governor’s Consent',
    statutoryReference: 'Land Use Act 1978, Section 9; Lagos Land Registration Law 2015',
    summary: 'A Certificate of Occupancy is an initial statutory leasehold issued directly by the State Governor to the first grantee (typically for a maximum term of 99 years). A Governor’s Consent is the perfection instrument required when that land is subsequently resold.',
    legalImpact: 'A seller who holds a C of O can legally transfer their title, but the buyer MUST register a Deed of Assignment accompanied by Governor’s Consent to become the recognized legal owner on the government memorial register.',
    diasporaWarning: 'A C of O does NOT immunize land against fraud if the seller is an impostor or if the C of O was previously revoked or forged. The C of O number must be matched against the cadastral folio at the registry.',
    keyChecklist: [
      'Request the C of O Volume, Page, and Number (e.g., Vol 42, Page 42, C of O No. 2020/04).',
      'Verify the grantee name matches the seller’s verifiable government identification (NIN or Passport).',
      'Ensure the survey plan annexed to the C of O matches the boundary coordinates on ground.'
    ]
  },
  {
    id: 'inst-gazette',
    category: 'instruments',
    title: 'Official Gazette & Village Excision',
    statutoryReference: 'Lagos State Gazette Publications / Land regularisation frameworks',
    summary: 'When the state acquires land globally, it may "excise" a portion back to the ancestral indigenous community. This excision is valid in law ONLY when published in an Official State Government Gazette with specific cadastral coordinates.',
    legalImpact: 'A gazetted excision extinguishes state acquisition over that specific delineated parcel, allowing the community to lawfully convey family land. An "excision in progress" or "excision file number" has ZERO legal effect.',
    diasporaWarning: 'Real estate marketing companies often advertise land with "Excision in Progress" or "KL File Number". Under Nigerian law, "in progress" means the land remains COMMITTED GOVERNMENT ACQUISITION. If the government rejects the application, all structures will be demolished.',
    keyChecklist: [
      'Obtain the exact Gazette Number, Volume, and Date of Publication.',
      'Chart your specific plot boundary against the boundary coordinate table printed in the Gazette.',
      'Never purchase land based on an "excision file number" without escrow protection.'
    ]
  },
  {
    id: 'inst-receipt',
    category: 'instruments',
    title: 'Customary Family Receipts & Contracts of Sale',
    statutoryReference: 'Supreme Court of Nigeria: Ogunleye v. Oni (1990) 2 NWLR (Pt. 135) 745',
    summary: 'A family receipt or contract of sale signed by community elders or "Omonile" is merely an acknowledgment of monetary payment. It DOES NOT convey legal title to real estate in Nigeria.',
    legalImpact: 'The Supreme Court of Nigeria has repeatedly ruled that a purchase receipt without a valid root of title (Gazette, C of O, or Registered Conveyance) transfers nothing to the buyer (nemo dat quod non habet).',
    diasporaWarning: 'Sellers in peri-urban areas frequently issue stamped family receipts and promise that "you can process your C of O yourself". This leaves the buyer vulnerable to second sales by competing family factions.',
    keyChecklist: [
      'Confirm whether the principal head of the family and accredited family representatives executed the transfer.',
      'Insist on a formal Deed of Assignment with full recitals of ancestral devolution.',
      'Immediately commence title regularization and survey lodgement.'
    ]
  },
  {
    id: 'cad-surcon',
    category: 'cadastral',
    title: 'SURCON Survey Beacon Standards & Coordinate Reading',
    statutoryReference: 'Surveyors Registration Council of Nigeria (SURCON) Act Cap S18 LFN 2004',
    summary: 'Only licensed surveyors registered with SURCON may execute legal cadastral surveys for title conveyancing. Every survey plan must bear an official SURCON seal, surveyor signature, and registered beacon pillar numbers.',
    legalImpact: 'A survey plan executed by an unlicensed individual or lacking official lodgement (Red Copy) at the Office of the State Surveyor-General is invalid and inadmissible in a Nigerian court of law to establish title.',
    diasporaWarning: 'Beware of "Flying Surveys" — surveys where a surveyor draws a plan in an office without visiting the site, or assigns coordinates of a safe parcel to land that is actually inside a highway setback or flood basin.',
    keyChecklist: [
      'Inspect beacon pillars on ground: verify stamped numbering (e.g., SC/LA 1234, SC/FCT 5678).',
      'Confirm the survey is "Lodged" (Record Copy filed at the State Surveyor-General’s Office).',
      'Hire an independent SURCON surveyor to verify traverse closure and field coordinates before purchase.'
    ]
  },
  {
    id: 'cad-datums',
    category: 'cadastral',
    title: 'Coordinate Transformation: Minna Datum vs WGS84 GPS',
    statutoryReference: 'Office of the Surveyor-General of the Federation (OSGOF) Technical Standards',
    summary: 'Official Nigerian cadastral surveys traditionally use the Minna Datum (Clarke 1880 ellipsoid) with Transverse Mercator projections (UTM Zones 31, 32, or 33). Modern handheld GPS, Google Maps, and mobile phones use WGS84 coordinates.',
    legalImpact: 'Directly plotting Minna Datum coordinates onto a WGS84 map without rigorous mathematical datum conversion introduces a spatial shift of 150 to 300 meters, which can falsely place a parcel on a neighbor’s land or inside a government road.',
    diasporaWarning: 'Fraudulent sellers exploit this datum shift to convince diaspora buyers that a road encroachment is just a "Google Maps error". Never accept unverified conversions.',
    keyChecklist: [
      'Ensure coordinate conversion uses 3-parameter or 7-parameter Helmert transformation parameters calibrated for Nigeria.',
      'Always obtain both Eastings/Northings (Minna UTM) and Decimal Degrees (WGS84).',
      'Verify polygon area calculation in square metres against the deed recital.'
    ]
  },
  {
    id: 'scam-omonile',
    category: 'scams',
    title: 'The "Omonile" Multi-Sale & Family Faction Scam',
    statutoryReference: 'Criminal Law of Lagos State (Prohibition of Forceful Land Occupation 2016)',
    summary: 'Customary landowning families often feature internal rival factions. One faction sells a parcel to an overseas buyer, and months later, a rival branch sells the exact same land to another buyer or physically halts construction.',
    legalImpact: 'Under the Lagos State Property Protection Law, land grabbing and fraudulent multi-sale carry criminal penalties of up to 10–21 years imprisonment, yet enforcement remains challenging without registered title.',
    diasporaWarning: 'Diaspora buyers who leave land vacant without physical possession or boundary fencing are prime targets for reselling by local land speculators.',
    keyChecklist: [
      'Obtain a written Family Resolution or Power of Attorney signed by all acknowledged principal branches.',
      'Erect a physical boundary wall and gate immediately following survey confirmation.',
      'Place a prominent ownership notice board with contact information of your legal practitioner.'
    ]
  },
  {
    id: 'scam-demolition',
    category: 'scams',
    title: 'Right-of-Way & Drainage Corridor Encroachment',
    statutoryReference: 'Federal Highways Act; Lagos State Physical Planning Law 2010',
    summary: 'Federal and State agencies enforce statutory setbacks: 50m–150m for Federal Highways, 15m–30m for primary canal drainage channels, and 50m for high-voltage power transmission lines.',
    legalImpact: 'Structures erected within statutory setbacks are deemed illegal obstructions under planning laws and are subject to immediate demolition without state compensation.',
    diasporaWarning: 'Developers often acquire low-lying wetland or expressway verge land cheaply, backfill it during the dry season, and market it as "prime dry estate land" to diaspora buyers before demolition notices are issued.',
    keyChecklist: [
      'Conduct an on-site flood and environmental drainage inspection during rainy season if possible.',
      'Verify planning approval status with the State Ministry of Physical Planning.',
      'Confirm parcel coordinates against Master Plan transport and environmental corridors.'
    ]
  },
  {
    id: 'reg-alausa',
    category: 'registry',
    title: 'Deeds Registry Search Protocol: Alausa (Lagos)',
    statutoryReference: 'Lagos State Lands Bureau & Land Records Company (LRC) Protocol',
    summary: 'An official search at the Lagos State Lands Bureau in Alausa is the definitive legal mechanism to ascertain whether a parcel is encumbered by mortgages, court lis pendens, government acquisition, or prior registered assignments.',
    legalImpact: 'Only an official search conducted with a formal search application letter and payment of statutory fees confers legal notice protection against undisclosed encumbrances.',
    diasporaWarning: 'Never rely on a photocopy of a title document shown via WhatsApp or email. Photocopies can be manipulated with desktop software. Only direct folio inspection at the registry is definitive.',
    keyChecklist: [
      'Instruct a licensed legal practitioner to file a formal Search Application at the Lands Registry.',
      'Request the certified search report detailing the register folio, memorials, and mortgages.',
      'Confirm that the seller has paid all outstanding ground rents and land use charges.'
    ]
  },
  {
    id: 'reg-agis',
    category: 'registry',
    title: 'AGIS Search Protocol: Abuja Federal Capital Territory (FCT)',
    statutoryReference: 'Abuja Geographic Information Systems (AGIS) Regulations',
    summary: 'AGIS manages all cadastral surveying, land administration, and title records within the Federal Capital Territory under the Minister of the FCT. All FCT allocations and transfers must be validated through AGIS.',
    legalImpact: 'In Abuja, unregularized customary allocations by Area Councils (e.g., Gwagwalada, Kuje, Bwari) are frequently revoked or superseded by the FCDA Master Plan. A ministerial allocation with AGIS file number is mandatory.',
    diasporaWarning: 'Do not buy "Area Council allocation" land in Abuja without confirming whether it has been gazetted for regularization under the FCT Cadastral Resettlement scheme.',
    keyChecklist: [
      'Request the Legal Search at AGIS customer service center in Area 11, Garki, Abuja.',
      'Check whether the plot is affected by FCDA Development Control demolition or setback notices.',
      'Confirm that the allocation has not been revoked for failure to develop within statutory timelines.'
    ]
  }
];

export const LandKnowledgeBase: React.FC<{ onSelectTopic?: (topicId: string) => void }> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'statutes' | 'instruments' | 'cadastral' | 'scams' | 'registry'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('lua-sec-22');

  const filteredArticles = STATUTORY_KNOWLEDGE_BASE.filter(art => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesQuery = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.legalImpact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.statutoryReference && art.statutoryReference.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Section */}
      <div className="bg-[#0c1322] border border-[#1e2d4a] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Statutory Land-Risk & Legal Compendium</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Authoritative Nigerian Cadastral & Legal Knowledge Base
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Ground your land investigations in actual Nigerian statutory law, Supreme Court precedents, SURCON surveying standards, and state registry verification protocols.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Knowledge' },
            { id: 'statutes', label: 'Statutes & Laws' },
            { id: 'instruments', label: 'Title Instruments' },
            { id: 'cadastral', label: 'SURCON & Cadastre' },
            { id: 'scams', label: 'Fraud & Red Flags' },
            { id: 'registry', label: 'Registry Searches' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[#0e1626] text-slate-400 hover:text-white border border-[#1e2d4a]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search statutes, C of O, beacons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#080d17] border border-[#202e48] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Knowledge Articles Grid / Accordion */}
      <div className="space-y-4">
        {filteredArticles.map(art => {
          const isExpanded = expandedId === art.id;

          return (
            <div 
              key={art.id}
              className="bg-[#0b1220] border border-[#1e2d4a] rounded-xl shadow-lg overflow-hidden transition-all hover:border-slate-700"
            >
              {/* Card Header */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : art.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none bg-[#0d1527]/50 hover:bg-[#0d1527] transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-950/70 border border-blue-500/30 text-blue-400">
                      {art.category}
                    </span>
                    {art.statutoryReference && (
                      <span className="text-[11px] font-mono text-slate-400">
                        {art.statutoryReference}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {art.summary}
                  </p>
                </div>

                <button className="p-1 text-slate-400 hover:text-white shrink-0 mt-1">
                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-blue-400' : ''}`} />
                </button>
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="p-5 border-t border-[#1e2d4a] space-y-5 bg-[#080d17]/80 animate-in fade-in duration-150">
                  {/* Legal Impact */}
                  <div className="bg-[#0c1424] border border-blue-900/40 rounded-lg p-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase font-mono">
                      <Scale className="w-3.5 h-3.5" />
                      <span>Statutory Legal Consequence</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {art.legalImpact}
                    </p>
                  </div>

                  {/* Diaspora Red Flag Warning */}
                  <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase font-mono">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Diaspora Fraud / Scam Risk</span>
                    </div>
                    <p className="text-xs text-red-200/90 leading-relaxed">
                      {art.diasporaWarning}
                    </p>
                  </div>

                  {/* Mandatory Due-Diligence Checklist */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-300 font-mono uppercase block">
                      Mandatory Verification Protocol:
                    </span>
                    <ul className="space-y-2">
                      {art.keyChecklist.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredArticles.length === 0 && (
          <div className="p-12 text-center bg-[#0b1220] border border-[#1e2d4a] rounded-xl space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Matching Articles Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No statutory references matched "{searchQuery}". Try searching for terms like "Consent", "C of O", "Survey", "Excision", or "Alausa".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
