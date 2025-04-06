import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorList } from "./DoctorList";
import { MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-2">
          <CardTitle className="scroll-m-20 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Médicos próximos
          </CardTitle>
          <div className="text-muted-foreground flex items-center text-sm">
            <MapPin className="mr-1 h-4 w-4" />
            <span>Baseado na sua localização atual</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 py-0 sm:px-6 sm:py-2">
        <DoctorList />
      </CardContent>
    </>
  );
}
