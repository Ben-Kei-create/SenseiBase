import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SignupPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const getStringField = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

async function signupTeacher(formData: FormData) {
  "use server";

  const email = getStringField(formData.get("email")).toLowerCase();
  const password = getStringField(formData.get("password"));

  if (!email || !password) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "メールアドレスとパスワードを入力してください。",
      )}`,
    );
  }

  if (password.length < 6) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "パスワードは6文字以上で入力してください。",
      )}`,
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "teacher",
      },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    redirect(
      `/login?message=${encodeURIComponent(
        "登録が完了しました。ログインして続行してください。",
      )}`,
    );
  }

  redirect("/dashboard");
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#e5e5e5] p-7 sm:p-8">
        <p className="text-xs font-bold tracking-[0.16em] text-[#666666] uppercase">
          Teacher Signup
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0a0a0a]">
          先生アカウント登録
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#666666]">
          SenseiBaseでは、教材販売は先生アカウントのみご利用いただけます。
        </p>

        {params.error ? (
          <p className="mt-5 rounded-lg border border-[#0a0a0a] bg-[#fafafa] px-4 py-3 text-sm text-[#0a0a0a]">
            {params.error}
          </p>
        ) : null}

        <form action={signupTeacher} className="mt-6 space-y-4">
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
              minLength={6}
              className="w-full rounded-xl border border-[#d4d4d4] px-4 py-3 text-sm text-[#0a0a0a] outline-none transition-colors focus:border-[#0a0a0a]"
              placeholder="6文字以上"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#0a0a0a] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2a2a2a]"
          >
            先生アカウントを作成
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#666666]">
          すでにアカウントをお持ちですか？{" "}
          <Link href="/login" className="font-semibold text-[#0a0a0a] underline">
            ログイン
          </Link>
        </p>
      </div>
    </main>
  );
}
