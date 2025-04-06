import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { pages } from "./MiscPages";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";

export function MiscLandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h3">Collection of Miscellanous Things...</Typography>

      {pages.map((page) => (
        <MenuItem
          key={page.display}
          onClick={() => {
            navigate(page.location);
          }}
        >
          <Typography sx={{ textAlign: "center" }}>{page.display}</Typography>
        </MenuItem>
      ))}
    </Box>
  );
}
