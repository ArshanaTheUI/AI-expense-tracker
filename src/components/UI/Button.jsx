export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
}) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    success:
      "bg-green-600 hover:bg-green-700 text-white",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
    secondary:
      "bg-gray-300 hover:bg-gray-400 text-black",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-3 rounded-lg font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}