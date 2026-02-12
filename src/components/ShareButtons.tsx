"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("링크가 복사되었습니다.");
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        toast.success("링크가 복사되었습니다.");
      } catch {
        toast.error("링크 복사에 실패했습니다.");
      }
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">공유:</span>
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
        title="X(Twitter)로 공유"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-600"
        title="카카오스토리 공유"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 3c-5.2 0-9.4 3.4-9.4 7.5 0 2.7 1.8 5 4.5 6.3l-1.1 4.1c-.1.3.3.6.5.4l4.9-3.2c.2 0 .4 0 .6 0 5.2 0 9.4-3.4 9.4-7.5S17.2 3 12 3z" />
        </svg>
      </a>
      <button
        onClick={handleCopy}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
        title="링크 복사"
      >
        {copied ? (
          <>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            복사됨
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            복사
          </>
        )}
      </button>
    </div>
  );
}
