import { render, screen } from "@testing-library/react";
import Home from "./home";
import { store } from "store";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe("<Home/>", () => {
  const setup = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  };

  it("should display starting point input", () => {
    setup();
    screen.getByLabelText("Choose a starting point");
  });
  it("should display destination point input", () => {
    setup();

    screen.getByLabelText("Choose a destination point");
  });
});
