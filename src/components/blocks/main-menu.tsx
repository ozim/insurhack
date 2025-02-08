import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Link, useLocation } from "react-router"
import { useEffect, useState } from "react"

export const MainMenu = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Insurhack</SheetTitle>
          <SheetDescription>
            Zarządzanie polisami
          </SheetDescription>
        </SheetHeader>
        <LinksList />
      </SheetContent>
    </Sheet>
  )
}

const LinksList = () => {
  return (
    <div className="flex flex-col space-y-4 mt-6">
      <Link to="/">
        Polisy
      </Link>
      <Link to="/mateusz">
        Mateusz
      </Link>
      <Link to="/sergey">
        Sergey
      </Link>
      <Link to="/kuba">
        Kuba
      </Link>
      <Link to="/builder">
          Porównywarka polis
      </Link>
    </div>
  );
}