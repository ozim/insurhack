import { MainMenu } from "@/components/blocks/main-menu"
import { Link } from "react-router"

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 h-14">
      <Link to="/" className="text-2xl font-bold px-4">
        <p>Insurhack</p>
      </Link>
      <MainMenu />
    </div>
  )
}
