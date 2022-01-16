import { useState } from "react";
import "./App.css";
import IndexScreen from "./screens/IndexScreen";
import LoginScreen from "./screens/loginScreen.tsx/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";

import { auth, onAuthStateChanged } from "./utils/firebase";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      setUserLoggedIn(user.email);
    }
    setLoading(false);
  });

  return (
    <div>
      <div>
        {loading ? (
          <LoadingScreen />
        ) : userLoggedIn ? (
          <IndexScreen loggedInUser={userLoggedIn} />
        ) : (
          <LoginScreen />
        )}
      </div>
    </div>
  );
}

export default App;
