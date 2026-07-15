export function Label({ children, className = "", ...props }) {
  return (
    <label
      className={`text-sm font-medium text-[#162427] ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}