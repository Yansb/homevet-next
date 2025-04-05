import { Phone, PawPrint, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type DoctorCardProps = {
  doctor: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    specialties: string[];
    licenseNumber: string;
  };
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{doctor.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-1 break-words lg:grid-cols-2 lg:gap-x-2 lg:gap-y-1">
          <div className="flex">
            <PawPrint />
            <span className="ml-2">CRM</span>
          </div>
          <span>{doctor.licenseNumber}</span>
          <div className="flex">
            <Phone />
            <span className="ml-2">Telefone</span>
          </div>
          <span>{doctor.phoneNumber}</span>
          <div className="flex">
            <Mail />
            <span className="ml-2">E-mail</span>
          </div>
          <span>{doctor.email}</span>
        </div>
      </CardContent>
    </Card>
  );
}
