"use client";
import React from "react";

type Props = { value: string; onChange: (v: string) => void };

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mt-4">
      <input
        aria-label="Buscar"
        placeholder="Ej. Juan Pérez, Madrid, uñas encarnadas"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}
"use client";
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div style={{ margin: "12px 0" }}>
      <input
        aria-label="Buscar podólogo"
        placeholder="Buscar por nombre, ciudad o especialidad"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: 8, width: "100%", borderRadius: 6, border: "1px solid #ddd" }}
      />
    </div>
  );
}
