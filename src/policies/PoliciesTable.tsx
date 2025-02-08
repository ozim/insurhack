import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getData } from "@/localStorageService";
import { Link } from "react-router";

export const PoliciesTable = () => {
  const { policies } = getData();

  if (policies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 px-4">
        <div className="text-center">
          Nie masz żadnych polis
        </div>
        <Button size="lg" asChild className="w-full">
          <Link to="/add-policy">
            Dodaj pierwszą polisę
          </Link>
        </Button>
      </div>
    );
  }

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