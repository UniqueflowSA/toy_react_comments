import { useState, useReducer } from "react";
import CommentsList from "./components/CommentsList";
import CreateComments from "./components/CreateComments";
import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ONCHANGE_FORM":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "ONSUBMIT_FORM":
      const getCommentsId = Math.floor(Math.random() * 10000000000000);
      const getCommentsDate = new Date().toLocaleString();

      return {
        ...state,
        commentsId: getCommentsId,
        date: getCommentsDate,
      };
    case "ONRESET_FORM":
      return {
        commentsId: 0,
        nickname: "",
        password: "",
        content: "",
        date: "",
      };
  }
}

function App() {
  return (
    <>
      <GlobalStyle />
      <CreateComments />
      <CommentsList />
    </>
  );
}

export default App;
