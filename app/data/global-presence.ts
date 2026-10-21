export const teamLocations = [
  { city: "Chicago", countryState: "Illinois, USA", region: "North America", abbreviation: "CHI", latitude: 41.8781, longitude: -87.6298 },
  { city: "Karachi", countryState: "Pakistan", region: "South Asia", abbreviation: "KHI", latitude: 24.8607, longitude: 67.0011 },
  { city: "Dubai", countryState: "UAE", region: "Middle East", abbreviation: "DXB", latitude: 25.2048, longitude: 55.2708 },
] as const;

// The land asset has viewBox="0 0 900 450", no crop or transforms.
// Plate carree (equirectangular): longitude [-180, 180], latitude [90, -90].
// The display viewport omits only the empty southern margin; projection
// dimensions stay unchanged, so land and geographic anchors never move.
export const presenceMap = { width: 900, height: 450, viewportHeight: 390, labelWidth: 90, labelHeight: 48 } as const;

export function projectLocation(latitude: number, longitude: number) {
  return {
    x: (longitude + 180) * presenceMap.width / 360,
    y: (90 - latitude) * presenceMap.height / 180,
  };
}

type Box = { left: number; top: number; right: number; bottom: number };

function intersects(a: Box, b: Box, gap = 0) {
  return a.left < b.right + gap && a.right > b.left - gap
    && a.top < b.bottom + gap && a.bottom > b.top - gap;
}

export function getTeamMarkers() {
  const points = teamLocations.map((location) => ({ ...location, ...projectLocation(location.latitude, location.longitude) }));
  const occupied: Box[] = [];
  const { width, viewportHeight, labelWidth, labelHeight } = presenceMap;

  return points.map((point) => {
    // Search outward only when necessary. Both labels and dots use SVG units,
    // so spacing and collision decisions remain valid at every rendered size.
    const positions = [10, 26, 42, 58, 74].flatMap((gap) => [
      { x: 8, y: -labelHeight - gap },
      { x: -labelWidth - 8, y: -labelHeight - gap },
      { x: 8, y: gap },
      { x: -labelWidth - 8, y: gap },
    ]);
    const boxFor = (offset: { x: number; y: number }): Box => ({
      left: point.x + offset.x, top: point.y + offset.y,
      right: point.x + offset.x + labelWidth, bottom: point.y + offset.y + labelHeight,
    });
    const labelOffset = positions.find((offset) => {
      const box = boxFor(offset);
      return box.left >= 0 && box.right <= width && box.top >= 0 && box.bottom <= viewportHeight
        && !occupied.some((other) => intersects(box, other, 10))
        && !points.some((other) => intersects(box, { left: other.x - 10, top: other.y - 10, right: other.x + 10, bottom: other.y + 10 }));
    }) ?? positions[0];
    const box = boxFor(labelOffset);
    occupied.push(box);
    return {
      ...point, labelOffset,
      // A short label leader makes the geographic anchor unambiguous.
      leader: {
        x: Math.max(labelOffset.x, Math.min(0, labelOffset.x + labelWidth)),
        y: Math.max(labelOffset.y, Math.min(0, labelOffset.y + labelHeight)),
      },
    };
  });
}
