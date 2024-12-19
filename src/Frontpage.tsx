import Navbar from "./Navbar";

const Frontpage = () => {
  return (
    <div className="bg-dark-bg text-off-white min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        <header className="mb-8">
          <h1 className="text-gold text-4xl font-serif">Triple Triad</h1>
          <p className="text-light-gray text-lg">
            Experience the ultimate card game in a dark fantasy RPG universe.
          </p>
        </header>
        <nav className="space-x-4">
          <a
            href="/game"
            className="bg-gold text-dark-bg px-4 py-2 rounded hover:bg-ember transition"
          >
            Play Now
          </a>
          <a
            href="/login"
            className="bg-medium-gray text-off-white px-4 py-2 rounded hover:bg-light-gray transition"
          >
            Sign In
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Frontpage;
