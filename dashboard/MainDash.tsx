import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useEffect } from "react";
import { themeSettings } from "./theme";
import Navbar from "./scenes/navbar";
import Dashboard from "./scenes/dashboard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
import { useRouter } from "next/router"; // Import the useRouter hook from Next.js

// Function to check if the token is available in local storage
const isTokenAvailable = () => {
  const token = localStorage.getItem("token");
  return !!token; // Return true if token exists, false otherwise
};

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

function MainDash() {
  // const theme = useMemo(() => createTheme(themeSettings));
  const theme = useMemo(() => createTheme(themeSettings), []);
  const router = useRouter(); // Initialize the router

  // Check if the token is available in local storage
  const tokenAvailable = isTokenAvailable();

  // Use useEffect to handle the redirection
  useEffect(() => {
    if (!tokenAvailable) {
      // Redirect to the /login page
      router.push("/login");
    }
  }, [tokenAvailable, router]);

  return (
    <div className="app" style={{ marginTop: "100px" }}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Dashboard />
          </Box>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default MainDash;
