import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NovoAgendamento from "./pages/NovoAgendamento";
import EditarAgendamento from "./pages/EditarAgendamento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/novo-agendamento"
          element={<NovoAgendamento />}
        />

        <Route
          path="/editar-agendamento/:id"
          element={<EditarAgendamento />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;