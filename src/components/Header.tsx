import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[#e5e5e5] bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="text-2xl font-black tracking-tight text-[#0a0a0a]">
          <span className="border-b-[3px] border-[#0a0a0a] pb-0.5">Sensei</span>
          Base
        </Link>

        <nav className="flex items-center gap-2 text-sm font-semibold text-[#666666] sm:gap-3">
          <Link href="/materials" className="transition-colors hover:text-[#0a0a0a]">
            教材を探す
          </Link>
          <span aria-hidden="true">|</span>
          <Link href="/login" className="transition-colors hover:text-[#0a0a0a]">
            ログイン
          </Link>
          <span aria-hidden="true">|</span>
          <Link href="/signup" className="transition-colors hover:text-[#0a0a0a]">
            新規登録
          </Link>
        </nav>
      </div>
    </header>
  );
}
