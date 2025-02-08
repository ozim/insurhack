import { ShowPolicy } from "@/policies/ShowPolicy";

export const PolicyDetails = () => {
  return (
    <div>
      <header className="flex justify-between items-center py-10 px-4">
        <h2 className="text-2xl font-bold">
          Polisa
        </h2>
      </header>
      <div className="px-4">
        <ShowPolicy />
      </div>
    </div>
  );
}