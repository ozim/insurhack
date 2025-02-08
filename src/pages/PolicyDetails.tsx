import { ShowPolicy } from "@/policies/ShowPolicy";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";

export const PolicyDetails = () => {
  const { policyId } = useParams();

  return (
    <div>
      <header className="flex justify-between items-center py-10 px-4">
        <h2 className="text-2xl font-bold">
          Polisa
        </h2>
        <Button variant="default">
          <Link to={`/policies/${policyId}/edit`}>
            Edytuj
          </Link>
        </Button>
      </header>
      <div className="px-4">
        <ShowPolicy />
      </div>
    </div>
  );
}