const STORAGE_KEY = 'wyt_qr_history_v1';

export class HistoryManager {
  constructor() {
    this.history = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load history:', e);
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
    } catch (e) {
      console.error('Failed to save history:', e);
    }
  }

  addItem(item) {
    // item: { id, title, type, data, config, previewDataUrl, timestamp }
    const newItem = {
      id: Date.now().toString(),
      title: item.title || item.type.toUpperCase() + ' QR Code',
      type: item.type,
      data: item.data,
      config: item.config,
      previewDataUrl: item.previewDataUrl,
      timestamp: new Date().toISOString()
    };

    // Remove duplicates with exact same data & config if recent
    this.history = this.history.filter(existing => existing.data !== newItem.data || existing.type !== newItem.type);
    
    this.history.unshift(newItem);
    if (this.history.length > 25) {
      this.history = this.history.slice(0, 25);
    }

    this.save();
    return newItem;
  }

  removeItem(id) {
    this.history = this.history.filter(item => item.id !== id);
    this.save();
  }

  clear() {
    this.history = [];
    this.save();
  }

  getItems() {
    return this.history;
  }
}
