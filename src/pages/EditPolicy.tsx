import { EditPolicyForm } from "@/policies/EditPolicyForm"
import { AlertCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deletePolicy } from "@/localStorageService"
import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const EditPolicy = () => {
  return (
    <div>
      <header className="flex justify-between items-center py-10 px-4">
        <h2 className="text-2xl font-bold">
          Edytuj Polisę
        </h2>
      </header>
      <div className="px-4">
        <EditPolicyForm />
        <RemoveSection />
      </div>
    </div>
  )
}

const RemoveSection = () => {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircleIcon className="h-4 w-4" />
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RemoveButtonWithAlert />
      </CardContent>
    </Card>
  )
}

const RemoveButtonWithAlert = () => {
  const { policyId } = useParams();
  const navigate = useNavigate();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
        >
          Usuń tę polisę
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Jesteś pewien?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ta polisa zostanie usunięta jedynie z twojego urządzenia.
            Po usunięciu polisa nie będzie dłużej dostępna w aplikacji.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Anuluj
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (!policyId) return;
              deletePolicy(policyId);
              navigate("/");
            }}
          >Tak, usuwam
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}