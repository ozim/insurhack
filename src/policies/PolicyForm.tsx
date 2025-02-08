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
import { DatePicker } from "@/components/blocks/date-picker"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { DicesIcon } from "lucide-react";

export const policyFormSchema = z.object({
  policyId: z.string(),
  policyNumber: z.string()
    .min(6, {
      message: "Numer polisy musi zawierać minimum 6 znaków.",
    })
    .max(30, {
      message: "Numer polisy musi zawierać maksymalnie 30 znaków.",
    }),
  insurerBrandName: z.string()
    .min(4, {
      message: "Nazwa wystawcy musi zawierać minimum 4 znaki.",
    })
    .max(30, {
      message: "Nazwa wystawcy musi zawierać maksymalnie 30 znaków.",
    }),
  insurancePeriodValidFromDate: z.date(),
  insurancePeriodValidToDate: z.date(),
})

interface Props {
  onSubmit: (values: any) => void;
  initialValues?: z.infer<typeof policyFormSchema>;
  showExampleDataButton?: boolean;
  submitButtonText: string;
}

const DEFAULT_INITIAL_VALUES = {
  policyId: uuidv4(),
  policyNumber: "",
  insurerBrandName: "",
  insurancePeriodValidFromDate: new Date(),
  insurancePeriodValidToDate: new Date(),
};

export const PolicyForm = ({ onSubmit, initialValues, showExampleDataButton = false, submitButtonText }: Props) => {
  const form = useForm<z.infer<typeof policyFormSchema>>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: initialValues || DEFAULT_INITIAL_VALUES,
  })

  const handleClickReadExampleData = () => {
    const policyNumber = faker.commerce.isbn();
    const companyName = faker.company.name();
    const dateRange = {
      start: faker.date.past(),
      end: faker.date.future()
    };
    form.setValue("policyNumber", policyNumber);
    form.setValue("insurerBrandName", companyName);
    form.setValue("insurancePeriodValidFromDate", dateRange.start);
    form.setValue("insurancePeriodValidToDate", dateRange.end);
  }

  return (
    <div className="space-y-10">
      {showExampleDataButton && (
        <Button
          variant="outline"
          onClick={handleClickReadExampleData}
        >
          <DicesIcon />
          Generuj przykładowe dane
        </Button>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="policyNumber"
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
              <FormItem className="flex flex-col">
                <FormLabel>Data rozpoczęcia</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : new Date()}
                    setDate={(date) => field.onChange(date)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="insurancePeriodValidToDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data zakończenia</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : new Date()}
                    setDate={(date) => field.onChange(date)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-56" type="submit">
            {submitButtonText}
          </Button>
        </form>
      </Form>
    </div>
  )
}