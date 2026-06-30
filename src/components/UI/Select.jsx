export default function Select({
  label,
  children,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block font-semibold mb-2">
          {label}
        </label>
      )}

      <select
        {...props}
        className="w-full border rounded-lg p-3"
      >
        {children}
      </select>
    </div>
  );
}