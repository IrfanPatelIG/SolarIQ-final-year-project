const axios = require("axios");

const predictSolarEnergy = async (inputData) => {

    const response = await axios.post(
        "http://localhost:8000/predict",
        inputData
    );

    return response.data;
};

module.exports = {
    predictSolarEnergy
};