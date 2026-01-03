"use client";
import Link from "next/link";
import React from "react";

export default function ResultsList({ loading, items }: { loading?: boolean; items: any[] }) {
  if (loading) return <div className="mt-4">Buscando…</div>;
  if (!items || items.length === 0) return <div className="mt-4 text-sm text-zinc-600">No se encontraron resultados.</div>;

  return (
    <ul className="mt-4 divide-y divide-zinc-100 rounded-md border border-zinc-100 bg-white">
      {items.map((it) => (
        <li key={it.id} className="p-4">
          <Link href={`/practitioners/${it.id}`} className="block">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{it.nombre || it.name}</div>
                <div className="text-xs text-zinc-500">{it.ciudad || it.city}</div>
              </div>
              <div className="text-xs text-zinc-500">{it.especialidades?.slice(0,2).join(", ") || it.specialties?.slice(0,2).join(", ")}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
"use client";
import React from "react";
import Link from "next/link";

export default function ResultsList({ loading, items }: { loading?: boolean; items: any[] }) {
  if (loading) return <div>Buscando...</div>;
  if (!items || items.length === 0) return <div>No se encontraron resultados.</div>;

  return (
    <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
      {items.map((it) => (
        <li key={it.id} style={{ padding: 12, borderBottom: "1px solid #eee" }}>
          <Link href={`/practitioners/${it.id}`}>
            <a style={{ textDecoration: "none", color: "inherit" }}>
              <strong>{it.nombre || it.name}</strong>
              <div style={{ fontSize: 13, color: "#555" }}>{it.ciudad || it.city}</div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
