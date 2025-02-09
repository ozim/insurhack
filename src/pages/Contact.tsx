import { Button } from "@/components/ui/button";
import { PhoneCallIcon } from "lucide-react";

export const Contact = () => {
  return (
    <div>
      <header className="py-10 px-4">
        <h2 className="text-2xl font-bold">
          Masz pytania?
        </h2>
        <p>
          Zadzwoń do naszego konsultanta
        </p>
      </header>
      <div className="sm:px-4">
        <img src="/consultant.jpg" alt="Consultant" className="w-full sm:max-w-60" />
      </div>
      <div className="px-4 py-10 flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <PhoneCallIcon />
          <p>+48 123 456 789</p>
        </div>
        <Button>
          Zadzwoń
        </Button>
      </div>
    </div>
  )
};