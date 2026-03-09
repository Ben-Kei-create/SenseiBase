import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function logout() {
  "use server";

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-2xl rounded-2xl border border-[#e5e5e5] p-7 sm:p-10">
        <p className="text-xs font-bold tracking-[0.16em] text-[#666666] uppercase">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0a0a0a]">
          ようこそ、SenseiBase へ！
        </h1>
        <p className="mt-6 text-sm font-semibold text-[#666666]">ログイン中のメール</p>
        <p className="mt-1 text-lg font-bold text-[#0a0a0a]">{user.email}</p>

        <form action={logout} className="mt-10">
          <button
            type="submit"
            className="rounded-full border border-[#0a0a0a] px-6 py-3 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-white"
          >
            ログアウト
          </button>
        </form>
      </div>
    </main>
  );
}
