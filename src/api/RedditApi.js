import { get } from 'axios';

const BASE_URL = 'https://www.reddit.com';

export const getTopPosts = lastId => {
  return get(`${BASE_URL}/r/all/top.json`, lastId ? {
    params: {
      after: `t3_${lastId}`
    }
  } : {}).then(response => response.data);
} 