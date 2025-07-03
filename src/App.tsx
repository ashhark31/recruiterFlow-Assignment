import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { PageNotFound } from "./pages/PageNotFound"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
])

function App() {

  return (
    <RouterProvider key={'single'} router={router} />
  )
}

export default App
