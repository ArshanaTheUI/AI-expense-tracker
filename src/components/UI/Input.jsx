export default function Input({
  label,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block font-semibold mb-2">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}