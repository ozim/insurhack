import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getData } from "@/localStorageService";
import { Policy } from "@/types";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const PoliciesTable = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const { policies } = getData();
    setPolicies(policies);
  }, []);

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
    <ScrollArea className="whitespace-nowrap rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nr polisy</TableHead>
            <TableHead>Nazwa ubezpieczyciela</TableHead>
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
                  <Link
                    to={`/policies/${policy.policyId}`}
                    className="hover:underline"
                  >
                    {policy.policyNumber}
                  </Link>
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
                  <PolicyActions policyId={policy.policyId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

const PolicyActions = ({ policyId }: {
  policyId: string,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to={`/policies/${policyId}`}>
            Podgląd
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/policies/${policyId}/edit`}>
            Edytuj
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}