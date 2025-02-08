// Interface for file structure
export interface StoredFile {
  id?: number;
  name: string;
  content: string | Blob;
  timestamp: Date;
}

export class FileStorage {
  dbName: string = "PolicyDatabase";
  storeName: string = "PolicyStore";
  // Save a file
  public async saveFile(documentId: string, content: string | Blob) {
    console.log("saveFile", documentId, content);
    // pwd service worker
    var indexedDB = window.indexedDB;
    // Open (or create) the database
    var open = indexedDB.open(this.dbName, 1);
    // Create the schema
    var storeName = this.storeName;
    open.onupgradeneeded = function() {
        var db = open.result;
        db.createObjectStore(storeName, {keyPath: "id"});
    };
    
    open.onsuccess = function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction(storeName, "readwrite");
        var store = tx.objectStore(storeName);
    
        // Add some data
        store.put({id: documentId, documentData: content})
    
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    }
  }

  // Retrieve a file by name
  public async getFile(documentId: string, onSuccess: any) {
    console.log("getFile", documentId);
    // pwd service worker
    var indexedDB = window.indexedDB;
    // Open (or create) the database
    var open = indexedDB.open(this.dbName, 1);
    // Create the schema
    var storeName = this.storeName;
    open.onupgradeneeded = function() {
        var db = open.result;
        db.createObjectStore(storeName, {keyPath: "id"});
    };
    
    open.onsuccess = function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction(storeName, "readwrite");
        var store = tx.objectStore(storeName);
    
        var getDocumentData = store.get(documentId);
        // Close the db when the transaction is done

        getDocumentData.onsuccess = onSuccess;

        tx.oncomplete = function() {
            db.close();
        };
    }
  }
}

export default FileStorage;
