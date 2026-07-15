export function Input({ className = "", ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#8CB7A9] focus:ring-2 focus:ring-[#8CB7A9]/30 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}