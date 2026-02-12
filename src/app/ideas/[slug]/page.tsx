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
      <span className="rounded-full bg-amber-400/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
        Premium
      </span>
    );
  }
  return (
    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wide">
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

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        구현 가능성 평가
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`rounded-lg border p-4 text-center ${scoreColor}`}>
          <p className="text-3xl font-extrabold">{feasibility.score}/10</p>
          <p className="mt-1 text-xs font-medium uppercase">실현 가능성</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">타임라인</span>
            <span className="font-medium text-gray-800">
              {feasibility.timeline}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">필요 인력</span>
            <span className="font-medium text-gray-800">
              {feasibility.team_size}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">기술 난이도</span>
            <span className="font-medium text-gray-800">
              {feasibility.tech_complexity}
            </span>
          </div>
        </div>
      </div>
      {feasibility.notes && (
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          {feasibility.notes}
        </p>
      )}
    </div>
  );
}

function OverseasCasesSection({ cases }: { cases: OverseasCase[] }) {
  if (!cases || cases.length === 0) return null;
  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6">
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        해외 성공 사례
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <div
            key={i}
            className="rounded-lg border border-indigo-100 bg-white p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-bold text-indigo-800">{c.name}</h4>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-500 hover:text-indigo-700"
                >
                  Link &rarr;
                </a>
              )}
            </div>
            <p className="mb-2 text-sm leading-relaxed text-gray-600">
              {c.description}
            </p>
            {c.metrics && (
              <p className="text-xs font-medium text-indigo-600">
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
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="mb-3 text-sm font-bold uppercase text-gray-500">
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
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-4 py-12 text-white">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/ideas"
              className="mb-4 inline-flex items-center gap-1 text-sm text-purple-200 hover:text-white"
            >
              &larr; 아이디어 뱅크
            </Link>
            <div className="mb-4 flex flex-wrap gap-2">
              <TierBadge tier={idea.tier || "lite"} />
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                {idea.category}
              </span>
              {idea.difficulty && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
                  {idea.difficulty}
                </span>
              )}
              {idea.revenue_model && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
                  {idea.revenue_model}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              {idea.title}
            </h1>
            <p className="mt-3 text-lg text-purple-100">{idea.summary}</p>
            <p className="mt-4 text-sm text-purple-200">
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {idea.estimated_revenue && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
                <p className="text-xs font-medium uppercase text-green-600">
                  예상 수익
                </p>
                <p className="mt-1 text-sm font-bold text-green-800">
                  {idea.estimated_revenue}
                </p>
              </div>
            )}
            {idea.difficulty && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                <p className="text-xs font-medium uppercase text-blue-600">
                  난이도
                </p>
                <p className="mt-1 text-sm font-bold text-blue-800">
                  {idea.difficulty}
                </p>
              </div>
            )}
            {idea.target_market && (
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-center">
                <p className="text-xs font-medium uppercase text-purple-600">
                  타겟
                </p>
                <p className="mt-1 text-sm font-bold text-purple-800">
                  {idea.target_market}
                </p>
              </div>
            )}
            {idea.revenue_model && (
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-center">
                <p className="text-xs font-medium uppercase text-orange-600">
                  수익 모델
                </p>
                <p className="mt-1 text-sm font-bold text-orange-800">
                  {idea.revenue_model}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-red-200 bg-red-50 p-5">
              <h3 className="mb-2 text-sm font-bold uppercase text-red-700">
                Problem
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {idea.problem}
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="mb-2 text-sm font-bold uppercase text-emerald-700">
                Solution
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {idea.solution}
              </p>
            </div>
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
            <h3 className="mb-3 text-sm font-bold uppercase text-gray-500">
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
          </section>
        )}

        {/* Main Content */}
        <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <MarkdownContent content={idea.content} />
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
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6">
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                한국 시장 현지화 전략
              </h3>
              <div className="text-sm leading-relaxed text-gray-700">
                {idea.korea_localization.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Additional Sections */}
        <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
          <div className="space-y-4">
            {idea.how_it_works && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase text-gray-500">
                  작동 방식
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {idea.how_it_works}
                </p>
              </div>
            )}
            {idea.monetization && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase text-gray-500">
                  수익화 전략
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {idea.monetization}
                </p>
              </div>
            )}

            {/* Customer Analysis (Premium) */}
            {isPremium && idea.customer_analysis && (
              <div className="rounded-lg border border-teal-200 bg-teal-50 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase text-teal-700">
                  고객 분석
                </h3>
                <div className="text-sm leading-relaxed text-gray-700">
                  {idea.customer_analysis.split("\n").map((line, i) => (
                    <p key={i} className="mb-1">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Profitability Analysis (Premium) */}
            {isPremium && idea.profitability_analysis && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase text-green-700">
                  수익성 분석
                </h3>
                <div className="text-sm leading-relaxed text-gray-700">
                  {idea.profitability_analysis.split("\n").map((line, i) => (
                    <p key={i} className="mb-1">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Analysis (Premium) */}
            {isPremium && idea.risk_analysis && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase text-amber-700">
                  리스크 분석
                </h3>
                <div className="text-sm leading-relaxed text-gray-700">
                  {idea.risk_analysis.split("\n").map((line, i) => (
                    <p key={i} className="mb-1">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {idea.competition && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase text-gray-500">
                  경쟁 분석
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {idea.competition}
                </p>
              </div>
            )}
            {idea.unique_angle && (
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase text-purple-600">
                  차별화 포인트
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {idea.unique_angle}
                </p>
              </div>
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
          <div className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-center text-white">
            <h3 className="mb-2 text-xl font-bold">
              이 아이디어가 마음에 드셨나요?
            </h3>
            <p className="mb-4 text-sm text-purple-100">
              매일 새로운 AI SaaS 아이디어를 받아보세요.
            </p>
            <Link
              href="/ideas"
              className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-bold text-purple-700 hover:bg-purple-50"
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
