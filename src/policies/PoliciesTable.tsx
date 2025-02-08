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
          <Link to="/policies/add">
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
          <TableHead>Nr polisy</TableHead>
          <TableHead >Nazwa ubezpieczyciela</TableHead>
          <TableHead className="w-28">Data od</TableHead>
          <TableHead className="w-28">Data do</TableHead>
          <TableHead className="text-right w-28">Akcje</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {policies.map((policy) => {
          return (
            <TableRow key={policy.policyId}>
              <TableCell className="font-medium">
                {policy.policyNumber}
              </TableCell>
              <TableCell>
                {policy.insurerBrandName}
              </TableCell>
              <TableCell>
                {policy.insurancePeriodValidFromDate}
              </TableCell>
              <TableCell>
                {policy.insurancePeriodValidToDate}
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/policies/${policy.policyId}`}>
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