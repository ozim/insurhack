import { MainMenu } from "@/components/blocks/main-menu"
import { ThemeSwitch } from "@/components/blocks/theme-switch"
import { Link } from "react-router"

export const Navbar = () => {
  return (
    <div className="sticky top-0 bg-background flex justify-between items-center border-b border-border h-14 px-2">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">
        <img src="/logo-insr.png" alt="Insr" className="h-8 w-8 rounded-sm" />
        <p className="sr-only sm:not-sr-only">Insr</p>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        <MainMenu />
      </div>
    </div>
  )
}
