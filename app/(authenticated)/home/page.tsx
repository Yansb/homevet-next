import { DoctorList } from "./DoctorList";

export default function HomePage() {
  return (
    <div>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
        Médicos proximos
      </h1>
      <DoctorList />
    </div>
  );
}
