
import { DmdSecData, AmdSecData, FileEntry, StructMapItem, MetsState } from '../types';

let idCounter: number; // Counter for unique IDs within a single XML generation

const generateUniqueId = (prefix: string = 'id'): string => `${prefix}_${idCounter++}`;

const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
    }
    return ''; // Should not happen
  });
};

export const generateMetsXml = (data: MetsState): string => {
  idCounter = 0; // Reset for each generation

  const dmdSecId = generateUniqueId('dmd');
  const amdSecId = generateUniqueId('amd');
  const fileGrpId = generateUniqueId('filegrp');
  const structMapRootId = generateUniqueId('div');

  // --- Descriptive Metadata Section (dmdSec) ---
  const dmdSecContent = data.dmdSec ? `
    <mets:dmdSec ID="${dmdSecId}">
        <mets:mdWrap MDTYPE="${data.dmdSec.metadataStandard === 'DublinCore' ? 'DC' : 'MODS'}">
            <mets:xmlData>
                ${data.dmdSec.metadataStandard === 'DublinCore' ? `
                <dc:title>${escapeXml(data.dmdSec.title)}</dc:title>
                <dc:creator>${escapeXml(data.dmdSec.author)}</dc:creator>
                <dc:date>${escapeXml(data.dmdSec.date)}</dc:date>
                <dc:subject>${escapeXml(data.dmdSec.subject)}</dc:subject>
                ` : `
                <mods:titleInfo><mods:title>${escapeXml(data.dmdSec.title)}</mods:title></mods:titleInfo>
                <mods:name type="personal"><mods:namePart>${escapeXml(data.dmdSec.author)}</mods:namePart></mods:name>
                <mods:originInfo><mods:dateIssued>${escapeXml(data.dmdSec.date)}</mods:dateIssued></mods:originInfo>
                <mods:subject><mods:topic>${escapeXml(data.dmdSec.subject)}</mods:topic></mods:subject>
                `}
            </mets:xmlData>
        </mets:mdWrap>
    </mets:dmdSec>` : '';

  // --- Administrative Metadata Section (amdSec) ---
  const amdSecContent = data.amdSec ? `
    <mets:amdSec ID="${amdSecId}">
        <mets:techMD ID="${generateUniqueId('tech')}">
            <mets:mdWrap MDTYPE="OTHER" OTHERMDTYPE="TECHNICAL">
                <mets:xmlData>
                    <tech:scannerResolution>${escapeXml(data.amdSec.scannerResolution)}</tech:scannerResolution>
                </mets:xmlData>
            </mets:mdWrap>
        </mets:techMD>
        <mets:rightsMD ID="${generateUniqueId('rights')}">
            <mets:mdWrap MDTYPE="OTHER" OTHERMDTYPE="RIGHTS">
                <mets:xmlData>
                    <rights:rightsHolder>${escapeXml(data.amdSec.rightsHolder)}</rights:rightsHolder>
                </mets:xmlData>
            </mets:mdWrap>
        </mets:rightsMD>
        <mets:digiprovMD ID="${generateUniqueId('digiprov')}">
            <mets:mdWrap MDTYPE="PREMIS">
                <mets:xmlData>
                    <premis:event>
                        <premis:eventType>ingestion</premis:eventType>
                        <premis:eventDetail>${escapeXml(data.amdSec.preservationActions)}</premis:eventDetail>
                    </premis:event>
                </mets:xmlData>
            </mets:mdWrap>
        </mets:digiprovMD>
    </mets:amdSec>` : '';

  // --- File Section (fileSec) ---
  const fileSecContent = data.fileSec.length > 0 ? `
    <mets:fileSec>
        <mets:fileGrp ID="${fileGrpId}" USE="archive">
            ${data.fileSec.map(file => `
            <mets:file ID="${file.id}" MIMETYPE="${escapeXml(file.mimeType)}" SIZE="${file.size}">
                <mets:FLocat LOCTYPE="URL" xlink:href="${escapeXml(file.name)}"/>
            </mets:file>`).join('')}
        </mets:fileGrp>
    </mets:fileSec>` : '';

  // --- Structural Map (structMap) ---
  const structMapContent = data.structMap.length > 0 ? `
    <mets:structMap TYPE="physical">
        <mets:div ID="${structMapRootId}" TYPE="material">
            ${data.structMap.map(item => `
            <mets:div ID="${item.id}" TYPE="item" LABEL="${escapeXml(item.label)}">
                ${item.fileIds.map(fileId => `
                <mets:fptr FILEID="${fileId}"/>`).join('')}
            </mets:div>`).join('')}
        </mets:div>
    </mets:structMap>` : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<mets:mets xmlns:mets="http://www.loc.gov/METS/"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:dc="http://purl.org/dc/elements/1.1/"
           xmlns:mods="http://www.loc.gov/mods/v3"
           xmlns:tech="http://www.example.com/techMD"
           xmlns:rights="http://www.example.com/rightsMD"
           xmlns:premis="http://www.loc.gov/standards/premis/v2"
           xsi:schemaLocation="http://www.loc.gov/METS/ http://www.loc.gov/standards/mets/mets.xsd
                               http://purl.org/dc/elements/1.1/ http://dublincore.org/schemas/xmls/simpledc20021212.xsd
                               http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/v3/mods-3-7.xsd
                               http://www.loc.gov/standards/premis/v2 http://www.loc.gov/standards/premis/v2/premis-v2-2.xsd">

    ${dmdSecContent}
    ${amdSecContent}
    ${fileSecContent}
    ${structMapContent}

</mets:mets>`;
};
