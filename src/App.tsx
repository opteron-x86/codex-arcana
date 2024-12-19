import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./Frontpage";
import Navbar from "./Navbar";



const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main className="bg-dark-bg text-off-white min-h-screen p-6 font-serif flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center py-4 px-8 bg-dark-gray shadow-md">
        <h1 className="text-gold text-3xl font-bold drop-shadow-lg">
          {user?.signInDetails?.loginId}'s Chronicles
        </h1>
        <button
          onClick={signOut}
          className="bg-ember hover:bg-gold text-dark-bg px-6 py-2 rounded-full shadow-inner-glow hover:shadow-md transition-all duration-200"
        >
          Sign Out
        </button>
      </header>

      {/* Todo Section */}
      <section className="flex-grow container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-light-gray">Quests</h2>
          <button
            onClick={createTodo}
            className="bg-gold hover:bg-light-gray text-dark-bg px-4 py-2 rounded-full shadow hover:shadow-lg transition-all duration-200"
          >
            + New Quest
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-dark-gray text-off-white p-4 rounded-md shadow hover:bg-medium-gray transition-all duration-200 cursor-pointer"
              onClick={() => deleteTodo(todo.id)}
            >
              {todo.content}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center bg-dark-gray mt-8 text-medium-gray">
        <p>
          🥳 Your adventure begins. Create new quests and explore the unknown.
        </p>
        <a
          href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates"
          className="text-gold underline hover:text-off-white transition-all duration-200"
        >
          Learn more about this realm.
        </a>
      </footer>
    </main>
  );
}

export default App;
