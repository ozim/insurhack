import { MainMenu } from "@/components/blocks/main-menu"

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 h-14">
      <p>Insurhack</p>
      <MainMenu />
    </div>
  )
}
