export const formatDateKey = (value) => {
  return new Date(value).toLocaleDateString("en-CA");
};

export const isValidDateValue = (value) => {
  return !Number.isNaN(new Date(value).getTime());
};

export const isValidDateRange = (startDate, endDate) => {
  return (
    isValidDateValue(startDate) &&
    isValidDateValue(endDate) &&
    new Date(startDate) <= new Date(endDate)
  );
};

export const isValidDateRangeWithin5Days = (startDate, endDate) => {
  if (!isValidDateRange(startDate, endDate)) {
    return false;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  
  // Reset all dates to midnight for comparison
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Calculate difference in days
  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end

  // Check if range is within 5 days
  if (diffDays > 5) {
    return false;
  }

  // Check if the range includes today or is in the past
  if (end < today) {
    return false;
  }

  return true;
};

export const getInclusiveDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Set start to beginning of the day (00:00:00.000)
  start.setHours(0, 0, 0, 0);
  
  // Set end to end of the day (23:59:59.999)
  end.setHours(23, 59, 59, 999);

  return { start, end };
};
