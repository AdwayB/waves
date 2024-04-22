const calculateDistance = (coords1: [number, number], coords2: [number, number]): number => {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 6371;

  const latDist = (lat2 - lat1) * (Math.PI / 180);
  const lonDist = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(latDist / 2) * Math.sin(latDist / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(lonDist / 2) * Math.sin(lonDist / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export { calculateDistance };
