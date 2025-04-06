import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dog } from "lucide-react";

export default function Page() {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between gap-2">
          <div>
            <CardTitle>Meus Pets</CardTitle>
            <CardDescription>
              Aqui você pode gerenciar seus Pets
            </CardDescription>
          </div>
          <Button>
            Adicionar Pet <Dog />
          </Button>
        </div>
      </CardHeader>
    </>
  );
}
