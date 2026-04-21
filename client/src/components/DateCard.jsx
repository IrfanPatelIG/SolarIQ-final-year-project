const DateCard = ({ startDate, setStartDate, endDate, minStartDate }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl">
      
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Analysis Period
      </h3>

      {/* Start Date */}
      <input
        type="date"
        value={startDate}
        min={minStartDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-lg mb-3 outline-none transition"
      />

      {/* End Date (Auto Calculated) */}
      <input
        type="date"
        value={endDate}
        disabled
        className="w-full bg-gray-100 border border-gray-200 p-3 rounded-lg text-gray-500 cursor-not-allowed"
      />

      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-2">
        End date is automatically calculated (7-day range)
      </p>

    </div>
  );
};

export default DateCard;