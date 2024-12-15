import axios from 'axios';

export async function fetchNews(query, currentPage) {
  const BASE_URL = 'https://newsapi.org/v2';
  const END_POINT = '/everything';
  const API_KEY = '81088765cb514a5b98c190ea1c6dabf9';

  const url = `${BASE_URL}${END_POINT}`;
  const params = {
    q: query,
    apiKey: API_KEY,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 10,
    page: currentPage,
  };

  const resp = await axios.get(url, { params });
  return resp.data;
}
