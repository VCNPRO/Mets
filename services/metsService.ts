
import { DmdSecData, AmdSecData, FileEntry, StructMapItem, MetsState, MetsHdrData } from '../types';

let idCounter: number;

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
    return '';
  });
};

/**
 * Generate METS Header (metsHdr)
 */
const generateMetsHdr = (data: MetsHdrData | null): string => {
  if (!data) {
    // Generate default header if not provided
    data = {
      createDate: new Date().toISOString(),
      recordStatus: 'NEW',
    };
  }

  const hdrId = generateUniqueId('hdr');
  const agentId = generateUniqueId('agent');

  return `
    <mets:metsHdr CREATEDATE="${data.createDate}" ${data.lastModDate ? `LASTMODDATE="${data.lastModDate}"` : ''} ${data.recordStatus ? `RECORDSTATUS="${data.recordStatus}"` : ''} ID="${hdrId}">
        ${data.agentName ? `
        <mets:agent ID="${agentId}" ${data.agentRole ? `ROLE="${data.agentRole}"` : ''} ${data.agentType ? `TYPE="${data.agentType}"` : ''}>
            <mets:name>${escapeXml(data.agentName)}</mets:name>
            ${data.agentNote ? `<mets:note>${escapeXml(data.agentNote)}</mets:note>` : ''}
        </mets:agent>` : ''}
    </mets:metsHdr>`;
};

/**
 * Generate extended Dublin Core metadata
 */
const generateDublinCore = (data: DmdSecData): string => {
  const fields: string[] = [];

  // Core 4 elements (always present)
  fields.push(`<dc:title>${escapeXml(data.title)}</dc:title>`);
  fields.push(`<dc:creator>${escapeXml(data.author)}</dc:creator>`);
  fields.push(`<dc:date>${escapeXml(data.date)}</dc:date>`);
  if (data.subject) fields.push(`<dc:subject>${escapeXml(data.subject)}</dc:subject>`);

  // Extended 11 elements
  if (data.description) fields.push(`<dc:description>${escapeXml(data.description)}</dc:description>`);
  if (data.publisher) fields.push(`<dc:publisher>${escapeXml(data.publisher)}</dc:publisher>`);
  if (data.contributor) fields.push(`<dc:contributor>${escapeXml(data.contributor)}</dc:contributor>`);
  if (data.type) fields.push(`<dc:type>${escapeXml(data.type)}</dc:type>`);
  if (data.format) fields.push(`<dc:format>${escapeXml(data.format)}</dc:format>`);
  if (data.identifier) fields.push(`<dc:identifier>${escapeXml(data.identifier)}</dc:identifier>`);
  if (data.source) fields.push(`<dc:source>${escapeXml(data.source)}</dc:source>`);
  if (data.language) fields.push(`<dc:language>${escapeXml(data.language)}</dc:language>`);
  if (data.relation) fields.push(`<dc:relation>${escapeXml(data.relation)}</dc:relation>`);
  if (data.coverage) fields.push(`<dc:coverage>${escapeXml(data.coverage)}</dc:coverage>`);
  if (data.rights) fields.push(`<dc:rights>${escapeXml(data.rights)}</dc:rights>`);

  return fields.join('\n                ');
};

/**
 * Generate Descriptive Metadata Section (dmdSec)
 */
const generateDmdSec = (data: DmdSecData | null): string => {
  if (!data) return '';

  const dmdSecId = generateUniqueId('dmd');

  return `
    <mets:dmdSec ID="${dmdSecId}">
        <mets:mdWrap MDTYPE="${data.metadataStandard === 'DublinCore' ? 'DC' : 'MODS'}">
            <mets:xmlData>
                ${data.metadataStandard === 'DublinCore' ? generateDublinCore(data) : `
                <mods:titleInfo><mods:title>${escapeXml(data.title)}</mods:title></mods:titleInfo>
                <mods:name type="personal"><mods:namePart>${escapeXml(data.author)}</mods:namePart></mods:name>
                <mods:originInfo><mods:dateIssued>${escapeXml(data.date)}</mods:dateIssued></mods:originInfo>
                <mods:subject><mods:topic>${escapeXml(data.subject)}</mods:topic></mods:subject>
                `}
            </mets:xmlData>
        </mets:mdWrap>
    </mets:dmdSec>`;
};

/**
 * Generate MIX (NISO Metadata for Images in XML) technical metadata
 */
const generateMixMetadata = (file: FileEntry): string => {
  if (!file.imageTech) return '';

  const tech = file.imageTech;

  return `
                <mix:mix xmlns:mix="http://www.loc.gov/mix/v20">
                    <mix:BasicImageInformation>
                        <mix:BasicImageCharacteristics>
                            ${tech.width ? `<mix:imageWidth>${tech.width}</mix:imageWidth>` : ''}
                            ${tech.height ? `<mix:imageHeight>${tech.height}</mix:imageHeight>` : ''}
                            ${tech.colorSpace ? `<mix:PhotometricInterpretation>
                                <mix:colorSpace>${escapeXml(tech.colorSpace)}</mix:colorSpace>
                            </mix:PhotometricInterpretation>` : ''}
                        </mix:BasicImageCharacteristics>
                    </mix:BasicImageInformation>
                    ${tech.xResolution || tech.yResolution ? `
                    <mix:ImageCaptureMetadata>
                        <mix:ScannerCapture>
                            ${tech.xResolution ? `<mix:xSamplingFrequency>${tech.xResolution}</mix:xSamplingFrequency>` : ''}
                            ${tech.yResolution ? `<mix:ySamplingFrequency>${tech.yResolution}</mix:ySamplingFrequency>` : ''}
                            ${tech.resolutionUnit ? `<mix:samplingFrequencyUnit>${escapeXml(tech.resolutionUnit)}</mix:samplingFrequencyUnit>` : ''}
                        </mix:ScannerCapture>
                    </mix:ImageCaptureMetadata>` : ''}
                </mix:mix>`;
};

/**
 * Generate technical metadata for each file
 */
const generateTechMD = (file: FileEntry): string => {
  const techId = generateUniqueId('tech');

  if (file.imageTech) {
    // Use MIX standard for images
    return `
        <mets:techMD ID="${techId}">
            <mets:mdWrap MDTYPE="NISOIMG">
                <mets:xmlData>${generateMixMetadata(file)}</mets:xmlData>
            </mets:mdWrap>
        </mets:techMD>`;
  }

  // Fallback for non-image files
  return `
        <mets:techMD ID="${techId}">
            <mets:mdWrap MDTYPE="OTHER" OTHERMDTYPE="TECHNICAL">
                <mets:xmlData>
                    <tech:technicalMetadata xmlns:tech="http://www.example.com/techMD">
                        <tech:fileSize>${file.size}</tech:fileSize>
                        <tech:mimeType>${escapeXml(file.mimeType)}</tech:mimeType>
                        ${file.created ? `<tech:created>${file.created}</tech:created>` : ''}
                        ${file.modified ? `<tech:modified>${file.modified}</tech:modified>` : ''}
                    </tech:technicalMetadata>
                </mets:xmlData>
            </mets:mdWrap>
        </mets:techMD>`;
};

/**
 * Generate Administrative Metadata Section (amdSec)
 */
const generateAmdSec = (data: AmdSecData | null, files: FileEntry[]): string => {
  if (!data && files.length === 0) return '';

  const amdSecId = generateUniqueId('amd');
  const rightsId = generateUniqueId('rights');
  const digiprovId = generateUniqueId('digiprov');

  // Generate techMD for each file with image metadata
  const techMDs = files
    .filter(file => file.imageTech || file.media)
    .map(file => generateTechMD(file))
    .join('');

  return `
    <mets:amdSec ID="${amdSecId}">
        ${techMDs}
        ${data ? `
        <mets:rightsMD ID="${rightsId}">
            <mets:mdWrap MDTYPE="OTHER" OTHERMDTYPE="RIGHTS">
                <mets:xmlData>
                    <rights:rightsHolder xmlns:rights="http://www.example.com/rightsMD">${escapeXml(data.rightsHolder)}</rights:rightsHolder>
                </mets:xmlData>
            </mets:mdWrap>
        </mets:rightsMD>
        <mets:digiprovMD ID="${digiprovId}">
            <mets:mdWrap MDTYPE="PREMIS">
                <mets:xmlData>
                    <premis:event xmlns:premis="http://www.loc.gov/premis/v3">
                        <premis:eventIdentifier>
                            <premis:eventIdentifierType>local</premis:eventIdentifierType>
                            <premis:eventIdentifierValue>${generateUniqueId('event')}</premis:eventIdentifierValue>
                        </premis:eventIdentifier>
                        <premis:eventType>ingestion</premis:eventType>
                        <premis:eventDateTime>${new Date().toISOString()}</premis:eventDateTime>
                        <premis:eventDetail>${escapeXml(data.preservationActions)}</premis:eventDetail>
                    </premis:event>
                </mets:xmlData>
            </mets:mdWrap>
        </mets:digiprovMD>` : ''}
    </mets:amdSec>`;
};

/**
 * Generate File Section (fileSec) with checksums
 */
const generateFileSec = (files: FileEntry[]): string => {
  if (files.length === 0) return '';

  // Group files by 'use' type
  const filesByUse: { [key: string]: FileEntry[] } = {};
  files.forEach(file => {
    const use = file.use || 'archive';
    if (!filesByUse[use]) {
      filesByUse[use] = [];
    }
    filesByUse[use].push(file);
  });

  const fileGroups = Object.entries(filesByUse).map(([use, groupFiles]) => {
    const fileGrpId = generateUniqueId('filegrp');
    const fileElements = groupFiles.map(file => `
            <mets:file ID="${file.id}" MIMETYPE="${escapeXml(file.mimeType)}" SIZE="${file.size}" ${file.created ? `CREATED="${file.created}"` : ''} ${file.md5 ? `CHECKSUM="${file.md5}" CHECKSUMTYPE="MD5"` : ''}>
                ${file.sha256 ? `<mets:FLocat LOCTYPE="URL" xlink:href="${escapeXml(file.name)}" CHECKSUM="${file.sha256}" CHECKSUMTYPE="SHA-256"/>` : `<mets:FLocat LOCTYPE="URL" xlink:href="${escapeXml(file.name)}"/>`}
            </mets:file>`).join('');

    return `
        <mets:fileGrp ID="${fileGrpId}" USE="${use}">
            ${fileElements}
        </mets:fileGrp>`;
  }).join('');

  return `
    <mets:fileSec>
        ${fileGroups}
    </mets:fileSec>`;
};

/**
 * Generate Structural Map (structMap)
 */
const generateStructMap = (items: StructMapItem[]): string => {
  if (items.length === 0) return '';

  const structMapId = generateUniqueId('structmap');
  const rootDivId = generateUniqueId('div');

  const divs = items.map(item => `
            <mets:div ID="${item.id}" TYPE="${item.type || 'item'}" LABEL="${escapeXml(item.label)}" ${item.order !== undefined ? `ORDER="${item.order}"` : ''}>
                ${item.fileIds.map(fileId => `
                <mets:fptr FILEID="${fileId}"/>`).join('')}
            </mets:div>`).join('');

  return `
    <mets:structMap ID="${structMapId}" TYPE="physical">
        <mets:div ID="${rootDivId}" TYPE="material">
            ${divs}
        </mets:div>
    </mets:structMap>`;
};

/**
 * Main function to generate complete METS XML
 */
export const generateMetsXml = (data: MetsState): string => {
  idCounter = 0; // Reset counter

  const metsHdr = generateMetsHdr(data.metsHdr);
  const dmdSec = generateDmdSec(data.dmdSec);
  const amdSec = generateAmdSec(data.amdSec, data.fileSec);
  const fileSec = generateFileSec(data.fileSec);
  const structMap = generateStructMap(data.structMap);

  return `<?xml version="1.0" encoding="UTF-8"?>
<mets:mets xmlns:mets="http://www.loc.gov/METS/"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:dc="http://purl.org/dc/elements/1.1/"
           xmlns:mods="http://www.loc.gov/mods/v3"
           xmlns:mix="http://www.loc.gov/mix/v20"
           xmlns:premis="http://www.loc.gov/premis/v3"
           xmlns:rights="http://www.example.com/rightsMD"
           xmlns:tech="http://www.example.com/techMD"
           xsi:schemaLocation="http://www.loc.gov/METS/ http://www.loc.gov/standards/mets/mets.xsd
                               http://purl.org/dc/elements/1.1/ http://dublincore.org/schemas/xmls/simpledc20021212.xsd
                               http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/v3/mods-3-7.xsd
                               http://www.loc.gov/mix/v20 http://www.loc.gov/standards/mix/mix20/mix20.xsd
                               http://www.loc.gov/premis/v3 http://www.loc.gov/standards/premis/v3/premis.xsd">

    ${metsHdr}
    ${dmdSec}
    ${amdSec}
    ${fileSec}
    ${structMap}

</mets:mets>`;
};
