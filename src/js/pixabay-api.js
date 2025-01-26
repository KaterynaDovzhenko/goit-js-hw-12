import axios from 'axios';

export const fetchPhotoByQuery = searchedQuery => {
  return axios.get(
    `https://pixabay.com/api/?key=46917062-2aeb1fc3b978e5a238a42f10e&q=${searchedQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  );

  // return fetch(
  //   `https://pixabay.com/api/?key=46917062-2aeb1fc3b978e5a238a42f10e&q=${searchedQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  // ).then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // });
};
