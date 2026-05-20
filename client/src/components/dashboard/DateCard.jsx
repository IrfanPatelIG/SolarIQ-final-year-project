import { Calendar } from 'lucide-react';

const DateCard = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // Auto-select end date to start date + 5 days
    if (newStartDate) {
      const start = new Date(newStartDate);
      const end = new Date(start);
      end.setDate(end.getDate() + 5);
      const newEndDate = end.toISOString().slice(0, 10);
      setEndDate(newEndDate);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <Calendar className="text-purple-600 dark:text-purple-400" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Date Range</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>
    </div>
  );
};

export default DateCard;
