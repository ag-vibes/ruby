import { emptyData, normalizeData, type AppData } from "./domain";
const DB = "ruby";
const STORE = "state";
const KEY = "app";

const open = () => new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open(DB, 1);
  request.onupgradeneeded = () => request.result.createObjectStore(STORE);
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export class IndexedDbStorage {
  async load() {
    if (!globalThis.indexedDB) return emptyData();
    const db = await open();
    return new Promise<AppData>((resolve, reject) => {
      const request = db.transaction(STORE).objectStore(STORE).get(KEY);
      request.onsuccess = () => resolve(normalizeData(request.result ?? emptyData()));
      request.onerror = () => reject(request.error);
    });
  }
  async save(data: AppData) {
    if (!globalThis.indexedDB) return;
    const db = await open();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE, "readwrite");
      transaction.objectStore(STORE).put(data, KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}
