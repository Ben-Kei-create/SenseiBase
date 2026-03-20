export const SUBJECT_TAGS = [
  "全て",
  "国語",
  "数学",
  "英語",
  "理科",
  "社会",
  "音楽",
  "体育",
  "美術",
  "技術・家庭",
] as const;

const MATERIAL_SUBJECTS = SUBJECT_TAGS.filter(
  (subject) => subject !== "全て",
) as MaterialSubjectTag[];

export type MaterialSubjectTag = Exclude<(typeof SUBJECT_TAGS)[number], "全て">;
export type SortOption = "newest" | "popular" | "priceAsc";

export const SORT_OPTIONS: {
  value: SortOption;
  label: string;
}[] = [
  { value: "newest", label: "新着順" },
  { value: "popular", label: "人気順" },
  { value: "priceAsc", label: "価格が安い順" },
];

export type MaterialReview = {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Material = {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  teacherBio: string;
  subjectTag: MaterialSubjectTag;
  price: number;
  isFree: boolean;
  hasThumbnail: boolean;
  likeCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  reviews: MaterialReview[];
};

const MOCK_MATERIALS: Material[] = [
  {
    id: "math-001",
    title: "中1 方程式ウォームアップ10分プリント",
    description:
      "授業冒頭で使える計算ウォームアップ集。解き方のチェック欄つきで、板書時間を削減できます。",
    teacherId: "teacher-01",
    teacherName: "山田 由紀",
    teacherBio: "塾講師12年。数学の苦手克服教材を中心に制作。",
    subjectTag: "数学",
    price: 300,
    isFree: false,
    hasThumbnail: true,
    likeCount: 148,
    rating: 4.7,
    reviewCount: 41,
    createdAt: "2026-02-28T08:00:00.000Z",
    reviews: [
      {
        id: "r-math-001-1",
        reviewerName: "都内中学校 教員",
        rating: 5,
        comment: "導入で使いやすく、計算ミスの傾向把握がしやすいです。",
        createdAt: "2026-03-01T09:00:00.000Z",
      },
      {
        id: "r-math-001-2",
        reviewerName: "個別指導講師",
        rating: 4,
        comment: "難易度の段階が明確で、小テストに流用しやすかったです。",
        createdAt: "2026-03-03T13:00:00.000Z",
      },
    ],
  },
  {
    id: "jp-001",
    title: "国語 記述採点ルーブリックテンプレート",
    description:
      "記述問題の採点基準を統一するテンプレート。学年会で共有しやすい形式に整えています。",
    teacherId: "teacher-02",
    teacherName: "佐々木 和美",
    teacherBio: "公立中学校 国語科。評価設計と記述指導を研究。",
    subjectTag: "国語",
    price: 0,
    isFree: true,
    hasThumbnail: false,
    likeCount: 92,
    rating: 4.5,
    reviewCount: 28,
    createdAt: "2026-02-12T03:00:00.000Z",
    reviews: [
      {
        id: "r-jp-001-1",
        reviewerName: "高校教員",
        rating: 5,
        comment: "評価観点がわかりやすく、校内研修でも使えました。",
        createdAt: "2026-02-13T10:00:00.000Z",
      },
    ],
  },
  {
    id: "eng-001",
    title: "英語 スピーキング活動カード40",
    description:
      "ペアワークで使える即興トピックカード。発話量を増やす進行例つきです。",
    teacherId: "teacher-03",
    teacherName: "田中 彩",
    teacherBio: "高校英語教員。アクティブラーニング教材を制作。",
    subjectTag: "英語",
    price: 800,
    isFree: false,
    hasThumbnail: true,
    likeCount: 173,
    rating: 4.8,
    reviewCount: 56,
    createdAt: "2026-03-06T07:00:00.000Z",
    reviews: [
      {
        id: "r-eng-001-1",
        reviewerName: "英語塾講師",
        rating: 5,
        comment: "授業準備の時短に直結しました。生徒の反応も良いです。",
        createdAt: "2026-03-07T12:00:00.000Z",
      },
      {
        id: "r-eng-001-2",
        reviewerName: "中学校教員",
        rating: 4,
        comment: "難易度別に分けられていて活用しやすいです。",
        createdAt: "2026-03-08T08:00:00.000Z",
      },
    ],
  },
  {
    id: "science-001",
    title: "理科 実験レポート評価シートセット",
    description:
      "観察・考察・改善提案までを一枚で評価できるシート集。ルーブリック付き。",
    teacherId: "teacher-04",
    teacherName: "高橋 直人",
    teacherBio: "中学理科教員。探究活動向けの評価設計が専門。",
    subjectTag: "理科",
    price: 600,
    isFree: false,
    hasThumbnail: false,
    likeCount: 119,
    rating: 4.6,
    reviewCount: 34,
    createdAt: "2026-02-21T04:00:00.000Z",
    reviews: [
      {
        id: "r-science-001-1",
        reviewerName: "私立中学教員",
        rating: 5,
        comment: "探究活動の振り返りが整理しやすくなりました。",
        createdAt: "2026-02-22T16:00:00.000Z",
      },
    ],
  },
  {
    id: "social-001",
    title: "社会 公民 時事問題ワーク 2026春",
    description:
      "ニュースを授業導入に使うための時事問題ワーク。思考を促す問いを収録。",
    teacherId: "teacher-05",
    teacherName: "松本 健",
    teacherBio: "社会科教員。時事教材とディスカッション型授業を実践。",
    subjectTag: "社会",
    price: 500,
    isFree: false,
    hasThumbnail: true,
    likeCount: 88,
    rating: 4.3,
    reviewCount: 20,
    createdAt: "2026-03-02T06:00:00.000Z",
    reviews: [
      {
        id: "r-social-001-1",
        reviewerName: "高校教員",
        rating: 4,
        comment: "問いが具体的で、討論活動にすぐ使えました。",
        createdAt: "2026-03-03T15:00:00.000Z",
      },
    ],
  },
  {
    id: "music-001",
    title: "音楽 合唱指導の導入スクリプト",
    description:
      "短時間で発声練習に入るための進行台本と声かけ例。学年別の注意点つき。",
    teacherId: "teacher-06",
    teacherName: "伊藤 真紀",
    teacherBio: "音楽科教員。合唱指導と学級運営をテーマに発信。",
    subjectTag: "音楽",
    price: 300,
    isFree: false,
    hasThumbnail: false,
    likeCount: 74,
    rating: 4.4,
    reviewCount: 16,
    createdAt: "2026-01-30T05:30:00.000Z",
    reviews: [
      {
        id: "r-music-001-1",
        reviewerName: "小学校教員",
        rating: 4,
        comment: "声かけが具体的で、導入がスムーズになりました。",
        createdAt: "2026-02-01T09:20:00.000Z",
      },
    ],
  },
  {
    id: "pe-001",
    title: "体育 授業観察チェックリスト",
    description:
      "技能別・協働別の観点で評価できる体育授業チェックリスト。印刷して即使用可能。",
    teacherId: "teacher-07",
    teacherName: "小林 翔",
    teacherBio: "体育教員。評価と安全管理の教材を制作。",
    subjectTag: "体育",
    price: 0,
    isFree: true,
    hasThumbnail: true,
    likeCount: 133,
    rating: 4.7,
    reviewCount: 49,
    createdAt: "2026-03-04T11:00:00.000Z",
    reviews: [
      {
        id: "r-pe-001-1",
        reviewerName: "中学校体育教員",
        rating: 5,
        comment: "評価項目が整理され、観察記録が取りやすいです。",
        createdAt: "2026-03-05T14:00:00.000Z",
      },
    ],
  },
  {
    id: "art-001",
    title: "美術 鑑賞レポートテンプレート集",
    description:
      "作品鑑賞で思考の可視化を促すテンプレート。評価コメント例も収録しています。",
    teacherId: "teacher-08",
    teacherName: "中村 絵里",
    teacherBio: "美術教員。鑑賞指導とポートフォリオ評価を研究。",
    subjectTag: "美術",
    price: 450,
    isFree: false,
    hasThumbnail: false,
    likeCount: 68,
    rating: 4.2,
    reviewCount: 15,
    createdAt: "2026-02-04T02:00:00.000Z",
    reviews: [
      {
        id: "r-art-001-1",
        reviewerName: "高校美術教員",
        rating: 4,
        comment: "文章化が苦手な生徒にも使いやすい構成でした。",
        createdAt: "2026-02-07T08:45:00.000Z",
      },
    ],
  },
  {
    id: "techhome-001",
    title: "技術・家庭 生活設計ワークシート",
    description:
      "家計管理と生活設計を扱う実践ワーク。家庭学習への接続しやすい設問設計です。",
    teacherId: "teacher-09",
    teacherName: "藤井 麻里",
    teacherBio: "家庭科教員。生活実践に結びつく教材開発に注力。",
    subjectTag: "技術・家庭",
    price: 550,
    isFree: false,
    hasThumbnail: true,
    likeCount: 81,
    rating: 4.5,
    reviewCount: 23,
    createdAt: "2026-03-01T10:10:00.000Z",
    reviews: [
      {
        id: "r-techhome-001-1",
        reviewerName: "中学校教員",
        rating: 5,
        comment: "実生活と結びついた設問で、生徒の反応が良かったです。",
        createdAt: "2026-03-02T11:20:00.000Z",
      },
    ],
  },
  {
    id: "math-002",
    title: "高校数学 定期テスト対策バンドル",
    description:
      "関数・図形・確率の3単元を1セット化。解説プリントと確認テストを同梱。",
    teacherId: "teacher-01",
    teacherName: "山田 由紀",
    teacherBio: "塾講師12年。数学の苦手克服教材を中心に制作。",
    subjectTag: "数学",
    price: 1200,
    isFree: false,
    hasThumbnail: true,
    likeCount: 205,
    rating: 4.9,
    reviewCount: 67,
    createdAt: "2026-03-08T06:20:00.000Z",
    reviews: [
      {
        id: "r-math-002-1",
        reviewerName: "高校教員",
        rating: 5,
        comment: "単元横断で使え、試験前の演習量を確保できました。",
        createdAt: "2026-03-08T17:00:00.000Z",
      },
      {
        id: "r-math-002-2",
        reviewerName: "予備校講師",
        rating: 5,
        comment: "解説の粒度がちょうどよく、復習プリントとしても優秀です。",
        createdAt: "2026-03-09T09:00:00.000Z",
      },
    ],
  },
];

export const formatYen = (amount: number) =>
  `¥${new Intl.NumberFormat("ja-JP").format(amount)}`;

export const formatMaterialPrice = (material: Material) =>
  material.isFree ? "無料" : formatYen(material.price);

export const getAllMaterials = () => MOCK_MATERIALS;

export const getMaterialById = (id: string) =>
  MOCK_MATERIALS.find((material) => material.id === id);

export const getOtherMaterialsByTeacher = (teacherId: string, currentId: string) =>
  MOCK_MATERIALS.filter(
    (material) => material.teacherId === teacherId && material.id !== currentId,
  );

export const isValidSubject = (subject: string): subject is MaterialSubjectTag =>
  MATERIAL_SUBJECTS.includes(subject as MaterialSubjectTag);

export const isValidSort = (sort: string): sort is SortOption =>
  SORT_OPTIONS.some((option) => option.value === sort);

type FilterParams = {
  query: string;
  subject: string;
  sort: SortOption;
};

export const filterAndSortMaterials = ({ query, subject, sort }: FilterParams) => {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = MOCK_MATERIALS.filter((material) => {
    const matchesSubject =
      subject === "全て" ? true : material.subjectTag === subject;

    if (!matchesSubject) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchable = [
      material.title,
      material.description,
      material.teacherName,
      material.subjectTag,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "newest") {
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    if (sort === "popular") {
      if (b.likeCount !== a.likeCount) {
        return b.likeCount - a.likeCount;
      }
      return b.rating - a.rating;
    }

    const aPrice = a.isFree ? 0 : a.price;
    const bPrice = b.isFree ? 0 : b.price;
    return aPrice - bPrice;
  });

  return sorted;
};
