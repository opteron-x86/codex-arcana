import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AnimatePresence } from "framer-motion";
import DarkSoulsNav from "./components/layout/DarkSoulsNav";
import HomePage from "./pages/Home";
import GamePage from "./pages/Game";
import CollectionPage from "./pages/Collection";
import LeaderboardPage from "./pages/Leaderboard";
import ShopPage from "./pages/Shop";
import AuthForms from "./features/auth/components/AuthForms";
import ParticleBackground from "./components/common/ParticleBackground";
import LoadingScreen from "./components/common/LoadingScreen";
import RouteTransition from "./components/common/RouteTransition";
import { Flame } from "lucide-react";

// AnimatePresence wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={
          <RouteTransition>
            <HomePage />
          </RouteTransition>
        } />
        
        {/* Auth Routes */}
        <Route path="/auth" element={
          <AuthRoute>
            <RouteTransition variant="combat">
              <div className="relative min-h-screen bg-dark-bg">
                <ParticleBackground />
                <AuthForms />
              </div>
            </RouteTransition>
          </AuthRoute>
        } />

        {/* Protected Routes */}
        <Route path="/game" element={
          <ProtectedRoute>
            <RouteTransition variant="fade">
              <GamePage />
            </RouteTransition>
          </ProtectedRoute>
        } />
        <Route path="/collection" element={
          <ProtectedRoute>
            <RouteTransition variant="scale">
              <CollectionPage />
            </RouteTransition>
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <RouteTransition variant="scroll">
              <LeaderboardPage />
            </RouteTransition>
          </ProtectedRoute>
        } />
        <Route path="/shop" element={
          <ProtectedRoute>
            <RouteTransition variant="slide">
              <ShopPage />
            </RouteTransition>
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthenticator();

  if (isLoading) {
    return <LoadingScreen message="Preparing Battle" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AuthRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthenticator();

  if (isLoading) {
    return <LoadingScreen message="Checking Status" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/game" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isAuthenticated, isLoading } = useAuthenticator();

  if (isLoading) {
    return <LoadingScreen message="Kindling the Flames" />;
  }

  return (
    <Router>
      <div className="bg-dark-bg text-off-white min-h-screen flex">
        {isAuthenticated && <DarkSoulsNav />}
        
        <main className={`flex-1 ${isAuthenticated ? 'ml-20' : ''}`}>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;