import { Button } from "@/components/ui/button";
import { getPolicyById, updatePolicy } from "@/localStorageService";
import { PolicyForm, policyFormSchema } from "@/policies/PolicyForm"
import { format } from "date-fns";
import { Link, useNavigate, useParams } from "react-router";
import { z } from "zod";

export const EditPolicyForm = () => {
  const navigate = useNavigate();
  const { policyId } = useParams();
  const policy = policyId ? getPolicyById(policyId) : undefined;

  const onSubmit = (values: z.infer<typeof policyFormSchema>) => {
    updatePolicy({
      ...values,
      insurancePeriodValidFromDate: format(values.insurancePeriodValidFromDate, "yyyy-MM-dd"),
      insurancePeriodValidToDate: format(values.insurancePeriodValidToDate, "yyyy-MM-dd"),
      documentList: [],
      premiumInstallmentList: [],
    });
    navigate(`/policies/${values.policyId}`);
  }

  if (!policy) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 px-4">
        <div className="text-center">
          Polisa nie znaleziona
        </div>
        <Button size="lg" asChild className="w-full">
          <Link to="/policies">
            Wróć do listy polis
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <PolicyForm
      onSubmit={onSubmit}
      submitButtonText="Zapisz"
      initialValues={{
        ...policy,
        insurancePeriodValidFromDate: new Date(policy.insurancePeriodValidFromDate),
        insurancePeriodValidToDate: new Date(policy.insurancePeriodValidToDate),
      }}
    />
  )
}