import { z } from "zod"
import { useNavigate } from "react-router";
import { addPolicy } from "@/localStorageService"
import { format } from "date-fns"
import { PolicyForm, policyFormSchema } from "@/policies/PolicyForm";

export const AddPolicyForm = () => {
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof policyFormSchema>) => {
    addPolicy({
      ...values,
      insurancePeriodValidFromDate: format(values.insurancePeriodValidFromDate, "yyyy-MM-dd"),
      insurancePeriodValidToDate: format(values.insurancePeriodValidToDate, "yyyy-MM-dd"),
      documentList: [],
      premiumInstallmentList: [],
    });
    navigate("/");
  }

  return (
    <PolicyForm onSubmit={onSubmit} submitButtonText="Dodaj" showExampleDataButton />
  )
};
