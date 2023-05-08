import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import TicketControl from "./TicketControl";
import ToggleTheme from "./ToggleTheme";

function App() {
  return (
    <React.Fragment>
      <SearchBar />
      <Header />
      <ToggleTheme />
      <TicketControl />
    </React.Fragment>
  );
}

export default App;
