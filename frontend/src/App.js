import "./App.css";
import React, { useState } from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
// contexts
import { LogInModal, SignUpModal } from "./contexts/NavContext";
import { LoggedId } from "./contexts/ModalsContext";
import { QueryInput } from "./contexts/SearchContext";
import { UserModal, ReviewsModal } from "./contexts/UserContext";
import { LocationInfo } from "./contexts/LocationContext";

function App() {
  const [isHome, setIsHome] = useState(true);

  return (
    <LogInModal>
      <SignUpModal>
        <QueryInput>
          <LoggedId>
            <UserModal>
              <ReviewsModal>
                <LocationInfo>
                  <div className="App">
                    {isHome ? (
                      <Home setIsHome={setIsHome}></Home>
                    ) : (
                      <Search setIsHome={setIsHome}></Search>
                    )}
                  </div>
                </LocationInfo>
              </ReviewsModal>
            </UserModal>
          </LoggedId>
        </QueryInput>
      </SignUpModal>
    </LogInModal>
  );
}

export default App;
