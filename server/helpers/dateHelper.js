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

export const getInclusiveDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  end.setHours(23, 59, 59, 999);

  return { start, end };
};
