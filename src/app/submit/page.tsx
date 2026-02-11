import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubmitToolForm from "./SubmitToolForm";

export const metadata: Metadata = {
  title: "AI 도구 등록 요청",
  description:
    "새로운 AI 도구를 AI AppPro 디렉토리에 등록 요청하세요. 검토 후 등록해드립니다.",
};

export default function SubmitPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              AI 도구 등록 요청
            </h1>
            <p className="text-gray-600">
              새로운 AI 도구를 AI AppPro 디렉토리에 등록하고 싶으신가요? 아래
              양식을 작성해주시면 검토 후 등록해드립니다.
            </p>
          </div>

          <SubmitToolForm />

          <div className="mt-8 rounded-xl bg-yellow-50 border border-yellow-200 p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">
              상위 노출을 원하시나요?
            </h3>
            <p className="text-sm text-yellow-700">
              Featured Listing으로 디렉토리 상단에 AI 도구를 노출할 수 있습니다.
              자세한 내용은 이메일로 문의해주세요.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
