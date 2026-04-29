import { isValidDateRange } from "../helpers/dateHelper.js";

export const validateAnalyticsRequest = ({ userId, startDate, endDate }) => {
  if (!userId) {
    return "User not authenticated";
  }

  if (!startDate || !endDate) {
    return "startDate and endDate required";
  }

  if (!isValidDateRange(startDate, endDate)) {
    return "Invalid date range";
  }

  return null;
};
