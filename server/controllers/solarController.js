import { calculateSolar } from "../services/solarService.js";

export const getSolarData = async (req, res) => {
  try {
    const { location, panel, dates } = req.body;

    console.log("RAW DATA:", JSON.stringify(req.body, null, 2));

    // Validation
    if (!location || !panel || !dates) {
      return res.status(400).json({
        success: false,
        message: "Missing required data",
      });
    }

    const result = await calculateSolar({ location, panel, dates });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};