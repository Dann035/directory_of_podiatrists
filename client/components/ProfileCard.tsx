import React from "react";

export default function ProfileCard({ practitioner }: { practitioner: any }) {
  return (
    <article className="rounded-md border border-zinc-100 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{practitioner.nombre || practitioner.name}</h1>
      <p className="mt-2 text-sm text-zinc-600">{(practitioner.especialidades || practitioner.specialties || []).join?.(", ")}</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-medium text-zinc-500">Dirección</h3>
          <div className="text-sm">{practitioner.direccion || practitioner.address}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-zinc-500">Contacto</h3>
          <div className="text-sm">{practitioner.telefono || practitioner.phone} </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Reservar cita</button>
      </div>
    </article>
  );
}
import React from "react";

export default function ProfileCard({ practitioner }: { practitioner: any }) {
  return (
    <article style={{ border: "1px solid #e6e6e6", padding: 16, borderRadius: 8, maxWidth: 720 }}>
      <h2>{practitioner.nombre || practitioner.name}</h2>
      <div style={{ color: "#666" }}>{practitioner.especialidades?.join?.(", ") || practitioner.specialties}</div>
      <p style={{ marginTop: 12 }}>{practitioner.direccion || practitioner.address}</p>
      <p style={{ marginTop: 8 }}>
        <strong>Teléfono:</strong> {practitioner.telefono || practitioner.phone}
      </p>
    </article>
  );
}
