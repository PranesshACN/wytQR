import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import QRCodeStyling from 'qr-code-styling';

export async function generateBatchZip(items, baseConfig, progressCallback) {
  const zip = new JSZip();
  const folder = zip.folder('qr_codes');

  const total = items.length;
  let completed = 0;

  for (let i = 0; i < total; i++) {
    const rawData = items[i].trim();
    if (!rawData) continue;

    const fileName = `qr_${i + 1}_${sanitizeFilename(rawData.substring(0, 15))}.png`;
    
    // Copy options & update data
    const options = {
      ...baseConfig,
      width: 600,
      height: 600,
      data: rawData
    };

    const qr = new QRCodeStyling(options);
    const blob = await qr.getRawData('png');
    
    if (blob) {
      folder.file(fileName, blob);
    }

    completed++;
    if (progressCallback) {
      progressCallback(completed, total);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `qr_codes_batch_${Date.now()}.zip`);
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
}
