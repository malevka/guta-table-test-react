import React from "react";
import "./App.css";
import TableWrapper from "./components/table-wrapper/table-wrapper.component";

function App() {
  const postsUrl = "https://jsonplaceholder.typicode.com/posts?_limit=";
  const commentsUrl = "https://jsonplaceholder.typicode.com/comments?_limit=";
  const usersUrl = "https://jsonplaceholder.typicode.com/users?_limit=";
  return (
    <div className="App">
      <TableWrapper url={postsUrl} filter="userId" />
      {/*  <TableWrapper url={commentsUrl} filter="postId"/> */}

      <TableWrapper url={usersUrl} filter="username" />
    </div>
  );
}

export default App;
