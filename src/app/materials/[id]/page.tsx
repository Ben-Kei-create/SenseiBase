import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatMaterialPrice,
  getMaterialById,
  getOtherMaterialsByTeacher,
} from "@/lib/mock/materials";

type MaterialDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MaterialDetailPage({ params }: MaterialDetailPageProps) {
  const { id } = await params;
  const material = getMaterialById(id);

  if (!material) {
    notFound();
  }

  const otherMaterials = getOtherMaterialsByTeacher(material.teacherId, material.id);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <div className="aspect-[16/9] rounded-2xl border border-[#e5e5e5] bg-[#f3f3f3]">
            <div className="flex h-full items-center justify-center text-xs font-bold tracking-[0.16em] text-[#666666] uppercase">
              {material.hasThumbnail ? "Material Preview" : "No Preview"}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#d4d4d4] px-3 py-1 text-xs font-bold text-[#666666]">
                {material.subjectTag}
              </span>
              <span className="text-sm text-[#666666]">♡ {material.likeCount}</span>
              <span className="text-sm text-[#666666]">
                ★ {material.rating.toFixed(1)} ({material.reviewCount}件)
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              {material.title}
            </h1>
            <p className="mt-5 whitespace-pre-line text-sm leading-8 text-[#666666] sm:text-base">
              {material.description}
            </p>
          </div>

          <section className="mt-8 rounded-2xl border border-[#e5e5e5] p-5">
            <h2 className="text-xl font-black tracking-tight">先生情報</h2>
            <div className="mt-4 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4d4d4] bg-[#fafafa] text-xs font-bold text-[#666666]">
                先生
              </div>
              <div>
                <p className="text-lg font-bold text-[#0a0a0a]">{material.teacherName}</p>
                <p className="mt-1 text-sm leading-7 text-[#666666]">{material.teacherBio}</p>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[#e5e5e5] p-5">
            <h2 className="text-xl font-black tracking-tight">いいね・レビュー</h2>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#666666]">
              <button
                type="button"
                className="rounded-full border border-[#d4d4d4] px-4 py-2 font-semibold transition-colors hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
              >
                ♡ いいねする
              </button>
              <p className="self-center">総いいね数: {material.likeCount}</p>
              <p className="self-center">
                総合評価: ★ {material.rating.toFixed(1)} / 5.0
              </p>
            </div>

            <ul className="mt-5 space-y-3">
              {material.reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <p className="font-semibold text-[#0a0a0a]">{review.reviewerName}</p>
                    <p className="font-semibold text-[#666666]">★ {review.rating.toFixed(1)}</p>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#666666]">{review.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <aside>
          <div className="rounded-2xl border border-[#e5e5e5] p-5 lg:sticky lg:top-6">
            <p className="text-xs font-bold tracking-[0.16em] text-[#666666] uppercase">
              Price
            </p>
            <p className="mt-3 text-3xl font-black tracking-tight">
              {formatMaterialPrice(material)}
            </p>
            <button
              type="button"
              className="mt-5 w-full rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2a2a2a]"
            >
              {material.isFree ? "無料でダウンロード" : "購入する"}
            </button>
            <p className="mt-3 text-xs leading-6 text-[#666666]">
              決済機能はPhase 1でStripe連携予定です。現在はモック画面です。
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-black tracking-tight">この先生の他の教材</h2>

        {otherMaterials.length === 0 ? (
          <p className="mt-4 text-sm text-[#666666]">
            現在、公開中の教材はこの1件のみです。
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherMaterials.map((other) => (
              <Link
                key={other.id}
                href={`/materials/${other.id}`}
                className="rounded-2xl border border-[#e5e5e5] p-4 transition-colors hover:border-[#0a0a0a]"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-[#666666] uppercase">
                  {other.subjectTag}
                </p>
                <p className="mt-2 line-clamp-2 text-lg font-black tracking-tight">
                  {other.title}
                </p>
                <p className="mt-3 text-sm font-semibold text-[#0a0a0a]">
                  {formatMaterialPrice(other)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
