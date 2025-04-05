"use client";

import { DoctorCard } from "@/components/home/doctorCard";
import { useGetNearbyDoctorsByLocation } from "@/services/doctorService";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function DoctorList() {
  const [location, setLocation] = useState<{
    lat: string | null;
    lng: string | null;
  }>({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const { data, isLoading } = useGetNearbyDoctorsByLocation(
    location.lat,
    location.lng,
  );
  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3">
      {data.length ? (
        data.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
      ) : (
        <div>
          <p>Poxa parece que não tem veterinarios que atendem na sua area!</p>
        </div>
      )}
    </div>
  );
}
