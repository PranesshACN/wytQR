import QRCodeStyling from 'qr-code-styling';

export class QREngine {
  constructor(containerElement) {
    this.container = containerElement;
    this.options = {
      width: 320,
      height: 320,
      type: 'canvas',
      data: 'https://github.com',
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.35,
        margin: 4,
        crossOrigin: 'anonymous'
      },
      dotsOptions: {
        color: '#6366f1',
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#6366f1' },
            { offset: 1, color: '#a855f7' }
          ]
        }
      },
      backgroundOptions: {
        color: '#ffffff'
      },
      cornersSquareOptions: {
        color: '#4f46e5',
        type: 'extra-rounded'
      },
      cornersDotOptions: {
        color: '#a855f7',
        type: 'dot'
      }
    };

    this.qrCode = new QRCodeStyling(this.options);
    this.mount();
  }

  mount() {
    if (this.container) {
      this.container.innerHTML = '';
      this.qrCode.append(this.container);
    }
  }

  update(newOptions) {
    // Deep merge or assign properties safely
    if (newOptions.data !== undefined) this.options.data = newOptions.data;
    if (newOptions.width !== undefined) {
      this.options.width = newOptions.width;
      this.options.height = newOptions.width;
    }
    if (newOptions.margin !== undefined) this.options.margin = Number(newOptions.margin);
    
    if (newOptions.qrOptions) {
      this.options.qrOptions = { ...this.options.qrOptions, ...newOptions.qrOptions };
    }
    
    if (newOptions.dotsOptions) {
      this.options.dotsOptions = { ...this.options.dotsOptions, ...newOptions.dotsOptions };
    }

    if (newOptions.backgroundOptions) {
      this.options.backgroundOptions = { ...this.options.backgroundOptions, ...newOptions.backgroundOptions };
    }

    if (newOptions.cornersSquareOptions) {
      this.options.cornersSquareOptions = { ...this.options.cornersSquareOptions, ...newOptions.cornersSquareOptions };
    }

    if (newOptions.cornersDotOptions) {
      this.options.cornersDotOptions = { ...this.options.cornersDotOptions, ...newOptions.cornersDotOptions };
    }

    if (newOptions.image !== undefined) {
      this.options.image = newOptions.image;
    }

    if (newOptions.imageOptions) {
      this.options.imageOptions = { ...this.options.imageOptions, ...newOptions.imageOptions };
    }

    this.qrCode.update(this.options);
  }

  async getRawBlob(extension = 'png', size = 800) {
    // Render high resolution version offscreen or temporarily update width
    const currentWidth = this.options.width;
    const currentHeight = this.options.height;

    // We can fetch blob directly from qr-code-styling getRawData
    const blob = await this.qrCode.getRawData(extension);
    return blob;
  }

  async download(fileName = 'qrcode', extension = 'png', size = 800) {
    const currentSize = this.options.width;
    
    // Temporarily increase size for download high-res if specified
    if (size !== currentSize) {
      this.qrCode.update({ width: size, height: size });
    }

    await this.qrCode.download({
      name: fileName,
      extension: extension
    });

    if (size !== currentSize) {
      this.qrCode.update({ width: currentSize, height: currentSize });
    }
  }

  async copyToClipboard() {
    try {
      const blob = await this.qrCode.getRawData('png');
      if (!blob) throw new Error('Could not render canvas blob');
      
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      return true;
    } catch (err) {
      console.error('Clipboard write failed:', err);
      return false;
    }
  }

  getOptions() {
    return JSON.parse(JSON.stringify(this.options));
  }
}

// Payload generator helpers
export function buildPayload(type, data) {
  switch (type) {
    case 'url':
      let url = data.url || '';
      if (url && !/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      if (data.utmSource || data.utmMedium || data.utmCampaign) {
        try {
          const parsed = new URL(url);
          if (data.utmSource) parsed.searchParams.set('utm_source', data.utmSource);
          if (data.utmMedium) parsed.searchParams.set('utm_medium', data.utmMedium);
          if (data.utmCampaign) parsed.searchParams.set('utm_campaign', data.utmCampaign);
          return parsed.toString();
        } catch (e) {
          return url;
        }
      }
      return url;

    case 'text':
      return data.text || '';

    case 'wifi':
      const ssid = (data.ssid || '').replace(/([\\;:,"])/g, '\\$1');
      const password = (data.password || '').replace(/([\\;:,"])/g, '\\$1');
      const auth = data.auth || 'WPA';
      const hidden = data.hidden ? 'H:true;' : '';
      if (auth === 'nopass') {
        return `WIFI:S:${ssid};T:nopass;${hidden};`;
      }
      return `WIFI:S:${ssid};T:${auth};P:${password};${hidden};`;

    case 'vcard':
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${data.lastName || ''};${data.firstName || ''};;;`,
        `FN:${data.firstName || ''} ${data.lastName || ''}`.trim(),
        data.org ? `ORG:${data.org}` : '',
        data.title ? `TITLE:${data.title}` : '',
        data.phone ? `TEL;TYPE=CELL:${data.phone}` : '',
        data.email ? `EMAIL:${data.email}` : '',
        data.website ? `URL:${data.website}` : '',
        data.address ? `ADR;TYPE=WORK:;;${data.address};;;;` : '',
        'END:VCARD'
      ].filter(Boolean).join('\n');

    case 'email':
      const emailTo = data.emailTo || '';
      const subject = encodeURIComponent(data.emailSubject || '');
      const body = encodeURIComponent(data.emailBody || '');
      return `mailto:${emailTo}?subject=${subject}&body=${body}`;

    case 'sms':
      const phone = data.smsPhone || '';
      const smsBody = encodeURIComponent(data.smsBody || '');
      return `sms:${phone}?body=${smsBody}`;

    case 'social':
      const platform = data.platform;
      const username = data.username || '';
      switch (platform) {
        case 'whatsapp':
          return `https://wa.me/${username.replace(/[^0-9]/g, '')}`;
        case 'instagram':
          return `https://instagram.com/${username.replace('@', '')}`;
        case 'twitter':
          return `https://x.com/${username.replace('@', '')}`;
        case 'linkedin':
          return `https://linkedin.com/in/${username}`;
        case 'youtube':
          return `https://youtube.com/@${username.replace('@', '')}`;
        case 'crypto_btc':
          return `bitcoin:${username}`;
        case 'crypto_eth':
          return `ethereum:${username}`;
        default:
          return username;
      }

    default:
      return data.text || data.url || 'https://github.com';
  }
}
