import { Calendar } from 'lucide-react';

const DateCard = ({
  startDate,
  setStartDate,
  endDate,
  minStartDate,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <Calendar className="text-green-600 dark:text-green-400" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Analysis Period (7 days)</h3>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">Start Date</label>
          <input
            type="date"
            value={startDate}
            min={minStartDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">End Date (auto-calculated)</label>
          <input
            type="date"
            value={endDate}
            readOnly
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-500 dark:text-slate-400 cursor-not-allowed"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            The analysis window is fixed to 7 days (start date + 6 days).
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateCard;