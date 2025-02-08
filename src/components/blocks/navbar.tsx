import { MainMenu } from "@/components/blocks/main-menu"
import { ThemeSwitch } from "@/components/blocks/theme-switch"
import { Link } from "react-router"

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-border h-14 px-2">
      <Link to="/" className="text-2xl font-bold">
        <p>Insurhack</p>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        <MainMenu />
      </div>
    </div>
  )
}
