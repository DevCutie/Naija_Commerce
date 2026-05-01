import { Button } from "@/components/ui/button";

export default function DesignPage() {
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl border-b pb-3 font-bold">Design System</h1>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-muted-foreground">Buttons</h2>
        <div className="flex gap-4">
          <Button>Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
          <Button variant="destructive">Delete Item</Button>
        </div>
      </section>
    </div>
  );
}