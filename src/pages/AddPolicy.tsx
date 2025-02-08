import { AddPolicyForm } from "@/policies/AddPolicyForm"

export const AddPolicy = () => {
  return (
    <div>
      <header className="flex justify-between items-center py-10 px-4">
        <h2 className="text-2xl font-bold">
          Dodaj Polisę
        </h2>
      </header>
      <div className="px-4">
        <AddPolicyForm />
      </div>
    </div>
  )
}