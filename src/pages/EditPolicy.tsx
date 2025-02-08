import { EditPolicyForm } from "@/policies/EditPolicyForm"

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
      </div>
    </div>
  )
}