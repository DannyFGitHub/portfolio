import Box from "@mui/material/Box";
import { useColorScheme } from "@mui/material/styles";
import ToggleIcon from "../../../components/ToggleIcon";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function DarkModeToggle2DButton() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <IconButton
      color="primary"
      onClick={() => {
        setMode(mode === "dark" ? "light" : "dark");
      }}
    >
      <ToggleIcon
        on={mode === "light"}
        onIcon={<LightModeIcon />}
        offIcon={<DarkModeIcon />}
      />
    </IconButton>
  );
}

export function DarkModeToggle2DFloatingComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
        zIndex: 9999,
        minHeight: "56px",
      }}
      style={{
        background: "none",
      }}
    >
      <DarkModeToggle2DButton />
    </Box>
  );
}
