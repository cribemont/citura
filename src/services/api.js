import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://formulaire.citura.fr/api',
    timeout: 20000,
    headers: {
        "Content-type": "application/json"
      }
    }
);

export default apiClient;