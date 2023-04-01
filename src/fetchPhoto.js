
import axios from 'axios';


export async function fetchPhoto({ name, page }) {
    const URL = `https://pixabay.com/api/?key=34953868-e619b94b5038a72e794119bd3&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&${page}&per_page=40`;
  try {
    const response = await axios.get(URL);
      
    return response;  
  } catch (error) {
    console.log(error)
    }
  
  }     
 