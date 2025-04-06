"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUserDTO, useCreateUser } from "@/services/userService";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/useDebounce";
import { useRouter } from "next/navigation";
import { UserSignUpFormData, userSignUpSchema } from "./types/schema";
import { useGetLocationByCepQuery } from "@/services/locationService";
import { zodResolver } from "@hookform/resolvers/zod";
import { cepMask, phoneMask } from "@/lib/masks";

export function UserSignUpCard() {
  const [isLocationSet, setIsLocationSet] = useState(false);
  const createUserMutation = useCreateUser();

  const navigate = useRouter();
  const form = useForm<UserSignUpFormData>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      address: {
        addressName: "Casa",
      },
    },
  });

  const cep = form.watch("address.zipCode");
  const debouncedCep = useDebounce(cep?.replace(/\D/g, "") || "", 500);

  const { data: locationData } = useGetLocationByCepQuery(debouncedCep);

  useEffect(() => {
    if (locationData) {
      form.setValue("address.street", locationData.street || "");
      form.setValue("address.city", locationData.city);
      form.setValue("address.state", locationData.state);
      if (locationData.location?.coordinates) {
        form.setValue("address.location", {
          latitude: locationData.location.coordinates.latitude || "",
          longitude: locationData.location.coordinates.longitude || "",
        });
      }
      setIsLocationSet(true);
    }
  }, [locationData]);

  async function onSubmit(data: UserSignUpFormData) {
    const cleanedPhone = `+55${data.phone.replace(/\s()-/g, "")}`;
    const userData: CreateUserDTO = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: cleanedPhone,
      address: data.address,
    };

    createUserMutation.mutate(userData, {
      onSuccess: () => navigate.push("/login"),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Usuários</CardTitle>
        <CardDescription>Crie aqui sua conta</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="mb-6 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Telefone"
                      value={field.value}
                      onChange={(e) => {
                        const formatted = phoneMask(e.target.value);
                        e.target.value = formatted;
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirmação de senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.addressName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome do endereço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="CEP"
                      {...field}
                      onChange={(e) => {
                        const formatted = cepMask(e.target.value);
                        e.target.value = formatted;
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Rua"
                        {...field}
                        disabled={isLocationSet}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem className="ml-4 flex-shrink-0">
                    <FormControl>
                      <Input
                        className="max-w-24 justify-self-end"
                        placeholder="Número"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Cidade"
                        {...field}
                        disabled={isLocationSet}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Estado"
                        {...field}
                        disabled={isLocationSet}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.complement"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate.push("/login")}
            >
              Voltar
            </Button>
            <Button>Cadastrar</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
