import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import Navbar from "./scenes/navbar";
// import Navbar from "@/scenes/navbar";
import Dashboard from "./scenes/dashboard";
// import Predictions from "./scenes/predictions";
import { Provider } from "react-redux";
// import { api } from "./state/api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

function MainDash() {
  const theme = useMemo(() => createTheme(themeSettings), []);
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
