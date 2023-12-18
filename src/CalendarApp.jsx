import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./router/AppRoute";
import { store } from "./store";

export const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </Provider>
  )
}
