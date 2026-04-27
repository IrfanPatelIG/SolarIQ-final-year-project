export const formatDate = (value) => {
  return new Date(value).toLocaleDateString("en-CA");
};

export const getTargetDate = (startDate) => {
  return startDate
    ? formatDate(startDate)
    : formatDate(new Date());
};

export const getSelectedDayEnergy = (forecasts, startDate) => {
  if (!forecasts?.length) {
    return {
      date: null,
      energy: 0,
      source: "no-data",
    };
  }

  const targetDate = getTargetDate(startDate);

  // Exact Match
  const exact = forecasts.find(
    (item) => formatDate(item.forecast_date) === targetDate
  );

  if (exact) {
    return {
      date: targetDate,
      energy: Number(exact.predicted_energy_kwh.toFixed(2)),
      source: "exact",
    };
  }

  // Future nearest match
  const future = forecasts.find(
    (item) => formatDate(item.forecast_date) > targetDate
  );

  if (future) {
    return {
      date: formatDate(future.forecast_date),
      energy: Number(future.predicted_energy_kwh.toFixed(2)),
      source: "nearest",
    };
  }

  // Last available
  const last = forecasts[forecasts.length - 1];

  return {
    date: formatDate(last.forecast_date),
    energy: Number(last.predicted_energy_kwh.toFixed(2)),
    source: "last-available",
  };
};