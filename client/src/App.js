import React from "react";
import "./App.css";
import SignatrueComponent from "./views/SignatrueComponent";
import { StyledAppTitle, StyledMainContainer } from "./views/sharedStyles";

function App() {
  return (
    <>
      <StyledAppTitle>Signature DApp </StyledAppTitle>
      <StyledMainContainer>
        <SignatrueComponent />
      </StyledMainContainer>
    </>
  );
}

export default App;
