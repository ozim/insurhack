import { Button } from "@/components/ui/button"
import { PoliciesTable } from "@/policies/PoliciesTable"
import { Link } from "react-router"


export const Home = () => {
  return (
    <div>
      <h2>Polisy</h2>
      <Button>
        <Link to="/add-policy">Dodaj polisę</Link>
      </Button>
      <PoliciesTable />
    </div>
  )
}