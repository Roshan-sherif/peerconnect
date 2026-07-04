import { AppRouter } from "./routes";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="peerconnect-theme">
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
