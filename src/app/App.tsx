import { StyledEngineProvider } from "@mui/material/styles";
import { RootPage } from "../pages/root.page";
import { QuerySnackProvider } from "../providers/query-snack-context.provider";
import "./App.css";

function App() {
  return (
    <QuerySnackProvider>
      <StyledEngineProvider injectFirst>
        <RootPage></RootPage>
      </StyledEngineProvider>
    </QuerySnackProvider>
  );
}

export default App;
