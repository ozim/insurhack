import {useState} from "react";
import {Button} from "@/components/ui/button";
import {addPolicy} from "@/localStorageService";
import {Policy} from "@/types";
import axios from "axios";

export const PolicyBuilder = () => {
    const [data, setData] = useState<Policy>();
    const handleClickNewPolicy = () => {
        axios.get("http://localhost:5173/src/assets/response.json")
            .then(response => {
                const policy = randomizeData(mapData(response.data));
                // @ts-expect-error
                setData(policy)
                // @ts-expect-error
                addPolicy(policy)
            });
    }

    return (
        <div>
            <Button onClick={handleClickNewPolicy}>Nowy polis</Button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
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
            documentData: document.documentData
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

const randomizeData = (apiData: any) => {
    return {
        policyId: crypto.randomUUID(),
        insurerBrandName: apiData.insurerBrandName + "_" + crypto.randomUUID().slice(0, 8),
        insurancePeriodValidFromDate: new Date(
            Date.parse(apiData.insurancePeriodValidFromDate) +
            Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
        ).toISOString(),
        insurancePeriodValidToDate: new Date(
            Date.parse(apiData.insurancePeriodValidToDate) +
            (Math.floor(Math.random() * 365 * 5) + 365 * 5) * 24 * 60 * 60 * 1000
        ).toISOString(),
        documentList: apiData.documentList.map((document: any) => ({
            documentId: crypto.randomUUID(),
            type: document.type,
            fileName: document.fileName,
            description: document.description,
            documentData: document.documentData
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
