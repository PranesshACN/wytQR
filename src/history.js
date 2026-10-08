const STORAGE_BASE_KEY = 'wyt_qr_history';

/**
 * Manages QR Code History with user-scoped isolation
 * Uses WytNet canonical user subject identifier: sub (format: wn_usr_<uuid>)
 */
export class HistoryManager {
  constructor(currentUserSub = null) {
    this.userSub = currentUserSub;
    this.history = this.load();
  }

  setUser(userSub) {
    this.userSub = userSub || null;
    this.history = this.load();
  }

  getStorageKey() {
    return this.userSub ? `${STORAGE_BASE_KEY}_${this.userSub}` : `${STORAGE_BASE_KEY}_guest`;
  }

  load() {
    try {
      const key = this.getStorageKey();
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load history:', e);
      return [];
    }
  }

  save() {
    try {
      const key = this.getStorageKey();
      localStorage.setItem(key, JSON.stringify(this.history));
    } catch (e) {
      console.error('Failed to save history:', e);
    }
  }

  addItem(item) {
    // item: { id, title, type, data, config, previewDataUrl, timestamp }
    const newItem = {
      id: Date.now().toString(),
      sub: this.userSub || 'anonymous', // Canonical WytNet subject identifier
      userId: this.userSub || 'anonymous',
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
    if (this.history.length > 30) {
      this.history = this.history.slice(0, 30);
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
