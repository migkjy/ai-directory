"use client";

import { useActionState } from "react";
import { subscribeAction } from "@/actions/subscribe";

export default function NewsletterSignup() {
  const [state, formAction, isPending] = useActionState(subscribeAction, null);

  if (state?.success) {
    return (
      <section className="my-12 rounded-xl border border-blue-200 bg-blue-50 p-8 text-center">
        <p className="text-lg font-semibold text-blue-700">{state.message}</p>
      </section>
    );
  }

  return (
    <section className="my-12 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white sm:p-10">
      <div className="text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-200">
          무료 뉴스레터
        </p>
        <h3 className="mb-2 text-2xl font-bold">
          AI 트렌드를 놓치지 마세요
        </h3>
        <p className="mx-auto mb-6 max-w-md text-sm text-blue-100">
          새로운 AI 도구와 활용 팁을 매주 전달합니다. 10,000+명이 구독 중인
          뉴스레터에 지금 참여하세요.
        </p>
      </div>
      <form
        action={formAction}
        className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          name="email"
          placeholder="이메일 주소를 입력하세요"
          required
          className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 disabled:opacity-50"
        >
          {isPending ? "처리 중..." : "구독하기"}
        </button>
      </form>
      {state?.message && !state.success && (
        <p className="mt-3 text-center text-sm text-red-200">
          {state.message}
        </p>
      )}
      <p className="mt-4 text-center text-xs text-blue-200/70">
        스팸 없이, 언제든 구독 취소 가능합니다.
      </p>
    </section>
  );
}
