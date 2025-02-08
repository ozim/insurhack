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

export const updatePolicy = (policy: Policy) => {
  const data = getData();
  saveData({
    ...data,
    policies: data.policies.map((p) => p.policyId === policy.policyId ? policy : p)
  });
}

export const deletePolicy = (policyId: string) => {
  const data = getData();
  saveData({
    ...data,
    policies: data.policies.filter((policy) => policy.policyId !== policyId)
  });
}

const saveData = (data: AppData) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

export const getPolicies = () => getData().policies;

export const getPolicyById = (policyId: string) => {
  const data = getData();
  return data.policies.find((policy) => policy.policyId === policyId);
}

