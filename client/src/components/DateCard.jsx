const DateCard = ({
  startDate,
  setStartDate,
  endDate,
  minStartDate,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">
        Analysis Period (7 days)
      </h3>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            min={minStartDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">
            End Date (auto)
          </label>
          <input
            type="date"
            value={endDate}
            readOnly
            className="w-full bg-gray-700 rounded-lg p-2 text-gray-300 cursor-not-allowed"
          />
          <p className="text-xs text-gray-400 mt-1">
            The analysis window is fixed to 7 days (start date + 6 days).
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateCard;