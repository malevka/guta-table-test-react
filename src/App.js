import React from "react";
import "./App.css";
import TableWrapper from "./components/table-wrapper/table-wrapper.component";

function App() {
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";
  const commentsUrl = "https://jsonplaceholder.typicode.com/comments";
  const usersUrl = "https://jsonplaceholder.typicode.com/users";
  return (
    <div className="App">
      <TableWrapper url={postsUrl} filter="userId" />
      {/*  <TableWrapper url={commentsUrl} filter="postId"/> */}

      <TableWrapper url={usersUrl} filter="username" />
    </div>
  );
}

export default App;
