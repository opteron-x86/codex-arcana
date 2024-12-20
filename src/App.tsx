import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./features/auth/AuthContext";
import DarkSoulsNav from "./components/layout/DarkSoulsNav";
import HomePage from "./pages/Home";
import GamePage from "./pages/Game";
import CollectionPage from "./pages/Collection";
import LeaderboardPage from "./pages/Leaderboard";
import ShopPage from "./pages/Shop";
import AuthForms from "./features/auth/components/AuthForms";
import LoadingScreen from "./components/common/LoadingScreen";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <Router>
      <div className="bg-dark-bg text-off-white min-h-screen flex">
        {isAuthenticated && <DarkSoulsNav />}
        
        <main className={`flex-1 ${isAuthenticated ? 'ml-20' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/auth" 
              element={
                isAuthenticated ? <Navigate to="/game" replace /> : <AuthForms />
              } 
            />
            {/* Protected Routes */}
            <Route 
              path="/game" 
              element={
                isAuthenticated ? <GamePage /> : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/collection" 
              element={
                isAuthenticated ? <CollectionPage /> : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/leaderboard" 
              element={
                isAuthenticated ? <LeaderboardPage /> : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/shop" 
              element={
                isAuthenticated ? <ShopPage /> : <Navigate to="/auth" replace />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;