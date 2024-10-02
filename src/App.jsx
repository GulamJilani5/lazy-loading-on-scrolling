import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import RootLayout from "./pages/Rootlayout";
import ErrorPage from "./pages/ErrorPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import Spinner from "./components/spinner/Spinner";
import { ErrorBoundary } from "react-error-boundary";

const queryClinet = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/cart",
      },
      {
        path: "/product",
      },
    ],
  },
]);

function App() {
  return (
    // <ErrorBoundary fallback={<ErrorPage />}>
    <QueryClientProvider client={queryClinet}>
      {/* <Suspense fallback={<Spinner />}> */}
      <RouterProvider router={router}></RouterProvider>
      {/* </Suspense> */}
    </QueryClientProvider>
    // {/* </ErrorBoundary> */}
  );
}

export default App;
