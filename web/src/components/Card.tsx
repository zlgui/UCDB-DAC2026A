import type { ReactNode, CSSProperties } from "react";
import { cores, sombras, raios, espacamentos } from "../utils/tema.util";

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

export function Card({ children, style }: Props) {
  return (
    <div
      style={{
        backgroundColor: cores.fundoCard,
        borderRadius: raios.card,
        padding: espacamentos.grande,
        boxShadow: sombras.card,
        border: `1px solid ${cores.bordaSuave}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
