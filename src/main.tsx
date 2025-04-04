import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorPage } from "./pages/404.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { IntroductionPage } from "./pages/App/IntroductionPage.tsx";
import { OtherPage } from "./pages/Other/OtherPage.tsx";
import { BirthdayContainer } from "./pages/Other/Birthday/BirthdayContainer.tsx";
import { WorkExperienceCanvas } from "./pages/App/Resume/WorkExperience.tsx";
import { Gallery } from "./pages/Gallery/Gallery.tsx";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/MainTheme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<IntroductionPage />} />
            <Route path="work" element={<WorkExperienceCanvas />} />
          </Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/misc" element={<OtherPage />}>
            <Route path="birthday" element={<BirthdayContainer />} />
          </Route>
          <Route path="*" errorElement={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
