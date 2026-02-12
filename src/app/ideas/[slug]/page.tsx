import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getIdeaBySlug,
  getAllIdeaSlugs,
  type OverseasCase,
  type SourceLink,
  type Feasibility,
} from "@/lib/ideas-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllIdeaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const idea = await getIdeaBySlug(slug);
  if (!idea) return {};

  return {
    title: `${idea.title} - AI SaaS 아이디어`,
    description: idea.summary,
    openGraph: {
      title: idea.title,
      description: idea.summary,
      type: "article",
    },
  };
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-gray max-w-none">
      {content.split("\n").map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="mb-3 mt-8 text-xl font-bold text-gray-900"
            >
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="mb-2 mt-6 text-lg font-semibold text-gray-800"
            >
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("- **")) {
          const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)/);
          if (match) {
            return (
              <p key={i} className="mb-1 text-sm text-gray-600">
                <strong className="text-gray-800">{match[1]}</strong>
                {match[2] ? `: ${match[2]}` : ""}
              </p>
            );
          }
        }
        if (line.startsWith("- ")) {
          return (
            <p key={i} className="mb-1 pl-4 text-sm text-gray-600">
              &bull; {line.replace("- ", "")}
            </p>
          );
        }
        if (line.match(/^\d+\.\s/)) {
          return (
            <p key={i} className="mb-1 text-sm text-gray-600">
              {line}
            </p>
          );
        }
        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }
        return (
          <p
            key={i}
            className="mb-2 text-sm leading-relaxed text-gray-600"
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  if (tier === "premium") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Premium
      </span>
    );
  }
  return (
    <span className="rounded-md bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/90">
      Lite
    </span>
  );
}

function FeasibilityCard({ feasibility }: { feasibility: Feasibility }) {
  const scoreColor =
    feasibility.score >= 7
      ? "text-green-700 bg-green-50 border-green-200"
      : feasibility.score >= 4
        ? "text-yellow-700 bg-yellow-50 border-yellow-200"
        : "text-red-700 bg-red-50 border-red-200";

  const progressWidth = `${(feasibility.score / 10) * 100}%`;
  const progressColor =
    feasibility.score >= 7
      ? "bg-green-500"
      : feasibility.score >= 4
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900">
        <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        구현 가능성 평가
      </h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={`rounded-xl border p-5 text-center ${scoreColor}`}>
          <p className="text-4xl font-extrabold">{feasibility.score}<span className="text-lg font-bold opacity-60">/10</span></p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200/50">
            <div className={`h-full rounded-full transition-all ${progressColor}`} style={{ width: progressWidth }} />
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide opacity-70">실현 가능성 점수</p>
        </div>
        <div className="space-y-3">
          <StatRow label="타임라인" value={feasibility.timeline} icon="clock" />
          <StatRow label="필요 인력" value={feasibility.team_size} icon="users" />
          <StatRow label="기술 난이도" value={feasibility.tech_complexity} icon="code" />
        </div>
      </div>
      {feasibility.notes && (
        <p className="mt-4 rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-600">
          {feasibility.notes}
        </p>
      )}
    </div>
  );
}

function StatRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    code: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />,
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5">
      <span className="flex items-center gap-2 text-sm text-gray-500">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {icons[icon]}
        </svg>
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function OverseasCasesSection({ cases }: { cases: OverseasCase[] }) {
  if (!cases || cases.length === 0) return null;
  return (
    <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
        <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        해외 성공 사례
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <div
            key={i}
            className="rounded-xl border border-indigo-100 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-bold text-indigo-800">{c.name}</h4>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700"
                >
                  방문
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>
            <p className="mb-2 text-sm leading-relaxed text-gray-600">
              {c.description}
            </p>
            {c.metrics && (
              <p className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
                {c.metrics}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SourceLinksSection({ links }: { links: SourceLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-gray-500">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
        참고 자료
      </h3>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-600">
              {link.type}
            </span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
  colorScheme = "gray",
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
  colorScheme?: "gray" | "red" | "green" | "blue" | "teal" | "amber" | "purple" | "emerald";
}) {
  const schemes: Record<string, { border: string; bg: string; title: string; iconColor: string }> = {
    gray: { border: "border-gray-200", bg: "bg-white", title: "text-gray-700", iconColor: "text-gray-400" },
    red: { border: "border-red-200", bg: "bg-red-50/50", title: "text-red-700", iconColor: "text-red-400" },
    green: { border: "border-emerald-200", bg: "bg-emerald-50/50", title: "text-emerald-700", iconColor: "text-emerald-400" },
    emerald: { border: "border-emerald-200", bg: "bg-emerald-50/50", title: "text-emerald-700", iconColor: "text-emerald-400" },
    blue: { border: "border-blue-200", bg: "bg-blue-50/50", title: "text-blue-700", iconColor: "text-blue-400" },
    teal: { border: "border-teal-200", bg: "bg-teal-50/50", title: "text-teal-700", iconColor: "text-teal-400" },
    amber: { border: "border-amber-200", bg: "bg-amber-50/50", title: "text-amber-700", iconColor: "text-amber-400" },
    purple: { border: "border-purple-200", bg: "bg-purple-50/50", title: "text-purple-700", iconColor: "text-purple-400" },
  };

  const s = schemes[colorScheme] || schemes.gray;

  return (
    <div className={`rounded-2xl border ${s.border} ${s.bg} p-5 shadow-sm sm:p-6`}>
      <h3 className={`mb-3 text-sm font-bold uppercase tracking-wide ${s.title}`}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function MultilineText({ text }: { text: string }) {
  return (
    <div className="text-sm leading-relaxed text-gray-700">
      {text.split("\n").map((line, i) => {
        if (line.trim() === "") return <div key={i} className="h-1.5" />;
        if (line.startsWith("- ")) {
          return (
            <p key={i} className="mb-1 pl-3">
              <span className="mr-1.5 text-gray-400">&bull;</span>
              {line.replace("- ", "")}
            </p>
          );
        }
        return <p key={i} className="mb-1.5">{line}</p>;
      })}
    </div>
  );
}

export default async function IdeaDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const idea = await getIdeaBySlug(slug);
  if (!idea) notFound();

  const isPremium = idea.tier === "premium";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50/30">
        {/* Header */}
        <section className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-4 py-10 text-white sm:py-12">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/ideas"
              className="mb-4 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-purple-200 transition-colors hover:bg-white/20 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              아이디어 뱅크
            </Link>
            <div className="mb-4 flex flex-wrap gap-2">
              <TierBadge tier={idea.tier || "lite"} />
              <span className="rounded-md bg-white/20 px-3 py-1 text-sm font-medium">
                {idea.category}
              </span>
              {idea.difficulty && (
                <span className="rounded-md bg-white/10 px-3 py-1 text-sm">
                  {idea.difficulty}
                </span>
              )}
              {idea.revenue_model && (
                <span className="rounded-md bg-white/10 px-3 py-1 text-sm">
                  {idea.revenue_model}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
              {idea.title}
            </h1>
            <p className="mt-3 text-base text-purple-100 sm:text-lg">{idea.summary}</p>
            <p className="mt-4 text-sm text-purple-200/80">
              {new Date(idea.published_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {idea.estimated_revenue && (
              <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-4 text-center shadow-sm">
                <div className="mb-1 flex justify-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-medium uppercase text-green-600">예상 수익</p>
                <p className="mt-0.5 text-sm font-bold text-green-800">{idea.estimated_revenue}</p>
              </div>
            )}
            {idea.difficulty && (
              <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 text-center shadow-sm">
                <div className="mb-1 flex justify-center">
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <p className="text-xs font-medium uppercase text-blue-600">난이도</p>
                <p className="mt-0.5 text-sm font-bold text-blue-800">{idea.difficulty}</p>
              </div>
            )}
            {idea.target_market && (
              <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-4 text-center shadow-sm">
                <div className="mb-1 flex justify-center">
                  <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <p className="text-xs font-medium uppercase text-purple-600">타겟</p>
                <p className="mt-0.5 text-sm font-bold text-purple-800">{idea.target_market}</p>
              </div>
            )}
            {idea.revenue_model && (
              <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-4 text-center shadow-sm">
                <div className="mb-1 flex justify-center">
                  <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <p className="text-xs font-medium uppercase text-orange-600">수익 모델</p>
                <p className="mt-0.5 text-sm font-bold text-orange-800">{idea.revenue_model}</p>
              </div>
            )}
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <SectionCard title="Problem" colorScheme="red">
              <p className="text-sm leading-relaxed text-gray-700">{idea.problem}</p>
            </SectionCard>
            <SectionCard title="Solution" colorScheme="emerald">
              <p className="text-sm leading-relaxed text-gray-700">{idea.solution}</p>
            </SectionCard>
          </div>
        </section>

        {/* Feasibility Score (Premium) */}
        {isPremium && idea.feasibility && (
          <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
            <FeasibilityCard feasibility={idea.feasibility} />
          </section>
        )}

        {/* Tech Stack */}
        {idea.tech_stack && idea.tech_stack.length > 0 && (
          <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-gray-500">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {idea.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <MarkdownContent content={idea.content} />
          </div>
        </section>

        {/* Overseas Cases (Premium) */}
        {isPremium && idea.overseas_cases && (
          <section className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <OverseasCasesSection cases={idea.overseas_cases} />
          </section>
        )}

        {/* Korea Localization (Premium) */}
        {isPremium && idea.korea_localization && (
          <section className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <SectionCard title="한국 시장 현지화 전략" colorScheme="blue">
              <MultilineText text={idea.korea_localization} />
            </SectionCard>
          </section>
        )}

        {/* Additional Sections */}
        <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
          <div className="space-y-4">
            {idea.how_it_works && (
              <SectionCard title="작동 방식" colorScheme="gray">
                <MultilineText text={idea.how_it_works} />
              </SectionCard>
            )}
            {idea.monetization && (
              <SectionCard title="수익화 전략" colorScheme="gray">
                <MultilineText text={idea.monetization} />
              </SectionCard>
            )}

            {/* Customer Analysis (Premium) */}
            {isPremium && idea.customer_analysis && (
              <SectionCard title="고객 분석" colorScheme="teal">
                <MultilineText text={idea.customer_analysis} />
              </SectionCard>
            )}

            {/* Profitability Analysis (Premium) */}
            {isPremium && idea.profitability_analysis && (
              <SectionCard title="수익성 분석" colorScheme="green">
                <MultilineText text={idea.profitability_analysis} />
              </SectionCard>
            )}

            {/* Risk Analysis (Premium) */}
            {isPremium && idea.risk_analysis && (
              <SectionCard title="리스크 분석" colorScheme="amber">
                <MultilineText text={idea.risk_analysis} />
              </SectionCard>
            )}

            {idea.competition && (
              <SectionCard title="경쟁 분석" colorScheme="gray">
                <MultilineText text={idea.competition} />
              </SectionCard>
            )}
            {idea.unique_angle && (
              <SectionCard title="차별화 포인트" colorScheme="purple">
                <MultilineText text={idea.unique_angle} />
              </SectionCard>
            )}
          </div>
        </section>

        {/* Source Links (Premium) */}
        {isPremium && idea.source_links && (
          <section className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <SourceLinksSection links={idea.source_links} />
          </section>
        )}

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-center text-white shadow-lg">
            <h3 className="mb-2 text-xl font-bold">
              이 아이디어가 마음에 드셨나요?
            </h3>
            <p className="mb-5 text-sm text-purple-100">
              매일 새로운 AI SaaS 아이디어를 받아보세요.
            </p>
            <Link
              href="/ideas"
              className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-bold text-purple-700 shadow-md transition-colors hover:bg-purple-50"
            >
              더 많은 아이디어 보기
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <NewsletterSignup />
        </section>
      </main>
      <Footer />
    </div>
  );
}
