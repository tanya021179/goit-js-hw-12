import axios from 'axios';

const API_KEY = '47379465-d19c322484d0cfa984d66258f';

export const searchParams = async (query, page = 1) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 150,
  });

  try {
    const response = await axios(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
