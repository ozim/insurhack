// Interface for file structure
export interface StoredFile {
  id?: number;
  name: string;
  content: string | Blob;
  timestamp: Date;
}

export class FileStorage {

  // Save a file
  public async saveFile(fileName: string, content: string | Blob) {
    console.log("saveFile", fileName, content);
    // pwd service worker
  }

  // Retrieve a file by name
  public async getFile(fileName: string) {
    console.log("getFile", fileName);
    // pwd service worker
  }
}

export default FileStorage;
