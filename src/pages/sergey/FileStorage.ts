import { indexedDB, IDBDatabase, IDBOpenDBRequest } from 'fake-indexeddb';

// Interface for file structure
interface StoredFile {
  id?: number;
  name: string;
  content: string | Blob;
  timestamp: Date;
}

export class FileStorage {
  private dbName: string;
  private db: IDBDatabase | null = null;

  constructor(dbName: string = 'FileDB') {
    this.dbName = dbName;
  }

  // Initialize IndexedDB
  public async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log(`Database "${this.dbName}" initialized.`);
        resolve();
      };

      request.onerror = () => {
        console.error('Database error:', request.error);
        reject(request.error);
      };
    });
  }

  // Save a file
  public async saveFile(fileName: string, content: string | Blob): Promise<void> {
    if (!this.db) throw new Error('Database is not initialized.');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');

      const fileData: StoredFile = {
        name: fileName,
        content: content,
        timestamp: new Date(),
      };

      const request = store.add(fileData);

      request.onsuccess = () => {
        console.log(`File "${fileName}" saved successfully.`);
        resolve();
      };

      request.onerror = () => {
        console.error('Error saving file:', request.error);
        reject(request.error);
      };
    });
  }

  // Retrieve a file by name
  public async getFile(fileName: string): Promise<StoredFile | null> {
    if (!this.db) throw new Error('Database is not initialized.');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');

      const request = store.openCursor();
      const matchingFiles: StoredFile[] = [];

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          if (cursor.value.name === fileName) {
            matchingFiles.push(cursor.value);
          }
          cursor.continue();
        } else {
          if (matchingFiles.length > 0) {
            console.log(`File "${fileName}" retrieved successfully.`);
            resolve(matchingFiles[0]);
          } else {
            console.warn(`File "${fileName}" not found.`);
            resolve(null);
          }
        }
      };

      request.onerror = () => {
        console.error('Error retrieving file:', request.error);
        reject(request.error);
      };
    });
  }
}

export default FileStorage;
