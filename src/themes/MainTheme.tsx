import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import AtomicAge from "../assets/fonts/AtomicAge-Regular.woff2";
import BrunoAceSC from "../assets/fonts/BrunoAceSC-Regular.woff2";
import Megrim from "../assets/fonts/Megrim-Regular.woff2";
import ConcertOne from "../assets/fonts/ConcertOne-Regular.woff2";
import FacultyGlyphic from "../assets/fonts/FacultyGlyphic-Regular.woff2";
import JacquardaBastarda from "../assets/fonts/JacquardaBastarda9-Regular.woff2";
import Jersey25 from "../assets/fonts/Jersey25-Regular.woff2";
import LavishlyYours from "../assets/fonts/LavishlyYours-Regular.woff2";
import PressStart from "../assets/fonts/PressStart2P-Regular.woff2";
import Shrikhand from "../assets/fonts/Shrikhand-Regular.woff2";
import SixtyFour from "../assets/fonts/Sixtyfour-Regular-VariableFont_BLED,SCAN.woff2";
import SourGummy from "../assets/fonts/SourGummy-VariableFont_wdth,wght.woff2";
import ViaodaLibre from "../assets/fonts/ViaodaLibre-Regular.woff2";

const STATIC_COLOR = "rgb(43, 31, 31)";
const bkgGradient = `radial-gradient(60% 105% at 0% 0%,rgb(26, 76, 116) 10%, ${STATIC_COLOR})`;

const mainTheme = createTheme({
  colorSchemes: { dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        style: {
          background: bkgGradient,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'atomic';
          src: local('AtomicAge'), local('AtomicAge-Regular'), url(${AtomicAge}) format('woff2');
        }
        @font-face {
          font-family: 'bruno';
          src: local('BrunoAceSC'), local('BrunoAceSC-Regular'), url(${BrunoAceSC}) format('woff2');
        }
        @font-face {
          font-family: 'megrim';
          src: local('Megrim'), local('Megrim-Regular'), url(${Megrim}) format('woff2');
        }
        @font-face {
          font-family: 'concert';
          src: local('ConcertOne'), local('ConcertOne-Regular'), url(${ConcertOne}) format('woff2');
        }
        @font-face {
          font-family: 'faculty';
          src: local('FacultyGlyphic'), local('FacultyGlyphic-Regular'), url(${FacultyGlyphic}) format('woff2');
        }
        @font-face {
          font-family: 'jac';
          src: local('JacquardaBastarda9'), local('JacquardaBastarda9-Regular'), url(${JacquardaBastarda}) format('woff2');
        }
        @font-face {
          font-family: 'jersey';
          src: local('Jersey25'), local('Jersey25-Regular'), url(${Jersey25}) format('woff2');
        }
        @font-face {
          font-family: 'lavish';
          src: local('LavishlyYours'), local('LavishlyYours-Regular'), url(${LavishlyYours}) format('woff2');
        }
        @font-face {
          font-family: 'start';
          src: local('PressStart2P'), local('PressStart2P-Regular'), url(${PressStart}) format('woff2');
        }
        @font-face {
          font-family: 'shrik';
          src: local('Shrikhand'), local('Shrikhand-Regular'), url(${Shrikhand}) format('woff2');
        }
        @font-face {
          font-family: 'sixty';
          src: local('Sixtyfour'), local('Sixtyfour-Regular'), url(${SixtyFour}) format('woff2');
        }
        @font-face {
          font-family: 'sour';
          src: local('SourGummy'), local('SourGummy-Regular'), url(${SourGummy}) format('woff2');
        }
        @font-face {
          font-family: 'viaoda';
          src: local('ViaodaLibre'), local('ViaodaLibre-Regular'), url(${ViaodaLibre}) format('woff2');
        }
      `,
    },
  },
});

export const theme = responsiveFontSizes(mainTheme);
