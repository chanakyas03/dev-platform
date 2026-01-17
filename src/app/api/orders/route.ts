import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const orders = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    orderId: `ORD-${1000 + i}`,
    customer: `Customer ${i + 1}`,
    status: ["PENDING", "PROCESSING", "DELIVERED"][i % 3],
    amount: Math.floor(Math.random() * 5000),
  }));

  return NextResponse.json({
    data: orders,
    total: 20,
    page,
    limit,
  });
}
