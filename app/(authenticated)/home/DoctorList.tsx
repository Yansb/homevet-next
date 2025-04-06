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
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        });
      });
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
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-5 sm:p-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.length ? (
        data.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center p-4 text-center">
          <p className="text-lg font-medium">
            Poxa, parece que não tem veterinários que atendem na sua área!
          </p>
        </div>
      )}
    </div>
  );
}
