import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import { UseFormReturn } from "react-hook-form";
import { useState, useMemo, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { DoctorSignUpFormData } from "@/app/(auth)/cadastro/types/schema";
import dynamic from "next/dynamic";

// Fix marker icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const customMarker = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface DraggableMarkerProps {
  form: UseFormReturn<DoctorSignUpFormData>;
  radius: number;
}

function DraggableMarker({ form, radius }: DraggableMarkerProps) {
  const [position, setPosition] = useState<L.LatLngTuple>([-23.5505, -46.6333]); // Default to São Paulo
  const map = useMapEvents({
    moveend() {
      const center = map.getCenter();
      setPosition([center.lat, center.lng]);
      form.setValue("address.location.latitude", String(center.lat));
      form.setValue("address.location.longitude", String(center.lng));
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition([newPosition.lat, newPosition.lng]);
          form.setValue("address.location.latitude", String(newPosition.lat));
          form.setValue("address.location.longitude", String(newPosition.lng));
        }
      },
    }),
    [form],
  );

  const markerRef = useRef<L.Marker>(null);

  return (
    <>
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={customMarker}
      >
        <Popup>
          <span>Arraste para ajustar a localização</span>
        </Popup>
      </Marker>
      <Circle
        center={position}
        radius={radius * 1000} // Convert km to meters
        pathOptions={{ color: "green", fillColor: "green", fillOpacity: 0.2 }}
      />
    </>
  );
}

interface MapProps {
  form: UseFormReturn<DoctorSignUpFormData>;
  initialPosition?: L.LatLngTuple;
}

export function Map({
  form,
  initialPosition = [-23.5505, -46.6333],
}: MapProps) {
  const radius = form.watch("radius");
  const [position, setPosition] = useState<L.LatLngTuple>(initialPosition);
  const mapRef = useRef<L.Map>(null);

  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition: L.LatLngTuple = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setPosition(newPosition);
          form.setValue("address.location.latitude", String(newPosition[0]));
          form.setValue("address.location.longitude", String(newPosition[1]));
          mapRef.current?.setView(newPosition, 15);
        },
        (error) => {
          console.error("Error getting location:", error);
          // You might want to show an error message to the user here
        },
      );
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p>Arraste o marcador para o local exato do seu consultório:</p>
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">
          Raio de atendimento: {radius} km
        </label>
        <Slider
          value={[radius]}
          onValueChange={(value) => form.setValue("radius", value[0])}
          min={1}
          max={25}
          step={1}
          className="mt-2"
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleGeolocation}
        className="mb-2 flex items-center gap-2"
      >
        <MapPin className="h-4 w-4" />
        Usar minha localização
      </Button>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <DraggableMarker form={form} radius={radius} />
      </MapContainer>
    </div>
  );
}

// Export a dynamic component that disables SSR
export const MapWithNoSSR = dynamic(() => Promise.resolve(Map), {
  ssr: false,
});
