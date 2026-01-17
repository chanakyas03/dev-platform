"use client";

import { useGetOrdersQuery } from "@/store/api/orderApi";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams.get("status") || "";

  const { data, isLoading, isError } = useGetOrdersQuery({
    page,
    limit: 10,
    status: status || undefined,
  });

  const setParams = (params: { page?: number; status?: string }) => {
    const newParams = new URLSearchParams();

    const nextPage = params.page ?? page;
    const nextStatus = params.status ?? status;

    if (nextPage > 1) newParams.set("page", String(nextPage));
    if (nextStatus) newParams.set("status", nextStatus);

    router.push(`?${newParams.toString()}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Orders</h1>

      <select
        className="border p-2 mb-4"
        value={status}
        onChange={(e) => setParams({ status: e.target.value || "", page: 1 })}
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="PROCESSING">Processing</option>
        <option value="DELIVERED">Delivered</option>
      </select>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((order) => (
            <tr key={order.id} className="border-b">
              <td>{order.orderId}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>₹{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setParams({ page: page - 1 })}
        >
          Prev
        </button>
        <button onClick={() => setParams({ page: page + 1 })}>Next</button>
      </div>
    </div>
  );
}
