import React, { useState, useEffect } from "react";

const ListPagination = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const result = await response.json();
      setTodos(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const pagesPerSize = 5;

  const totalPages = Math.ceil(todos.length / pagesPerSize);

  const indexOfLastPage = (currentPage + 1) * pagesPerSize;
  const indexOfFirstPage = indexOfLastPage - pagesPerSize;
  const currentTodos = todos.slice(indexOfFirstPage, indexOfLastPage);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="listing">
      <h1>Todos List</h1>
      <table border="1">
        <tr>
          <th>UserId</th>
          <th>Id</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
        {currentTodos.map((todo) => {
          return (
            <tr>
              <td>{todo.userId}</td>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed.toString()}</td>
            </tr>
          );
        })}
      </table>
      <button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default ListPagination;
