import { Routes, Route } from 'react-router-dom';

// MUI Theme
import { Box } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColourModeContext, useMode } from './themes/MyTheme.js';

// React Components
import Topbar from './components/Topbar.jsx';
import Sidebar from './components/Sidebar.jsx';

// Pages
import TranscribeAPI from './pages/APIs.jsx';

function App() {
  const [theme, colourMode] = useMode();

  return (
    <ColourModeContext.Provider value={colourMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Box>
            <Sidebar />
          </Box>
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/APIs" element={<TranscribeAPI />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColourModeContext.Provider>
  );
}
export default App;
