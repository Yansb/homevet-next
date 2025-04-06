import { CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorList } from "./DoctorList";

export default function HomePage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Médicos proximos
        </CardTitle>
      </CardHeader>
      <DoctorList />
    </>
  );
}
