const axios = require('axios');

const baseUrl = 'https://express-training.herokuapp.com/api';

const callApi = async (methodType, url, traineeData) => {
  try {
     const response = await axios({
      method: methodType,
      url: `${baseUrl}${url}`,
      data: traineeData,
      headers: { Authorization: localStorage.getItem('token') },
      });
    return response;
  } catch (error) {
    return error.message;
  }
};

export default callApi;
