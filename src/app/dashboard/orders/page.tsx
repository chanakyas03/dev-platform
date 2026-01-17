"use client";

import { useState } from "react";
import { useGetOrdersQuery } from "@/store/api/orderApi";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>();

  const { data, isLoading, isError } = useGetOrdersQuery({
    page,
    limit: 10,
    status,
  });

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to load orders</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Orders</h1>

      <select
        className="border p-2 mb-4"
        onChange={(e) => setStatus(e.target.value || undefined)}
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
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
