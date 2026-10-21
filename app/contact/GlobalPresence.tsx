import { MapPin } from "lucide-react";
import { getTeamMarkers, presenceMap, teamLocations } from "@/app/data/global-presence";

export function GlobalPresence() {
  return (
    <section className="global-presence" aria-labelledby="global-presence-heading">
      <div className="global-presence-copy">
        <p className="section-kicker">OUR GLOBAL PRESENCE</p>
        <h2 id="global-presence-heading">Distributed teams across key regions</h2>
        <p className="global-presence-description">A remote-first team collaborating across multiple locations to deliver technology solutions worldwide.</p>
        <ul className="global-presence-locations" aria-label="Distributed team collaboration locations">
          {teamLocations.map((location) => (
            <li key={location.abbreviation}>
              <MapPin size={18} strokeWidth={1.6} aria-hidden="true" />
              <div><strong>{location.city}, {location.countryState}</strong><span>{location.region}</span></div>
            </li>
          ))}
        </ul>
      </div>
      <svg className="global-presence-map" viewBox={`0 0 ${presenceMap.width} ${presenceMap.viewportHeight}`} width={presenceMap.width} height={presenceMap.viewportHeight} aria-hidden="true" focusable="false">
        <image href="/world-map-dots.svg" width={presenceMap.width} height={presenceMap.height} />
        {getTeamMarkers().map((marker) => (
          <g className="global-presence-marker" key={marker.abbreviation} data-location={marker.abbreviation} transform={`translate(${marker.x} ${marker.y})`}>
            <line className="global-presence-marker-leader" x1="0" y1="0" x2={marker.leader.x} y2={marker.leader.y} />
            <circle className="global-presence-marker-halo" r="10" />
            <circle className="global-presence-marker-dot" r="4.5" />
            <g className="global-presence-marker-label" transform={`translate(${marker.labelOffset.x} ${marker.labelOffset.y})`}>
              <rect width={presenceMap.labelWidth} height={presenceMap.labelHeight} rx="8" />
              <text x={presenceMap.labelWidth / 2} y={presenceMap.labelHeight / 2} dy=".35em" textAnchor="middle">{marker.abbreviation}</text>
            </g>
          </g>
        ))}
      </svg>
    </section>
  );
}
