import axios from "axios";

const getData = async () => {
  try {
    const response = await axios.get('http://localhost:8000');
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// getData().then(data => console.log(data)).catch(error => console.error("Error in getData:", error));
