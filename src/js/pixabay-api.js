import axios from 'axios';

export const fetchPhotoByQuery = (searchedQuery, currentPage) => {
  const axiosOptions = {
    params: {
      key: '46917062-2aeb1fc3b978e5a238a42f10e',
      q: searchedQuery,
      page: currentPage,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  return axios.get(`https://pixabay.com/api/`, axiosOptions);
};
