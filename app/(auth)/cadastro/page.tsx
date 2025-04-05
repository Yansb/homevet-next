import { TabsList, Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { UserSignUpCard } from "./UserSignUpCard";
import { DoctorSignUpCard } from "./DoctorSignUpCard";

const TabsValues = {
  user: "user",
  vet: "vet",
};

export default function SignUpPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Tabs defaultValue={TabsValues.user}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={TabsValues.user}>Usuário</TabsTrigger>
          <TabsTrigger value={TabsValues.vet}>Veterinario</TabsTrigger>
        </TabsList>
        <TabsContent value={TabsValues.user}>
          <UserSignUpCard />
        </TabsContent>
        <TabsContent value={TabsValues.vet}>
          <DoctorSignUpCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
