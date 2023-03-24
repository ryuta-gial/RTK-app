import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "services/toDoApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "store/reduxHooks";
import { addTdoData } from "slices/todoSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const { todo } = useAppSelector((state) => state.todoState);
  const dispatch = useAppDispatch();

  // 状態を取得
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    dispatch(addTdoData({ userId: 1, id: 1, title: "world", completed: true }));

    setNewTodo("");
  };

  console.log(todo);
  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      //JSON.stringify(todos)
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={`${todo.id}`}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={`${todo.id}`}>{todo.title}</label>
          </div>
          <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    if (typeof error === "string") {
      content = <h3>{error}</h3>;
    } else if (error instanceof Error) {
      content = <h3>{error.message}</h3>;
    }
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
