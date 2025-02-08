import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppData } from "@/types";
import { Link } from "react-router";

const FAKE_DATA: AppData = {
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

export const PoliciesTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {FAKE_DATA.policies.map((policy) => {
          return (
            <TableRow key={policy.policyId}>
              <TableCell className="font-medium">
                {policy.policyId}
              </TableCell>
              <TableCell>
                {policy.insurerBrandName}
              </TableCell>
              <TableCell>
                {policy.insurancePeriodValidFromDate}
              </TableCell>
              <TableCell className="text-right">
                {policy.insurancePeriodValidToDate}
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/policy-details/${policy.policyId}`}>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  )
}