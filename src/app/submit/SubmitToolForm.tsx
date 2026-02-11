"use client";

import { useActionState } from "react";
import { submitToolAction } from "@/actions/submit-tool";
import { CATEGORY_CONFIG } from "@/lib/categories";

export default function SubmitToolForm() {
  const [state, formAction, isPending] = useActionState(
    submitToolAction,
    null
  );

  if (state?.success) {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
        <p className="text-lg font-semibold text-green-700 mb-2">
          {state.message}
        </p>
        <p className="text-sm text-green-600">
          등록이 완료되면 이메일로 알려드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="tool_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          도구 이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="tool_name"
          name="tool_name"
          required
          placeholder="예: ChatGPT, Midjourney"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="tool_url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          웹사이트 URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="tool_url"
          name="tool_url"
          required
          placeholder="https://example.com"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          카테고리
        </label>
        <select
          id="category"
          name="category"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="">선택해주세요</option>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>
              {config.icon} {config.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          도구 설명
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="이 AI 도구가 어떤 기능을 제공하는지 간략히 설명해주세요."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="등록 결과를 받으실 이메일"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {state?.message && !state.success && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isPending ? "제출 중..." : "등록 요청하기"}
      </button>
    </form>
  );
}
