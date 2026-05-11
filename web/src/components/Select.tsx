type SelectProps = {
  value: string | number;
  options: Array<string | number>;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function Select({ value, options, placeholder, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "0.5rem",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        color: "black",
        backgroundColor: "white",
        width: "20%",
      }}
    >
      {placeholder && <option value=""> {placeholder} </option>}

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
