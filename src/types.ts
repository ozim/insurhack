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

