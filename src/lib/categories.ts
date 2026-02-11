export const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    icon: string;
    color: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    longDescription: string;
  }
> = {
  writing: {
    label: "글쓰기",
    icon: "✏️",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    description: "AI 기반 글쓰기, 번역, 문서 작성 도구",
    seoTitle: "AI 글쓰기 도구 모음 - 블로그, 카피라이팅, 번역 | AI AppPro",
    seoDescription:
      "ChatGPT, Claude, Jasper 등 최고의 AI 글쓰기 도구를 비교하세요. 블로그 작성, 카피라이팅, 번역, 문서 작성에 활용할 수 있는 AI 도구의 가격과 기능을 한눈에.",
    longDescription:
      "AI 글쓰기 도구는 블로그 포스트, 마케팅 카피, 비즈니스 문서, 번역까지 다양한 글쓰기 작업을 자동화합니다. 소상공인은 AI를 활용해 전문적인 콘텐츠를 빠르고 효율적으로 생산할 수 있습니다.",
  },
  image: {
    label: "이미지 생성",
    icon: "🎨",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    description: "AI 이미지 생성, 편집, 디자인 도구",
    seoTitle: "AI 이미지 생성 도구 모음 - Midjourney, DALL-E, Flux | AI AppPro",
    seoDescription:
      "Midjourney, DALL-E 3, Stable Diffusion 등 AI 이미지 생성 도구를 비교하세요. 상품 사진, 배너, 일러스트를 AI로 만드는 방법과 가격 정보.",
    longDescription:
      "AI 이미지 생성 도구로 전문 디자이너 없이도 고품질 이미지를 만들 수 있습니다. 상품 사진, SNS 콘텐츠, 마케팅 배너, 로고까지 텍스트 설명만으로 원하는 이미지를 생성하세요.",
  },
  coding: {
    label: "코딩",
    icon: "💻",
    color: "bg-green-50 text-green-700 border-green-200",
    description: "AI 코드 작성, 디버깅, 개발 보조 도구",
    seoTitle: "AI 코딩 도구 모음 - Cursor, Copilot, v0, Bolt | AI AppPro",
    seoDescription:
      "Cursor, GitHub Copilot, v0, Bolt 등 AI 코딩 도구를 비교하세요. AI가 코드를 작성하고 앱을 만들어주는 도구들의 기능과 가격을 비교합니다.",
    longDescription:
      "AI 코딩 도구는 코드 자동완성부터 풀스택 앱 생성까지 개발 생산성을 획기적으로 높여줍니다. 비개발자도 v0, Bolt, Lovable 같은 도구로 웹사이트와 앱을 직접 만들 수 있는 시대입니다.",
  },
  marketing: {
    label: "마케팅",
    icon: "📢",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    description: "AI 마케팅, 광고, SNS 관리 도구",
    seoTitle: "AI 마케팅 도구 모음 - SEO, 광고, SNS 자동화 | AI AppPro",
    seoDescription:
      "Jasper, Semrush AI, AdCreative 등 AI 마케팅 도구를 비교하세요. SEO 최적화, 광고 소재 생성, SNS 관리를 AI로 자동화하는 방법.",
    longDescription:
      "AI 마케팅 도구로 광고 카피, 배너 디자인, SEO 분석, 이메일 마케팅을 자동화하세요. 소상공인도 AI를 활용하면 대기업 수준의 마케팅 효과를 낼 수 있습니다.",
  },
  video: {
    label: "영상",
    icon: "🎬",
    color: "bg-red-50 text-red-700 border-red-200",
    description: "AI 영상 생성, 편집, 자막 도구",
    seoTitle: "AI 영상 도구 모음 - Sora, Runway, HeyGen | AI AppPro",
    seoDescription:
      "Sora, Runway, HeyGen 등 AI 영상 생성 도구를 비교하세요. 텍스트로 영상 만들기, AI 아바타, 영상 편집 도구의 가격과 기능.",
    longDescription:
      "AI 영상 도구로 촬영 없이 고품질 영상을 만들 수 있습니다. 제품 소개 영상, SNS 콘텐츠, 교육 자료까지 텍스트만으로 전문적인 영상을 생성하세요.",
  },
  audio: {
    label: "음성",
    icon: "🎵",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    description: "AI 음성 합성, 음악 생성, 오디오 편집 도구",
    seoTitle: "AI 음성/음악 도구 모음 - ElevenLabs, Suno, Udio | AI AppPro",
    seoDescription:
      "ElevenLabs, Suno, Udio 등 AI 음성 및 음악 도구를 비교하세요. AI 보이스, TTS, 음악 생성, 팟캐스트 편집 도구의 가격과 기능.",
    longDescription:
      "AI 음성 도구로 내레이션, 팟캐스트, 음악을 손쉽게 제작하세요. 자연스러운 AI 보이스로 영상 나레이션을, AI 작곡으로 배경음악을 만들 수 있습니다.",
  },
  productivity: {
    label: "생산성",
    icon: "⚡",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    description: "AI 업무 자동화, 일정 관리, 생산성 도구",
    seoTitle: "AI 생산성 도구 모음 - Notion AI, Perplexity, Zapier | AI AppPro",
    seoDescription:
      "Notion AI, Perplexity, Zapier AI 등 AI 생산성 도구를 비교하세요. 업무 자동화, AI 검색, 일정 관리로 업무 효율을 높이는 방법.",
    longDescription:
      "AI 생산성 도구로 반복 업무를 자동화하고 업무 효율을 높이세요. AI 검색, 문서 정리, 일정 최적화, 워크플로우 자동화까지 비즈니스 운영을 스마트하게 만듭니다.",
  },
  data: {
    label: "데이터 분석",
    icon: "📊",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    description: "AI 데이터 분석, 시각화, BI 도구",
    seoTitle: "AI 데이터 분석 도구 모음 - Julius, Tableau, Power BI | AI AppPro",
    seoDescription:
      "Julius AI, Tableau AI, Power BI Copilot 등 AI 데이터 분석 도구를 비교하세요. 코딩 없이 데이터를 분석하고 시각화하는 방법.",
    longDescription:
      "AI 데이터 분석 도구로 복잡한 데이터를 쉽게 분석하세요. 코딩 없이 매출 분석, 고객 행동 파악, 트렌드 예측까지 데이터 기반 의사결정을 도와줍니다.",
  },
  education: {
    label: "교육",
    icon: "📚",
    color: "bg-teal-50 text-teal-700 border-teal-200",
    description: "AI 학습, 교육 콘텐츠, 튜터링 도구",
    seoTitle: "AI 교육 도구 모음 - Khanmigo, Duolingo, Quizlet | AI AppPro",
    seoDescription:
      "Khanmigo, Duolingo Max, Quizlet AI 등 AI 교육 도구를 비교하세요. AI 튜터, 언어 학습, 시험 대비 도구의 기능과 가격.",
    longDescription:
      "AI 교육 도구로 맞춤형 학습 경험을 만드세요. AI 튜터가 1:1로 가르쳐주고, 학습 진도에 맞춘 문제를 출제하며, 언어 학습부터 수학까지 모든 과목을 지원합니다.",
  },
  customer_service: {
    label: "고객 서비스",
    icon: "💬",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
    description: "AI 챗봇, 고객 지원, CRM 도구",
    seoTitle: "AI 고객 서비스 도구 모음 - Intercom, Zendesk, 채널톡 | AI AppPro",
    seoDescription:
      "Intercom Fin, Zendesk AI, 채널톡 등 AI 고객 서비스 도구를 비교하세요. AI 챗봇으로 24시간 고객 응대를 자동화하는 방법과 가격.",
    longDescription:
      "AI 고객 서비스 도구로 24시간 자동 고객 응대를 구현하세요. AI 챗봇이 반복 문의를 처리하고, 복잡한 건은 상담원에게 연결하며, 고객 만족도를 높여줍니다.",
  },
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_CONFIG[category]?.label || category;
}

export function getCategoryIcon(category: string): string {
  return CATEGORY_CONFIG[category]?.icon || "🔧";
}

export function getCategoryColor(category: string): string {
  return (
    CATEGORY_CONFIG[category]?.color ||
    "bg-gray-50 text-gray-700 border-gray-200"
  );
}

export function getCategoryDescription(category: string): string {
  return CATEGORY_CONFIG[category]?.description || "";
}

export function getCategorySeoTitle(category: string): string {
  return CATEGORY_CONFIG[category]?.seoTitle || `${getCategoryLabel(category)} AI 도구 모음`;
}

export function getCategorySeoDescription(category: string): string {
  return CATEGORY_CONFIG[category]?.seoDescription || "";
}

export function getCategoryLongDescription(category: string): string {
  return CATEGORY_CONFIG[category]?.longDescription || "";
}
