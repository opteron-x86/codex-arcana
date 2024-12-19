import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import Frontpage from "./Frontpage";

import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Frontpage route */}
        <Route path="/" element={<Frontpage />} />
        
        {/* Authenticated Game route */}
        <Route
          path="/game"
          element={
            <Authenticator>
              {({ user }) =>
                user ? <GamePage /> : <Navigate to="/" replace />
              }
            </Authenticator>
          }
        />

        {/* Fallback to Frontpage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
