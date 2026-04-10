const DateCard = ({ startDate, setStartDate, endDate, minStartDate }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">

      <h3 className="text-xl font-semibold mb-4">Analysis Period</h3>

      <input
        type="date"
        value={startDate}
        min={minStartDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full bg-white/10 p-3 rounded-lg mb-3"
      />

      <input
        type="date"
        value={endDate}
        disabled
        className="w-full bg-white/5 p-3 rounded-lg text-gray-400"
      />

    </div>
  );
};

export default DateCard;