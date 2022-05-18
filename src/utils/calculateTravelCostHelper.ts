const calculateTravelCostHelper = (
  costPerKilometer: number,
  distance: number
) => {
  const totalCostMultiplier = 1.1;
  const totalCost = distance * costPerKilometer * totalCostMultiplier;
  return totalCost;
};

export default calculateTravelCostHelper;
