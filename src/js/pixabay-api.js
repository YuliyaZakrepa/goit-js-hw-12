import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  const API_KEY = '55684410-10358821b17bf14561ffe1031';
  const per_page = 15;
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };
  const { data } = await axios('https://pixabay.com/api/', { params });
  return data;
}
