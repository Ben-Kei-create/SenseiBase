import Link from "next/link";
import {
  SUBJECT_TAGS,
  SORT_OPTIONS,
  filterAndSortMaterials,
  formatMaterialPrice,
  isValidSort,
  isValidSubject,
} from "@/lib/mock/materials";

type MaterialsPageProps = {
  searchParams: Promise<{
    q?: string;
    subject?: string;
    sort?: string;
  }>;
};

type QueryValues = {
  q: string;
  subject: string;
  sort: string;
};

const buildMaterialsHref = ({ q, subject, sort }: QueryValues) => {
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }
  if (subject && subject !== "全て") {
    params.set("subject", subject);
  }
  if (sort) {
    params.set("sort", sort);
  }

  const queryString = params.toString();
  return queryString ? `/materials?${queryString}` : "/materials";
};

export default async function MaterialsPage({ searchParams }: MaterialsPageProps) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const subject = params.subject && isValidSubject(params.subject) ? params.subject : "全て";
  const sort = params.sort && isValidSort(params.sort) ? params.sort : "newest";

  const materials = filterAndSortMaterials({ query: q, subject, sort });

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-12">
      <section>
        <p className="text-xs font-bold tracking-[0.18em] text-[#666666] uppercase">
          Marketplace
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          教材を探す
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#666666] sm:text-base">
          先生が作った教材を、教科タグ・キーワード・並び替えで探せます。
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e5e5e5] p-4 sm:p-5">
        <form method="get" className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="教材名・先生名で検索"
            className="w-full rounded-xl border border-[#d4d4d4] px-4 py-3 text-sm outline-none transition-colors focus:border-[#0a0a0a]"
          />
          <select
            name="sort"
            defaultValue={sort}
            className="rounded-xl border border-[#d4d4d4] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#0a0a0a]"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-[#0a0a0a] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2a2a2a]"
          >
            適用
          </button>
          <input type="hidden" name="subject" value={subject} />
        </form>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {SUBJECT_TAGS.map((tag) => {
            const href = buildMaterialsHref({
              q,
              subject: tag,
              sort,
            });
            const active = tag === subject;
            return (
              <Link
                key={tag}
                href={href}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                    : "border-[#d4d4d4] text-[#666666] hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
                }`}
              >
                {tag}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between">
          <p className="text-sm text-[#666666]">
            <span className="font-bold text-[#0a0a0a]">{materials.length}</span> 件の教材
          </p>
        </div>

        {materials.length === 0 ? (
          <div className="rounded-2xl border border-[#e5e5e5] p-10 text-center">
            <p className="text-lg font-bold">該当する教材が見つかりませんでした</p>
            <p className="mt-2 text-sm text-[#666666]">
              検索ワードやタグを変更して再度お試しください。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {materials.map((material) => (
              <Link
                key={material.id}
                href={`/materials/${material.id}`}
                className="group rounded-2xl border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#0a0a0a]"
              >
                <div className="aspect-[16/10] rounded-xl border border-[#e5e5e5] bg-[#f3f3f3]">
                  <div className="flex h-full items-center justify-center text-xs font-bold tracking-[0.14em] text-[#666666] uppercase">
                    {material.hasThumbnail ? "Preview" : "No Preview"}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#d4d4d4] px-3 py-1 text-xs font-bold text-[#666666]">
                      {material.subjectTag}
                    </span>
                    <span className="text-sm font-bold text-[#0a0a0a]">
                      {formatMaterialPrice(material)}
                    </span>
                  </div>

                  <h2 className="line-clamp-2 text-xl font-black tracking-tight text-[#0a0a0a]">
                    {material.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#666666]">{material.teacherName}</p>

                  <div className="mt-4 flex items-center gap-4 text-sm text-[#666666]">
                    <span>♡ {material.likeCount}</span>
                    <span>★ {material.rating.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
