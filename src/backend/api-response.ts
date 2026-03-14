import { NextResponse } from "next/server";

type ErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "BAD_REQUEST"
  | "CONFLICT"
  | "INTERNAL_ERROR";

export function unauthorized() {
  return NextResponse.json(
    { error: { code: "UNAUTHORIZED", message: "ログインが必要です" } },
    { status: 401 },
  );
}

export function forbidden() {
  return NextResponse.json(
    { error: { code: "FORBIDDEN", message: "権限がありません" } },
    { status: 403 },
  );
}

export function apiError(
  code: ErrorCode,
  message: string,
  status: number,
  details?: unknown,
) {
  return NextResponse.json(
    { error: { code, message, ...(details ? { details } : {}) } },
    { status },
  );
}
