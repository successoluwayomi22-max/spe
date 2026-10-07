// DiasporaLand AI — Document Cross-Checking & Inconsistency Engine
// Evaluates Survey vs Deed vs C of O vs Allocation Letter vs Receipts

import type { ExtractedDocumentData, CrossCheckMismatch, SeverityLevel } from '../../types/diasporaland';

export function runCrossDocumentVerification(docs: ExtractedDocumentData[]): CrossCheckMismatch[] {
  const mismatches: CrossCheckMismatch[] = [];

  const surveyDoc = docs.find((d) => d.category === 'Survey Plan');
  const deedDoc = docs.find((d) => d.category === 'Deed of Assignment');
  const cofoDoc = docs.find((d) => d.category === 'Certificate of Occupancy');
  const allocDoc = docs.find((d) => d.category === 'Allocation Letter');

  // 1. Plot Number Cross-Check
  if (surveyDoc && deedDoc) {
    const surveyPlot = surveyDoc.plotNumber || 'Unspecified';
    const deedPlot = deedDoc.plotNumber || 'Unspecified';

    if (surveyPlot !== 'Unspecified' && deedPlot !== 'Unspecified' && surveyPlot !== deedPlot) {
      mismatches.push({
        id: 'CHK-PLOT-01',
        parameter: 'Plot Number',
        status: 'MISMATCH',
        severity: 'HIGH',
        findingDescription: `The Survey Plan designates the parcel as Plot ${surveyPlot}, whereas the Deed of Assignment references Plot ${deedPlot}.`,
        docA: { name: surveyDoc.documentName, page: 2, value: `Plot ${surveyPlot}` },
        docB: { name: deedDoc.documentName, page: 1, value: `Plot ${deedPlot}` },
        whyItMatters: 'A plot mismatch indicates potential conveyance of an unassigned or overlapping parcel, creating severe title conflict.',
        recommendedAction: 'Obtain immediate written clarification and an approved cadastral pillar charting from the state Surveyor General.'
      });
    } else if (surveyPlot !== 'Unspecified' && deedPlot !== 'Unspecified' && surveyPlot === deedPlot) {
      mismatches.push({
        id: 'CHK-PLOT-00',
        parameter: 'Plot Number',
        status: 'MATCH',
        severity: 'LOW',
        findingDescription: `Consistent plot identification: Plot ${surveyPlot} across Survey Plan and Deed of Assignment.`,
        docA: { name: surveyDoc.documentName, page: 2, value: `Plot ${surveyPlot}` },
        docB: { name: deedDoc.documentName, page: 1, value: `Plot ${deedPlot}` },
        whyItMatters: 'Consistent plot numbering is a foundational prerequisite for parcel identity.',
        recommendedAction: 'Proceed with cadastral beacon verification on site.'
      });
    }
  }

  // 2. Area Dimension Variance
  if (surveyDoc && deedDoc && surveyDoc.areaSqm && deedDoc.areaSqm) {
    const variance = Math.abs(surveyDoc.areaSqm - deedDoc.areaSqm);
    const variancePct = (variance / surveyDoc.areaSqm) * 100;

    if (variancePct > 5) {
      const severity: SeverityLevel = variancePct > 20 ? 'HIGH' : 'ELEVATED';
      mismatches.push({
        id: 'CHK-AREA-01',
        parameter: 'Parcel Area',
        status: 'MISMATCH',
        severity,
        findingDescription: `Area discrepancy: Survey Plan measures ${surveyDoc.areaSqm.toLocaleString()} sqm, while Deed claims ${deedDoc.areaSqm.toLocaleString()} sqm (${variancePct.toFixed(1)}% variance).`,
        docA: { name: surveyDoc.documentName, page: 1, value: `${surveyDoc.areaSqm.toLocaleString()} sqm` },
        docB: { name: deedDoc.documentName, page: 2, value: `${deedDoc.areaSqm.toLocaleString()} sqm` },
        whyItMatters: 'Conveying more square metres on paper than surveyed ground geometry causes boundary infringement on adjoining plots.',
        recommendedAction: 'Require a registered surveyor to reconcile coordinate perimeter bounds before executing purchase agreement.'
      });
    }
  }

  // 3. Ownership / Grantor Alignment
  if (deedDoc && (cofoDoc || allocDoc)) {
    const priorOwner = cofoDoc?.claimedOwnerName || allocDoc?.claimedOwnerName || 'Original Allottee';
    const deedSeller = deedDoc.sellerName || 'Current Assignor';

    if (priorOwner !== 'Original Allottee' && deedSeller !== 'Current Assignor') {
      const isMatch = priorOwner.toLowerCase().includes(deedSeller.toLowerCase()) || deedSeller.toLowerCase().includes(priorOwner.toLowerCase());
      if (!isMatch) {
        mismatches.push({
          id: 'CHK-OWN-01',
          parameter: 'Parties / Names',
          status: 'UNCERTAIN',
          severity: 'ELEVATED',
          findingDescription: `Assignor in Deed ("${deedSeller}") does not match primary grantee in Root Title ("${priorOwner}"). Root title devolution gap detected.`,
          docA: { name: cofoDoc?.documentName || allocDoc?.documentName || 'Root Title', page: 1, value: priorOwner },
          docB: { name: deedDoc.documentName, page: 1, value: deedSeller },
          whyItMatters: 'A gap in the root-of-title chain allows previous registered owners or legal heirs to claim continuing beneficial ownership.',
          recommendedAction: 'Require certified True Copy of intermediate Deeds of Assignment or registered Power of Attorney linking both parties.'
        });
      }
    }
  }

  // 4. Missing Critical Document: Governor's Consent
  const hasGovConsent = docs.some((d) => d.category === "Governor's Consent");
  if (!hasGovConsent && deedDoc) {
    mismatches.push({
      id: 'CHK-GOV-01',
      parameter: 'Document References',
      status: 'MISSING',
      severity: 'HIGH',
      findingDescription: "No Governor's Consent endorsement or registered memorial detected for subsequent transfer.",
      docA: { name: 'Deed of Assignment', page: 1, value: 'Subsequent Transfer' },
      docB: { name: 'Land Registry Archives', page: 0, value: 'Not Lodged' },
      whyItMatters: 'Under Section 22 of the Land Use Act 1978, alienation of statutory right of occupancy without Governor\'s Consent renders conveyance inchoate and vulnerable to state forfeiture.',
      recommendedAction: 'Perform official Lands Bureau title search and confirm Governor\'s Consent submission receipt.'
    });
  }

  return mismatches;
}
