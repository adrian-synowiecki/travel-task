import Home from "./home";
import { render, screen } from "test-utils";

describe("<Home/>", () => {
  const setup = () => {
    return render(<Home />);
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
