import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Routes
import Home from "@/routes/Home/Home";
import Basic from "@/routes/Basic/Basic";
import Assignment from "@/routes/Assignment/Assignment";
import Assignment2 from "@/routes/Assignment2/Assignment2";
import PersonId from "@/routes/PersonId/PersonId";
import About from "@/routes/About/About";

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    <div style={{ padding: "10px 20px" }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basic" element={<Basic />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/assignment2" element={<Assignment2 />} />
            <Route path="/person/:id" element={<PersonId />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  );
}
