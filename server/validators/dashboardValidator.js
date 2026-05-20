import { isValidDateRange } from "../helpers/dateHelper.js";

export const validateDashboardRequest = ({
  panelId,
  startDate,
  endDate,
  userId,
}) => {
  if (!panelId || Number.isNaN(Number(panelId))) {
    return "Invalid panelId";
  }

  if (!userId) {
    return "User not authenticated";
  }

  // If startDate or endDate is not provided, we'll fetch available dates from database
  if (startDate && endDate) {
    if (!isValidDateRange(startDate, endDate)) {
      return "startDate cannot be after endDate";
    }
  }

  return null;
};
