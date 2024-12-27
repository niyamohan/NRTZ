import { NextResponse } from "next/server";

// 模拟患者数据
const patients = [
  { id: "1", name: "患者太郎", registeredAt: "2023-12-01T10:00:00Z" },
  { id: "2", name: "患者花子", registeredAt: "2023-12-02T12:00:00Z" },
  { id: "3", name: "患者三郎", registeredAt: "2023-12-03T14:00:00Z" },
];

export async function GET() {
  // 按注册顺序返回患者数据
  return NextResponse.json(patients);
}