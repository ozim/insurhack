import { IndexedDBHelper } from './IndexedDBHelper';
import { FileStorage } from './FIleStorage';

class DataService {
    private apiUrl: string;
    private dbHelper: IndexedDBHelper;
    private fileStorage: FileStorage;
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
      this.dbHelper = new IndexedDBHelper();
      this.fileStorage = new FileStorage();
    }
  
    // Fetch data from the API
    private async fetchDataFromApi(): Promise<any[]> {
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
    private mapData(apiData: any[]): any[] {
      return apiData.map(item => ({
        name: item.name,             // Assuming 'name' exists in API response
        value: item.value,           // Assuming 'value' exists in API response
        timestamp: new Date().toISOString() // Adding timestamp for when the data is saved
      }));
    }
  
    // Save the mapped data into IndexedDB
    private async saveDataToDB(mappedData: any[]): Promise<void> {
      try {
        for (const data of mappedData) {
          await this.dbHelper.storeData(data); // Save each mapped data item into IndexedDB
        }
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
  
        console.log('Process completed: Data loaded and saved to IndexedDB');
      } catch (error) {
        console.error('Error during the process of loading and saving data:', error);
      }
    }
  }
  
  // Example usage:
  // Create an instance of the DataService with the API URL
  const dataService = new DataService('http://localhost:8000'); // Replace with your API URL
  
  // Call the method to load data and save to IndexedDB
  dataService.loadDataAndSaveToDB().catch(error => {
    console.error('Error during data load/save:', error);
  });
  