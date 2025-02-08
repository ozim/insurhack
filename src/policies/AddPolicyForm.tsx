import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  policyId: z.string().min(2, {
    message: "Numer polisy musi zawierać minimum 2 znaki.",
  }),
  insurerBrandName: z.string().min(2, {
    message: "Nazwa wystawcy musi zawierać minimum 2 znaki.",
  }),
  insurancePeriodValidFromDate: z.string().min(2, {
    message: "Data rozpoczęcia musi zawierać minimum 2 znaki.",
  }),
  insurancePeriodValidToDate: z.string().min(2, {
    message: "Data zakończenia musi zawierać minimum 2 znaki.",
  }),
})

export const AddPolicyForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyId: "",
      insurerBrandName: "",
      insurancePeriodValidFromDate: "",
      insurancePeriodValidToDate: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-bold">Dodaj Polisę</h2>
      <Button>
        Odczytaj przykładowe dane
      </Button>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="policyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numer polisy</FormLabel>
              <FormControl>
                <Input placeholder="123456" {...field} />
              </FormControl>
              <FormDescription>
                Numer polisy musi zawierać minimum 2 znaki.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insurerBrandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa wystawcy</FormLabel>
              <FormControl>
                <Input placeholder="Brand 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insurancePeriodValidFromDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data rozpoczęcia</FormLabel>
              <FormControl>
                <Input placeholder="2024-01-01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insurancePeriodValidToDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data zakończenia</FormLabel>
              <FormControl>
                <Input placeholder="2024-01-01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Dodaj</Button>
      </form>
    </Form>
  )
};
