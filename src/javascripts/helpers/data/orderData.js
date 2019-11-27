import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getOrders = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders.json`)
    .then((response) => {
      const allOrders = response.data;
      const orders = [];
      Object.keys(allOrders).forEach((fbId) => {
        allOrders[fbId].id = fbId;
        orders.push(allOrders[fbId]);
      });
      resolve(orders);
    })
    .catch((err) => reject(err));
});

export default { getOrders };
