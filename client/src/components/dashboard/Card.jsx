export default function Card({ title, children, variant = "default" }) {
  const styles = {
    solar: {
      header: "bg-yellow-100 text-yellow-900",
      border: "border-yellow-200",
    },
    energy: {
      header: "bg-green-100 text-green-900",
      border: "border-green-200",
    },
    system: {
      header: "bg-blue-100 text-blue-900",
      border: "border-blue-200",
    },
    default: {
      header: "bg-gray-100 text-gray-700",
      border: "border-gray-200",
    },
  };

  const theme = styles[variant];

  return (
    <div
      className={`bg-white ${theme.border} border rounded-2xl shadow-sm 
                  hover:shadow-md hover:-translate-y-[2px] 
                  transition-all duration-300 w-full overflow-hidden`}
    >
      {/* Header */}
      <div className={`px-5 py-3 ${theme.header} border-b`}>
        <h3 className="text-xl font-semibold text-black tracking-wide uppercase">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}