import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

const getStringField = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

async function loginTeacher(formData: FormData) {
  "use server";

  const email = getStringField(formData.get("email")).toLowerCase();
  const password = getStringField(formData.get("password"));

  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent(
        "メールアドレスとパスワードを入力してください。",
      )}`,
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(
        "ログインに失敗しました。入力情報をご確認ください。",
      )}`,
    );
  }

  redirect("/dashboard");
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#e5e5e5] p-7 sm:p-8">
        <p className="text-xs font-bold tracking-[0.16em] text-[#666666] uppercase">
          Teacher Login
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0a0a0a]">
          ログイン
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#666666]">
          登録した先生アカウントでSenseiBaseにログインします。
        </p>

        {params.message ? (
          <p className="mt-5 rounded-lg border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-sm text-[#666666]">
            {params.message}
          </p>
        ) : null}

        {params.error ? (
          <p className="mt-5 rounded-lg border border-[#0a0a0a] bg-[#fafafa] px-4 py-3 text-sm text-[#0a0a0a]">
            {params.error}
          </p>
        ) : null}

        <form action={loginTeacher} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#0a0a0a]">
              メールアドレス
            </span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-[#d4d4d4] px-4 py-3 text-sm text-[#0a0a0a] outline-none transition-colors focus:border-[#0a0a0a]"
              placeholder="teacher@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#0a0a0a]">
              パスワード
            </span>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-[#d4d4d4] px-4 py-3 text-sm text-[#0a0a0a] outline-none transition-colors focus:border-[#0a0a0a]"
              placeholder="パスワードを入力"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#0a0a0a] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2a2a2a]"
          >
            ログインする
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#666666]">
          はじめて利用しますか？{" "}
          <Link href="/signup" className="font-semibold text-[#0a0a0a] underline">
            先生アカウント登録
          </Link>
        </p>
      </div>
    </main>
  );
}
