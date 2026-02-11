export const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: string; color: string; description: string }
> = {
  writing: {
    label: "글쓰기",
    icon: "✏️",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    description: "AI 기반 글쓰기, 번역, 문서 작성 도구",
  },
  image: {
    label: "이미지 생성",
    icon: "🎨",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    description: "AI 이미지 생성, 편집, 디자인 도구",
  },
  coding: {
    label: "코딩",
    icon: "💻",
    color: "bg-green-50 text-green-700 border-green-200",
    description: "AI 코드 작성, 디버깅, 개발 보조 도구",
  },
  marketing: {
    label: "마케팅",
    icon: "📢",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    description: "AI 마케팅, 광고, SNS 관리 도구",
  },
  video: {
    label: "영상",
    icon: "🎬",
    color: "bg-red-50 text-red-700 border-red-200",
    description: "AI 영상 생성, 편집, 자막 도구",
  },
  audio: {
    label: "음성",
    icon: "🎵",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    description: "AI 음성 합성, 음악 생성, 오디오 편집 도구",
  },
  productivity: {
    label: "생산성",
    icon: "⚡",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    description: "AI 업무 자동화, 일정 관리, 생산성 도구",
  },
  data: {
    label: "데이터 분석",
    icon: "📊",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    description: "AI 데이터 분석, 시각화, BI 도구",
  },
  education: {
    label: "교육",
    icon: "📚",
    color: "bg-teal-50 text-teal-700 border-teal-200",
    description: "AI 학습, 교육 콘텐츠, 튜터링 도구",
  },
  customer_service: {
    label: "고객 서비스",
    icon: "💬",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
    description: "AI 챗봇, 고객 지원, CRM 도구",
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
