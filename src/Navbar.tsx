import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Navbar() {
  const { user, signOut } = useAuthenticator();

  return (
    <nav className="bg-dark-gray text-off-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-gold text-3xl font-bold font-serif">
          Codex Arcana
        </h1>
        <div className="space-x-4">
          <a href="/" className="hover:text-gold transition">Home</a>
          <a href="/forum" className="hover:text-gold transition">Forum</a>
          <a href="/wiki" className="hover:text-gold transition">Wiki</a>
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button
                onClick={signOut}
                className="bg-ember hover:bg-gold text-dark-bg px-4 py-2 rounded-full transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-gold hover:bg-light-gray text-dark-bg px-4 py-2 rounded-full transition"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
