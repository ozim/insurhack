
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
    console.log({
      policy
    })
    if (!policy) return;
    setPolicy(policy)
  }, [policyId]);

  return (
    <div>
      <h2>Policy Details</h2>
      <p>{policy?.policyId}</p>
      <p>{policy?.insurerBrandName}</p>
      <p>{policy?.insurancePeriodValidFromDate}</p>
      <p>{policy?.insurancePeriodValidToDate}</p>
    </div>
  )
}