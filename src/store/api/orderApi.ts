import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOrders: builder.query<
      {
        data: any[];
        total: number;
      },
      { page: number; limit: number; status?: string }
    >({
      query: ({ page, limit, status }) => ({
        url: "orders",
        params: { page, limit, status },
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
