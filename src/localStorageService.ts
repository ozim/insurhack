export const LOCALSTORAGE_KEY = 'insurhack-data';


const getData = (): AppData => {
  const data = localStorage.getItem(LOCALSTORAGE_KEY);
  return data ? JSON.parse(data) : { policies: [] };
}

export const addPolicy = (policy: Policy) => {
  const data = getData();
  saveData({
    ...data,
    policies: [
      ...data.policies,
      policy
    ]
  });
}

const saveData = (data: AppData) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

interface AppData {
  policies: Policy[];
}

export interface Policy {
  policyId: string;
  insurerBrandName: string;
  insurancePeriodValidFromDate: string;
  insurancePeriodValidToDate: string;
  documentList: any[];
  premiumInstallmentList: any[];
}