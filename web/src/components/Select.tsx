import { cores, raios } from "../utils/tema.util";

type SelectProps = {
  label?: string;
  value: string | number;
  options: Array<string | number>;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function Select({
  label,
  value,
  options,
  placeholder,
  onChange,
}: SelectProps) {
  const id = label
    ? `select-${label.replace(/\s+/g, "-").toLowerCase()}`
    : undefined;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        minWidth: "200px",
      }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: "0.85rem",
            fontWeight: 500,
            color: cores.textoSecundario,
          }}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: raios.controle,
          border: `1px solid ${cores.borda}`,
          fontSize: "14px",
          color: cores.textoPrincipal,
          backgroundColor: cores.fundoCard,
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
