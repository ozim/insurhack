import { Button } from "@/components/ui/button"
import { getData } from "@/localStorageService";
import { PoliciesTable } from "@/policies/PoliciesTable"
import { Link } from "react-router"


export const Home = () => {
  const { policies } = getData();

  return (
    <div>
      <header className="flex justify-between items-center py-10 px-4">
        <h2 className="text-2xl font-bold">
          Polisy
        </h2>
        {policies.length > 0 && (
          <Button>
            <Link to="/add-policy">Dodaj polisę</Link>
          </Button>
        )}
      </header>
      <PoliciesTable />
    </div>
  )
}