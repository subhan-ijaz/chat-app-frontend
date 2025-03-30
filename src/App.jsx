import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import ProtectedRoute from "./lib/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import { ProfileProvider } from "./lib/profileContext";
import ProfileView from "./components/ui/ProfileView";
import Chat from "./components/ui/Chat";

const App = () => {
  return (
    <ProfileProvider>
      <section className="min-h-screen w-screen flex items-stretch justify-center ">
        <div className="lg:container w-full min-h-screen p-0 md:pt-3">
          <Routes>
            <Route path="/login" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            >
              <Route path="/profileview" element={<Chats />} />
              <Route path="/chat" element={<Chat />}>
                <Route path=":userid" element={<Chat />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </section>
    </ProfileProvider>
  );
};

export default App;
