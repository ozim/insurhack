import { IndexedDBHelper } from './IndexedDBHelper';
import { FileStorage } from './FileStorage';
import { StoredFile } from './FileStorage';

export class DataService {
    private apiUrl: string;
    private dbHelper: IndexedDBHelper;
    private fileStorage: FileStorage;
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
      this.dbHelper = new IndexedDBHelper();
      this.fileStorage = new FileStorage();
    }
  
    // Fetch data from the API
    private async fetchDataFromApi(): Promise<any> {
      try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
      }
    }
  
    // Map the API response to the desired structure
    private mapData(apiData: any): any {
      return {
        insurerBrandName: apiData.insurerBrandName,
        insurancePeriodValidFromDate: apiData.insurancePeriodValidFromDate,
        insurancePeriodValidToDate: apiData.insurancePeriodValidToDate,
        documentList: apiData.documentList.map((document: any) => ({
          documentId: document.documentId,
          type: document.type,
          fileName: document.fileName,
          description: document.description,
        })),
        premiumInstallmentList: apiData.premiumInstallmentList.map((premiumInstallment: any) => ({
            installmentId: premiumInstallment.installmentId,
            policyId: premiumInstallment.policyId,
            value: premiumInstallment.value,
            currency: premiumInstallment.currency,
            installmentNo: premiumInstallment.installmentNo,
            dueDate: premiumInstallment.dueDate
        }))
      }
    }
  
    // Save the mapped data into IndexedDB
    private async saveDataToDB(mappedData: any): Promise<void> {
      try {
        await this.dbHelper.storeData(mappedData);
        console.log('Data saved successfully to IndexedDB');
      } catch (error) {
        console.error('Error saving data to IndexedDB:', error);
        throw error;
      }
    }
  
    // Full process: Fetch, map, and save data to IndexedDB
    public async loadDataAndSaveToDB(): Promise<void> {
      try {
        // Fetch data from API
        const apiData = await this.fetchDataFromApi();
  
        // Map the API data to match the IndexedDB structure
        const mappedData = this.mapData(apiData);
  
        // Save the mapped data to IndexedDB
        await this.saveDataToDB(mappedData);

        apiData.documentList.forEach((document: any) => {
            this.fileStorage.saveFile(document.documentId, document.documentData);
          });
  
        console.log('Process completed: Data loaded and saved to IndexedDB');
      } catch (error) {
        console.error('Error during the process of loading and saving data:', error);
      }
    }

    public async getData(): Promise<any> {
      try {
        const data = await this.dbHelper.fetchData();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }

    public async getFile(fileName: string): Promise<StoredFile | null> {
      try {
        const file = await this.fileStorage.getFile(fileName);
        return file;
      } catch (error) {
        console.error('Error retrieving file:', error);
        return null;
      }
    }
  }