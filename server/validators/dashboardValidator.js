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

  if (!startDate || !endDate) {
    return "startDate and endDate required";
  }

  if (!isValidDateRange(startDate, endDate)) {
    return "startDate cannot be after endDate";
  }

  if (!userId) {
    return "User not authenticated";
  }

  return null;
};
