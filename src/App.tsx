import { Outlet } from "react-router";

import { DarkModeToggle2DFloatingComponent } from "./pages/App/components/DarkModeToggle2D";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box style={{ height: "100%", width: "100%" }}>
      <Box
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 100,
        }}
      >
        <DarkModeToggle2DFloatingComponent />
      </Box>
      <Box
        style={{
          position: "absolute",
          overflow: "scroll",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
