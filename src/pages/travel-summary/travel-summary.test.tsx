import TravelSummary from "./travel-summary";
import { render, screen } from "test-utils";

describe("<TravelSummary/>", () => {
  const setup = () => {
    return render(<TravelSummary />, {
      preloadedState: {
        coordinates: {
          startingCity: "Krakow, Poland",
          destinationCity: "Szczecin, West Pomeranian Voivodeship, Poland",
          distance: 531.4957457044421,
        },
        travelDetails: {
          travelCost: 584.6453202748864,
          travelTime: 1,
        },
      },
    });
  };

  it("should display starting and destination places name", () => {
    setup();
    screen.getByText(
      "From: Krakow, Poland, To: Szczecin, West Pomeranian Voivodeship, Poland"
    );
  });

  it("should display travel cost", () => {
    setup();
    expect(screen.getByText("Travel cost: 584.65")).toBeInTheDocument();
  });

  it("should display travel time", () => {
    setup();
    expect(
      screen.getByText("You will reach your destination within: 1 day")
    ).toBeInTheDocument();
  });

  it("should display distance", () => {
    setup();
    expect(screen.getByText("Distance: 531 km")).toBeInTheDocument();
  });

  it("should display export button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: "EXPORT A REPORT TO PDF" })
    ).toBeInTheDocument();
  });
});
