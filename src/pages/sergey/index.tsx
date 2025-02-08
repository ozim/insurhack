import { useEffect, useState } from "react";
import axios from "axios";
import { addPolicy, Policy } from "@/localStorageService";

export const Sergey = () => {
  const [data, setData] = useState<Policy>();

  useEffect(() => {
    axios.get("http://localhost:8000")
      .then(response => {
        const policy = mapData(response.data);
        setData(policy)
        addPolicy(policy)
      });
  }, []);

  console.log({ data });

  return (
    <div>
      <div>{data?.policyId}</div>
      <div>{data?.insurerBrandName}</div>
      <div>{data?.insurancePeriodValidFromDate}</div>
      <div>{data?.insurancePeriodValidToDate}</div>
      <div>
        {data?.documentList.map((document: any) => {
          return <div key={document.documentId}>{document.documentId}</div>;
        })}
      </div>
      <div>
        {data?.premiumInstallmentList.map((premiumInstallment: any) => {
          return <div key={premiumInstallment.installmentId}>{premiumInstallment.installmentId}</div>;
        })}
      </div>
    </div>
  );
}

const mapData = (apiData: any) => {
  return {
    policyId: apiData.policyId,
    insurerBrandName: apiData.insurerBrandName,
    insurancePeriodValidFromDate: apiData.insurancePeriodValidFromDate,
    insurancePeriodValidToDate: apiData.insurancePeriodValidToDate,
    documentList: apiData.documentList.map((document: any) => ({
      documentId: document.documentId,
      type: document.type,
      fileName: document.fileName,
      description: document.description,
    })),
    premiumInstallmentList: apiData.premiumInstallmentList.map((premiumInstallment: any) => ({
      installmentId: premiumInstallment.installmentId,
      policyId: premiumInstallment.policyId,
      value: premiumInstallment.value,
      currency: premiumInstallment.currency,
      installmentNo: premiumInstallment.installmentNo,
      dueDate: premiumInstallment.dueDate
    }))
  }
}

