import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import TableDef from "./pages/TableDef"
import Table from "./pages/Table"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import ProtectedRoute from "./utils/ProtectedRoute"
import { ForgotPassword } from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/task" element={<TableDef />} />
        <Route path="/task/:tableId" element={<Table />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/passwordReset" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
