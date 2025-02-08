import { DataService } from "./DataService"

export const Sergey = () => {
  var dataService = new DataService("http://localhost:8000");
  dataService.loadDataAndSaveToDB();
  dataService.getData().then(data => console.log(data));
  return (
    <div>
      {
        dataService.getData()
      }
    </div>
  );
}
