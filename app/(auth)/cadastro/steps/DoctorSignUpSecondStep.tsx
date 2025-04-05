"use client";
import { UseFormReturn } from "react-hook-form";
import { DoctorSignUpFormData } from "../types/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cepMask } from "@/lib/masks";

export function DoctorSignUpSecondStep({
  form,
  isLocationSet,
  isAttendingLocationSet,
}: {
  form: UseFormReturn<DoctorSignUpFormData>;
  isLocationSet: boolean;
  isAttendingLocationSet: boolean;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="licenseNumber"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="CRMV" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
                <Input placeholder="Rua" {...field} disabled={isLocationSet} />
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

      <Card>
        <CardHeader>
          <CardTitle>Endereço de atendimento</CardTitle>
          <CardDescription>
            Principal endereço utilizado para realizar atendimentos
          </CardDescription>
          <FormField
            control={form.control}
            name="isAttendingAddressSameAsAddress"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(e) => {
                        field.onChange(e);
                        form.resetField("attendingAddress");
                      }}
                    />
                  </FormControl>
                  <FormLabel>Utilizar mesmo endereço</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </CardHeader>
        {!form.watch("isAttendingAddressSameAsAddress") && (
          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="attendingAddress.addressName"
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
              name="attendingAddress.zipCode"
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
                name="attendingAddress.street"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Rua"
                        {...field}
                        disabled={isAttendingLocationSet}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendingAddress.number"
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
                name="attendingAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Cidade"
                        {...field}
                        disabled={isAttendingLocationSet}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendingAddress.state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Estado"
                        {...field}
                        disabled={isAttendingLocationSet}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="attendingAddress.complement"
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
        )}
      </Card>
    </>
  );
}
