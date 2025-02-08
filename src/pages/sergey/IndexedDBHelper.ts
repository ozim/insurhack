export class IndexedDBHelper {
    private db: IDBDatabase | null = null;
    private dbName: string = 'myLocalDB';
    private storeName: string = 'dataStore';
  
    constructor() {
      this.openDatabase();
    }
  
    // Open or create the IndexedDB database
    private async openDatabase(): Promise<void> {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
  
        request.onerror = (event) => {
          reject('Database error: ' + event.target);
        };
  
        request.onsuccess = (event) => {
          this.db = (event.target as IDBRequest).result;
          resolve();
        };
  
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBRequest).result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            const objectStore = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
      });
    }
  
    // Store data into IndexedDB
    public async storeData(data: { name: string; value: string; timestamp: string }): Promise<void> {
      if (!this.db) {
        await this.openDatabase();
      }
  
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
  
        const request = store.add(data);
  
        request.onsuccess = () => {
          resolve();
        };
  
        request.onerror = (event) => {
          reject('Error storing data: ' + event.target);
        };
      });
    }
  
    // Fetch all data from IndexedDB
    public async fetchData(): Promise<any[]> {
      if (!this.db) {
        await this.openDatabase();
      }
  
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
  
        const request = store.getAll();
  
        request.onsuccess = (event) => {
          resolve((event.target as IDBRequest).result);
        };
  
        request.onerror = (event) => {
          reject('Error fetching data: ' + event.target);
        };
      });
    }
  
    // Update data in IndexedDB
    public async updateData(id: number, updatedData: { name?: string; value?: string }): Promise<void> {
      if (!this.db) {
        await this.openDatabase();
      }
  
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
  
        const getRequest = store.get(id);
  
        getRequest.onsuccess = (event) => {
          const data = (event.target as IDBRequest).result;
          if (data) {
            Object.assign(data, updatedData);
            const updateRequest = store.put(data);
  
            updateRequest.onsuccess = () => {
              resolve();
            };
          } else {
            reject('Data not found with ID: ' + id);
          }
        };
  
        getRequest.onerror = (event) => {
          reject('Error fetching data for update: ' + event.target);
        };
      });
    }
  
    // Delete data from IndexedDB
    public async deleteData(id: number): Promise<void> {
      if (!this.db) {
        await this.openDatabase();
      }
  
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
  
        const request = store.delete(id);
  
        request.onsuccess = () => {
          resolve();
        };
  
        request.onerror = (event) => {
          reject('Error deleting data: ' + event.target);
        };
      });
    }
  }