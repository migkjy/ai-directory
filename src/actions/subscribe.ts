"use server";

import { Pool } from "@neondatabase/serverless";

interface ActionResult {
  success: boolean;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email")?.toString().trim().toLowerCase();

  if (!email) {
    return { success: false, message: "이메일을 입력해주세요." };
  }

  if (!isValidEmail(email)) {
    return { success: false, message: "올바른 이메일 형식을 입력해주세요." };
  }

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    await pool.query(
      "INSERT INTO subscribers (email, source) VALUES ($1, 'directory') ON CONFLICT (email) DO NOTHING",
      [email]
    );
    return {
      success: true,
      message: "구독 완료! 매주 새로운 AI 도구 소식을 보내드릴게요.",
    };
  } catch {
    return {
      success: false,
      message: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
