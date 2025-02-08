
import { Policy } from "@/types";
import { getPolicyById } from "@/localStorageService";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const ShowPolicy = () => {
  const { policyId } = useParams();
  const [policy, setPolicy] = useState<Policy | null>(null);

  useEffect(() => {
    if (!policyId) return;
    const policy = getPolicyById(policyId);
    if (!policy) return;
    setPolicy(policy)
  }, [policyId]);

  return (
    <div className="space-y-4">
      <div>
        <p className="font-bold text-lg">Nr polisy</p>
        <p>{policy?.policyId}</p>
      </div>
      <div>
        <p className="font-bold text-lg">Nazwa ubezpieczyciela</p>
        <p>{policy?.insurerBrandName}</p>
      </div>
      <div>
        <p className="font-bold text-lg">Okres obowiązywania polisy</p>
        <p>{policy?.insurancePeriodValidFromDate} - {policy?.insurancePeriodValidToDate}</p>
      </div>
    </div>
  )
}