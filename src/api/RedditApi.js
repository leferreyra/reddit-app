import { get } from 'axios';

const BASE_URL = 'https://www.reddit.com';

export const getTopPosts = () => get(`${BASE_URL}/r/all/top.json`)
  .then(response => response.data);