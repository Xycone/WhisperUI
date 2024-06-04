import { Routes, Route } from 'react-router-dom';

// MUI Theme
import { Box } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColourModeContext, useMode } from './themes/MyTheme.js';

// React Components
import Topbar from './components/Topbar.jsx';
import Sidebar from './components/Sidebar.jsx';

// Pages
import TranscribeFiles from './pages/TranscribeFiles.jsx';

function App() {
  const [theme, colourMode] = useMode();

  return (
    <ColourModeContext.Provider value={colourMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/transcribefiles" element={<TranscribeFiles />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColourModeContext.Provider>
  );
}
export default App;
