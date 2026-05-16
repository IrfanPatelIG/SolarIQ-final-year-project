import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const SetupSection = () => {
  const { isAuthenticated } = useAuth();
  const cta = isAuthenticated
    ? { label: 'Continue Setup', to: '/onboarding' }
    : { label: 'Create Account to Start', to: '/auth' };

  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Ready to Start?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
          Set up your solar system configuration and get accurate energy predictions powered by AI.
        </p>
        <Link
          to={cta.to}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all"
        >
          {cta.label}
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default SetupSection;
