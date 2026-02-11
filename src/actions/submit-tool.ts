"use server";

import { Pool } from "@neondatabase/serverless";

interface ActionResult {
  success: boolean;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function submitToolAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const toolName = formData.get("tool_name")?.toString().trim();
  const toolUrl = formData.get("tool_url")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || null;
  const description = formData.get("description")?.toString().trim() || null;
  const email = formData.get("email")?.toString().trim().toLowerCase();

  if (!toolName) {
    return { success: false, message: "도구 이름을 입력해주세요." };
  }

  if (!toolUrl || !isValidUrl(toolUrl)) {
    return { success: false, message: "올바른 URL을 입력해주세요." };
  }

  if (!email || !isValidEmail(email)) {
    return { success: false, message: "올바른 이메일을 입력해주세요." };
  }

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    await pool.query(
      `INSERT INTO tool_submissions (tool_name, tool_url, category, description, submitter_email)
       VALUES ($1, $2, $3, $4, $5)`,
      [toolName, toolUrl, category, description, email]
    );
    return {
      success: true,
      message:
        "등록 요청이 접수되었습니다! 검토 후 등록해드리겠습니다. 감사합니다.",
    };
  } catch {
    return {
      success: false,
      message: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
