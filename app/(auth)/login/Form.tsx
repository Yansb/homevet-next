"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginFormSchema, loginFormSchema } from "./types/schema";
import { useAuthStore, useLogin } from "@/stores/authStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function LoginPageForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const loginMutation = useLogin();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    if (user) {
      router.push("/home"); // or wherever you want to redirect after login
    }
  }, [user, router]);

  async function onSubmit(data: LoginFormSchema) {
    loginMutation.mutate(data);
  }

  return (
    <Card className="m-0 h-full rounded-none p-6 md:m-4 md:h-[480px] md:w-[480px] md:rounded-l-xl">
      <CardHeader>
        <CardTitle>HomeVET</CardTitle>
        <CardTitle>Bem Vindo de volta!</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex min-w-40 flex-1 flex-col">
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex min-w-40 flex-1 flex-col">
                    <FormControl>
                      <Input type="password" placeholder="Senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="px-4 pt-1 pb-3 text-sm leading-normal font-normal text-neutral-500 underline">
              Esqueceu sua senha?
            </p>
            <div className="flex justify-center">
              <div className="flex w-full max-w-[480px] flex-1 flex-col items-stretch gap-3 px-4 py-3">
                <Button type="submit" disabled={loginMutation.isPending}>
                  {loginMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <span className="truncate">Entrar</span>
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => router.push("/cadastro")}
                >
                  <span className="truncate">Novo usuário? cadastre-se</span>
                </Button>
              </div>
            </div>
            {loginMutation.error && (
              <p className="text-destructive mt-4 text-sm">
                {loginMutation.error.message}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
