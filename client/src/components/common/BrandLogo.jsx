import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';

const BrandLogo = ({ compact = false, subtitle = null, className = '' }) => {
  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-sm transition-all group-hover:shadow-lg group-hover:shadow-blue-500/25 group-hover:-translate-y-0.5">
        <Sun className="text-white" size={20} />
      </div>
      {!compact && (
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-blue-100 transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-200">
            SolarIQ
          </h1>
          {subtitle && (
            <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </Link>
  );
};

export default BrandLogo;
