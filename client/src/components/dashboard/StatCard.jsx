export default function StatCard({
  title,
  value,
  sub,
  variant = "default",
}) {
  const styles = {
    weather: {
      bg: "bg-yellow-200",
      text: "text-black",
      border: "border-yellow-200",
    },
    energy: {
      bg: "bg-green-200",
      text: "text-green-600",
      border: "border-green-200",
    },
    efficiency: {
      bg: "bg-blue-200",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    default: {
      bg: "bg-gray-50",
      text: "text-gray-600",
      border: "border-gray-200",
    },
  };

  const theme = styles[variant];

  return (
    <div
      className={`${theme.bg} ${theme.border} border rounded-2xl p-5 
                  shadow-sm hover:shadow-md hover:-translate-y-1 
                  transition-all duration-300`}
    >
      {/* Title */}
      <p className={`text-sm font-medium ${theme.text}`}>
        {title}
      </p>

      {/* Value */}
      <h2 className="text-2xl font-bold text-gray-900 mt-2">
        {value}
      </h2>

      {/* Sub */}
      <p className="text-sm text-black mt-1">
        {sub}
      </p>
    </div>
  );
}