import { Button } from "@/components/ui/button"
import { deletePolicy } from "@/localStorageService"
import { useNavigate, useParams } from "react-router";

export const EditPolicyForm = () => {
  const { policyId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="destructive"
        onClick={() => {
          if (!policyId) return;
          deletePolicy(policyId);
          navigate("/");
        }}
      >
        Usuń tę polisę
      </Button>
    </div>
  )
}