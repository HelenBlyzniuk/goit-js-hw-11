
export function fetchPhoto(name) {
    const URL = `https://pixabay.com/api/&key=34953868-e619b94b5038a72e794119bd3&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=30`;
      return fetch(URL).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
    }
            return response.json()
        })
  }     
 