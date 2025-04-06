import { Phone, PawPrint, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type DoctorCardProps = {
  doctor: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    specialties: string[];
    licenseNumber: string;
    profilePicture?: string;
  };
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="cursor-pointer transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={doctor.profilePicture} alt={doctor.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(doctor.name)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-base sm:text-lg">{doctor.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm break-words">
          <div className="flex items-center">
            <PawPrint className="h-4 w-4" />
            <span className="ml-2">CRMV</span>
          </div>
          <span className="truncate">{doctor.licenseNumber}</span>

          <div className="flex items-center">
            <Phone className="h-4 w-4" />
            <span className="ml-2">Telefone</span>
          </div>
          <span className="truncate">{doctor.phoneNumber}</span>

          <div className="flex items-center">
            <Mail className="h-4 w-4" />
            <span className="ml-2">E-mail</span>
          </div>
          <span className="truncate">{doctor.email}</span>

          {doctor.specialties.length > 0 && (
            <>
              <div className="col-span-2 mt-2 font-medium">Especialidades:</div>
              <div className="col-span-2 flex flex-wrap gap-1">
                {doctor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 rounded-full px-2 py-0.5 text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
