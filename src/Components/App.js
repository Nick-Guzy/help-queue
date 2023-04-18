import React from "react";
import Header from "./Header";
import TicketList from "./TicketList";
import SearchBar from "./SearchBar";

function App() {
  return (
   <React.Fragment>
    <SearchBar />
    <Header />
    <TicketList />
   </React.Fragment>
  );
}

export default App;
