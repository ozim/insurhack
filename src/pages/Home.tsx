import { Button } from "@/components/ui/button"
import { PoliciesTable } from "@/policies/PoliciesTable"
import { Link } from "react-router"


export const Home = () => {
  return (
    <div>
      <header className="flex justify-between items-center py-10 px-4">
        <h2 className="text-2xl font-bold">
          Polisy
        </h2>
        <Button>
          <Link to="/add-policy">Dodaj polisę</Link>
        </Button>
      </header>
      <PoliciesTable />
    </div>
  )
}