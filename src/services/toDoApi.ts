import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toDoType } from "types/todoTypes";

type TodosResponse = toDoType[];
const BASE_URL = "http://localhost:3500";

export const todoApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodosResponse, void>({
      query: () => "/todos",
      transformResponse: (res: toDoType[]) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});
// createApiで定義したendpointsにあわせたhooksを自動生成してくれますので、利用するものをexportします。
// use + endpointsで定義した名称 + Query という名称で作成されるようです。
// 他にuseLazy + endpointsで定義した名称 + Queryも作成されます。
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
