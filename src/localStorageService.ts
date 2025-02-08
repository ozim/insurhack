import { AppData, Policy } from "@/types";

export const LOCALSTORAGE_KEY = 'insurhack-data';


export const getData = (): AppData => {
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

export const getPolicyById = (policyId: string) => {
  const data = getData();
  return data.policies.find((policy) => policy.policyId === policyId);
}

