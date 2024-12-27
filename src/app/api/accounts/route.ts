// src/app/api/accounts/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // 模拟数据库中账户数据
  const accounts = [
    { id: "1", name: "患者太郎" },
    { id: "2", name: "患者花子" },
    { id: "3", name: "患者三郎" },
  ];

  return NextResponse.json(accounts); // 返回账户数据
}