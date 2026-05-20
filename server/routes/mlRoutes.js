import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/predict", async (req, res) => {

    try {

        const response = await axios.post(
            "http://localhost:8000/predict",
            req.body
        );

        res.json(response.data);

    } catch (error) {

        console.error("ML Prediction Error:", error.message);

        res.status(500).json({
            error: error.message
        });

    }

});

export default router;