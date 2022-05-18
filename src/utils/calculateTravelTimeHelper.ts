export const calculateTravelTimeHelper = (distance: number) => {
  const maxDailyDistance = 800;
  const totalTravelTimeDays = Math.ceil(distance / maxDailyDistance);
  return totalTravelTimeDays;
};

export default calculateTravelTimeHelper;
