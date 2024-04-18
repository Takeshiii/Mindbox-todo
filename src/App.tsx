import { FC } from "react";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
import CssBaseline from "@mui/material/CssBaseline";
import { MainPage } from "./components/Pages/Main";

const store = setupStore();

export const App: FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <MainPage />
    </Provider>
  );
};
