import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import TicketControl from "./TicketControl";

function App() {
  return (
    <React.Fragment>
      <SearchBar />
      <Header />
      <TicketControl />
    </React.Fragment>
  );
}

export default App;
