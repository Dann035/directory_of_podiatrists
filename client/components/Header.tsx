import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Link href="/" className="text-lg font-bold">Directorio Podólogos</Link>
        <nav className="flex gap-4">
          <Link href="/search" className="text-sm text-zinc-700 hover:underline">Buscar</Link>
        </nav>
      </div>
    </header>
  );
}
