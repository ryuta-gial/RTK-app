import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Types
import { initialState, toDoType } from "types/todoTypes";
import { todoApi } from "services/toDoApi";
export const todoSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addTdoData: (state, action: PayloadAction<toDoType>) => {
      return {
        ...state,
        todo: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // createAsyncThunkと違いaddMatcherで成功失敗の状態を取得可能です。
      /** RTK Queryのカスタムフックでローディングステータスを取得できるので、
       * 下記のようなローディング状態の取得のためだけの利用であれば不要だと思います。
       */
      // .addMatcher(authApi.endpoints.login.matchPending, (state) => {
      //   state.status = 'loading';
      // })
      .addMatcher(
        todoApi.endpoints.getTodos.matchFulfilled,
        (state, action: PayloadAction<toDoType[]>) => {
          // state.status = 'idle';
          return {
            ...state,
            todoList: action.payload,
          };
        }
      );
    //.pendingやfulfilledや.rejectedで処理を分けられる
    // .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
    //   state.status = 'idle';
    //      .addCase(incrementAsync.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(incrementAsync.fulfilled, (state, action) => {
    //   state.status = 'idle';
    //   state.value += action.payload;
    //})
    //.addCase(incrementAsync.rejected, (state) => {
    //  state.status = 'failed';
    //});

    // });
  },
});

// Action creators are generated for each case reducer function
export const { addTdoData } = todoSlice.actions;

export default todoSlice.reducer;
