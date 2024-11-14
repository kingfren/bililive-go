/*
 * @Author: Jmeow
 * @Date: 2020-01-28 15:30:50
 * @Description: common API
 */

import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
