"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NavigationIcon } from "lucide-react";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import type { Layer, Map as LeafletMap } from "leaflet";

import { cn } from "@/lib/utils";

/** Leaflet API used after dynamic import (runtime may expose `default`). */
type LeafletGeo = Pick<
  typeof import("leaflet"),
  "circleMarker" | "latLngBounds"
>;

export type ClaimRecord = {
  name: string;
  state: string;
  county: string;
  lat: number;
  lng: number;
};

const CLAIMS_URL = "/claims.json";
/** Show user + claims within this radius when using “Find claims near me”. */
const NEARBY_MILES = 150;
/**
 * Cap zoom so pins stay regional (city / multi-county), not parcel- or street-level.
 * Leaflet: ~9 region, ~11 city area, ~14+ neighborhood / exact.
 */
const MAP_MAX_ZOOM = 11;

function distanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GpaaClaimsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<LeafletGeo | null>(null);
  const userLayerRef = useRef<Layer | null>(null);
  const claimsRef = useRef<ClaimRecord[]>([]);

  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [geoMessage, setGeoMessage] = useState<string | null>(null);
  const [finding, setFinding] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;

    async function setup() {
      if (!containerRef.current) return;
      const leafletMod = await import("leaflet");
      const L = leafletMod.default ?? leafletMod;
      await import("leaflet.markercluster");
      leafletRef.current = L as LeafletGeo;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: true,
        maxZoom: MAP_MAX_ZOOM,
      }).setView([37.0902, -95.7129], 4);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- leaflet.markercluster augments L at runtime
      const markers = (L as any).markerClusterGroup();
      map.addLayer(markers);

      try {
        const res = await fetch(CLAIMS_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ClaimRecord[] = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid claims JSON");
        if (cancelled) return;
        claimsRef.current = data;

        data.forEach((claim) => {
          const marker = L.marker([claim.lat, claim.lng]);
          marker.bindPopup(
            `<b>${escapeHtml(claim.name)}</b><br>` +
              `State: ${escapeHtml(claim.state)}<br>` +
              `County: ${escapeHtml(claim.county)}`
          );
          markers.addLayer(marker);
        });

        const resizeAndFit = () => {
          map?.invalidateSize();
          if (data.length > 0) {
            map?.fitBounds(markers.getBounds(), {
              padding: [50, 50],
              maxZoom: MAP_MAX_ZOOM,
            });
          }
        };
        requestAnimationFrame(() => {
          resizeAndFit();
          setTimeout(resizeAndFit, 0);
        });
        setLoadState("ready");
      } catch (e) {
        console.error(e);
        if (!cancelled) setLoadState("error");
      }
    }

    void setup();

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
      leafletRef.current = null;
      userLayerRef.current = null;
    };
  }, []);

  const findClaimsNearMe = useCallback(() => {
    setGeoMessage(null);
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L || loadState !== "ready") return;

    if (!navigator.geolocation) {
      setGeoMessage(
        "Geolocation is not supported in this browser. Try Chrome, Safari, or Firefox."
      );
      return;
    }

    setFinding(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFinding(false);
        const { latitude, longitude } = pos.coords;

        if (userLayerRef.current) {
          map.removeLayer(userLayerRef.current);
          userLayerRef.current = null;
        }

        const userMarker = L.circleMarker([latitude, longitude], {
          radius: 11,
          color: "#1d4ed8",
          weight: 2,
          fillColor: "#3b82f6",
          fillOpacity: 0.95,
        }).bindPopup("<strong>You are here</strong>");
        userMarker.addTo(map);
        userLayerRef.current = userMarker;

        const claims = claimsRef.current;
        const nearby = claims.filter(
          (c) =>
            distanceMiles(latitude, longitude, c.lat, c.lng) <= NEARBY_MILES
        );

        if (nearby.length > 0) {
          const userCorner: [number, number] = [latitude, longitude];
          const bounds = L.latLngBounds(userCorner, userCorner);
          nearby.forEach((c) =>
            bounds.extend([c.lat, c.lng] as [number, number])
          );
          map.fitBounds(bounds, {
            padding: [56, 56],
            maxZoom: MAP_MAX_ZOOM,
          });
        } else {
          map.setView([latitude, longitude], Math.min(10, MAP_MAX_ZOOM));
          setGeoMessage(
            `No GPAA claims in our map data within ${NEARBY_MILES} miles of you—map centered on your location. Zoom out to browse all claims.`
          );
        }
      },
      (err) => {
        setFinding(false);
        setGeoMessage(
          "Could not get your location. Allow location access for this site in your browser settings, then try again."
        );
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }, [loadState]);

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--brand-body)]">
          Explore claim pins on the map—use your location to zoom in nearby.
        </p>
        <button
          type="button"
          onClick={findClaimsNearMe}
          disabled={loadState !== "ready" || finding}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors",
            "bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)]",
            "hover:brightness-95 disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <NavigationIcon className="size-4 shrink-0" aria-hidden />
          {finding ? "Locating…" : "Find claims near me"}
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative z-0 mt-4 h-[min(420px,58vh)] w-full overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)]"
        role="presentation"
      />

      {loadState === "loading" ? (
        <p className="mt-2 text-center text-xs text-[var(--brand-muted)]">
          Loading map…
        </p>
      ) : null}
      {loadState === "error" ? (
        <p className="mt-2 text-center text-sm text-red-700" role="alert">
          Could not load claim data from <code className="text-xs">/claims.json</code>.
          Add your GPAA claims JSON to <code className="text-xs">public/claims.json</code>.
        </p>
      ) : null}
      {geoMessage ? (
        <p className="mt-3 text-center text-sm text-[var(--brand-muted)]">
          {geoMessage}
        </p>
      ) : null}
    </div>
  );
}
