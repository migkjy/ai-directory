"use client";

import { useActionState } from "react";
import { subscribeAction } from "@/actions/subscribe";

export default function NewsletterSignup() {
  const [state, formAction, isPending] = useActionState(subscribeAction, null);

  if (state?.success) {
    return (
      <section className="my-12 rounded-xl bg-blue-50 border border-blue-200 p-8 text-center">
        <p className="text-lg font-semibold text-blue-700">{state.message}</p>
      </section>
    );
  }

  return (
    <section className="my-12 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          AI 도구 소식을 받아보세요
        </h3>
        <p className="text-gray-600 text-sm">
          새로운 AI 도구와 활용 팁을 매주 전달합니다.
        </p>
      </div>
      <form
        action={formAction}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          name="email"
          placeholder="이메일 주소를 입력하세요"
          required
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? "처리 중..." : "구독하기"}
        </button>
      </form>
      {state?.message && !state.success && (
        <p className="mt-3 text-center text-sm text-red-600">{state.message}</p>
      )}
      <p className="mt-4 text-center text-xs text-gray-400">
        스팸 없이, 언제든 구독 취소 가능합니다.
      </p>
    </section>
  );
}
