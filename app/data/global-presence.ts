export const teamLocations = [
  { city: "Karachi", countryState: "Pakistan", latitude: 24.8607, longitude: 67.0011, labelSide: "above" },
  { city: "Dubai", countryState: "UAE", latitude: 25.2048, longitude: 55.2708, labelSide: "below" },
] as const;

// public/world-map-dots.svg uses viewBox="0 0 900 450" in an equirectangular
// projection: x = (longitude + 180) * 2.5, y = (90 - latitude) * 2.5.
// The display crops the empty southern margin to 390 units without moving the land.
export const presenceMap = { width: 900, height: 450, viewportHeight: 390 } as const;

// Marker position as a percentage of the cropped map, so markers stay on their cities at any width.
export function projectLocation(latitude: number, longitude: number) {
  return {
    left: ((longitude + 180) / 360) * 100,
    top: (((90 - latitude) / 180) * presenceMap.height / presenceMap.viewportHeight) * 100,
  };
}
