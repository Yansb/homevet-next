"use client";

import { UseFormReturn } from "react-hook-form";
import { DoctorSignUpFormData } from "../types/schema";
import { MapWithNoSSR } from "@/components/Map";

export function DoctorSignUpThirdStep({
  form,
}: {
  form: UseFormReturn<DoctorSignUpFormData>;
}) {
  const initialPosition = [
    Number(form.getValues("address.location.latitude")) || -23.5505,
    Number(form.getValues("address.location.longitude")) || -46.6333,
  ] as [number, number];

  return <MapWithNoSSR form={form} initialPosition={initialPosition} />;
}
