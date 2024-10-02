import React from "react"; // Import React
import { StrictMode } from "react"; // Import StrictMode for additional checks
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom
import App from "./App.jsx"; // Import your main App component
import "./index.css"; // Import your CSS styles
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import { Toaster } from "react-hot-toast"; // Import Toaster for notifications
import { AuthProvider } from "./context/auth.context.jsx"; // Import AuthProvider for authentication context

// Create a root element and render your application
const root = createRoot(document.getElementById("root")); // Create root using the 'root' div in index.html

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App /> {/* Render your main App component */}
        <Toaster /> {/* Render the Toaster for notifications */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
