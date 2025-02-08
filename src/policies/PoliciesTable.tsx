import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getData } from "@/localStorageService";
import { Link } from "react-router";

export const PoliciesTable = () => {
  const { policies} = getData();

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
        {policies.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Nie masz żadnych polis
            </TableCell>
          </TableRow>
        )}
        {policies.map((policy) => {
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