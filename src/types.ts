export interface Policy {
  policyId: string;
  policyNumber: string;
  insurerBrandName: string;
  insurancePeriodValidFromDate: string;
  insurancePeriodValidToDate: string;
  documentList: any[];
  premiumInstallmentList: any[];
}

export interface AppData {
  policies: Policy[];
}

