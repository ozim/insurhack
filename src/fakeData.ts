export interface Policy {
  policyId: string;
  insurerBrandName: string;
  insurancePeriodValidFromDate: string;
  insurancePeriodValidToDate: string;
  documentList: any[];
  premiumInstallmentList: any[];
}

export interface AppData {
  policies: Policy[];
}

export const FAKE_DATA: AppData = {
  policies: [
    {
      policyId: "1",
      insurerBrandName: "Brand 1",
      insurancePeriodValidFromDate: "2024-01-01",
      insurancePeriodValidToDate: "2024-01-01",
      documentList: [],
      premiumInstallmentList: [],
    },
    {
      policyId: "2",
      insurerBrandName: "Brand 2",
      insurancePeriodValidFromDate: "2024-01-01",
      insurancePeriodValidToDate: "2024-01-01",
      documentList: [],
      premiumInstallmentList: [],
    },
    {
      policyId: "3",
      insurerBrandName: "Brand 3",
      insurancePeriodValidFromDate: "2024-01-01",
      insurancePeriodValidToDate: "2024-01-01",
      documentList: [],
      premiumInstallmentList: [],
    },
  ]
}