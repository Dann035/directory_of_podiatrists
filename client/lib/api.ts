export function getApiBase() {
  return (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
}

export async function apiFetch(path: string, opts?: RequestInit) {
  const base = getApiBase();
  const url = base ? `${base}${path.startsWith("/") ? "" : "/"}${path}` : path;
  const res = await fetch(url, { ...opts });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
