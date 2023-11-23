import Home from "./pages/home";
import Form from "./pages/form";
import NotFound from "./pages/not-found";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TasksProvider } from "./context/TaskContext";
 
function AppRoutes() {
  return (
    <TasksProvider>      
    <Router>
      <Routes>
        {/* GET ALL + DELETE */}
          <Route path="/home" element={<Home />} />
        {/* GET BY ID */}
          <Route path="/task/:id" element={<Form />} />
        {/* POST */}
          <Route path="/new" element={<Form />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </TasksProvider>
  )
}
 
export default AppRoutes;
 