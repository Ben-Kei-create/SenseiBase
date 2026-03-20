import Link from "next/link";

const sellItems = [
  {
    title: "単体ワークシート",
    priceRange: "¥100 - ¥300",
    description:
      "授業の導入や復習で使える1枚教材を販売。ダウンロードしやすく、初回購入につながりやすい形式です。",
  },
  {
    title: "バンドル教材セット",
    priceRange: "¥500 - ¥1,500",
    description:
      "定期テスト対策や単元別演習をまとめて提供。シリーズ化しやすく、継続購入を狙える商品タイプです。",
  },
  {
    title: "授業ノウハウ文書",
    priceRange: "¥300 - ¥1,200",
    description:
      "指導法、学級経営、評価設計などの実践知をテキストで販売。note感覚で先生の知見を資産化できます。",
  },
];

const earnings = [
  {
    material: "中学数学ワークシート",
    unitPrice: 300,
    monthlySales: 40,
    note: "毎週1本の新作を投稿",
  },
  {
    material: "定期テスト対策バンドル",
    unitPrice: 1200,
    monthlySales: 10,
    note: "教科横断セットとして販売",
  },
  {
    material: "授業改善ノウハウ文書",
    unitPrice: 600,
    monthlySales: 10,
    note: "実践テンプレート付き",
  },
];

const yen = (value: number) => `¥${new Intl.NumberFormat("ja-JP").format(value)}`;

export default function Home() {
  const gross = earnings.reduce(
    (total, item) => total + item.unitPrice * item.monthlySales,
    0,
  );
  const freePlanTakeHome = Math.floor(gross * 0.6);
  const premiumTakeHome = Math.floor(gross * 0.85);

  return (
    <>
      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24">
          <p className="text-xs font-bold tracking-[0.24em] text-[#666666] uppercase">
            Japanese Teachers Marketplace
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            教材をつくる先生の知見を、
            <br />
            そのまま収入に変える。
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#666666] sm:text-lg">
            SenseiBaseは、塾講師・学校教員・家庭教師のための教材マーケットです。ワークシート、授業計画、指導ノウハウを出品し、全国の学び手へ届けられます。
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center rounded-full bg-[#0a0a0a] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2a2a2a] sm:text-base"
            >
              無料で先生アカウントを作成
            </Link>
            <Link
              href="/materials"
              className="inline-flex items-center rounded-full border border-[#0a0a0a] px-7 py-3 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-white sm:text-base"
            >
              教材を探す
            </Link>
          </div>
        </section>

        <section className="border-y border-[#e5e5e5] bg-[#fafafa]">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              What You Can Sell
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#666666] sm:text-base">
              先生としての実務に直結した教材を、単体でもセットでも販売できます。無料配布でフォロワーを増やし、有料商品へつなげる運用も可能です。
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {sellItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#e5e5e5] bg-white p-6"
                >
                  <p className="text-xs font-bold tracking-[0.16em] text-[#666666] uppercase">
                    {item.priceRange}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#666666]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            月30,000円を目指す販売モデル
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#666666] sm:text-base">
            3種類の商品を組み合わせると、教務の延長線上で現実的な副収入を設計できます。以下は1か月の販売例です。
          </p>

          <div className="mt-8 rounded-2xl border border-[#e5e5e5]">
            <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] border-b border-[#e5e5e5] bg-[#fafafa] px-5 py-3 text-xs font-bold tracking-[0.12em] text-[#666666] uppercase sm:grid">
              <p>商品</p>
              <p>単価</p>
              <p>販売数</p>
              <p>月間売上</p>
            </div>
            <ul>
              {earnings.map((item) => {
                const subtotal = item.unitPrice * item.monthlySales;
                return (
                  <li
                    key={item.material}
                    className="grid gap-2 border-b border-[#e5e5e5] px-5 py-5 text-sm last:border-b-0 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center sm:gap-4"
                  >
                    <div>
                      <p className="font-bold">{item.material}</p>
                      <p className="text-xs text-[#666666]">{item.note}</p>
                    </div>
                    <p className="text-[#666666] sm:text-[#0a0a0a]">
                      単価 {yen(item.unitPrice)}
                    </p>
                    <p className="text-[#666666] sm:text-[#0a0a0a]">
                      {item.monthlySales}件
                    </p>
                    <p className="font-bold">{yen(subtotal)}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-[#0a0a0a] bg-[#0a0a0a] p-6 text-white">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-white/70">
              Monthly Goal
            </p>
            <p className="mt-2 text-3xl font-black tracking-tight">{yen(gross)}</p>
            <p className="mt-4 text-sm text-white/80">
              フリープラン受取目安: {yen(freePlanTakeHome)} / プレミアム受取目安:{" "}
              {yen(premiumTakeHome)}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e5e5e5]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-[#666666] sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} SenseiBase</p>
          <p>先生の教材知見を、次の学びへ。</p>
        </div>
      </footer>
    </>
  );
}
