import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Moon, Sun } from "lucide-react";

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-10 space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground">
          A living styleguide for Naija Commerce UI components.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">
          1. Cards & Pricing
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic Plan</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">₦12,500.00</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">2. Buttons</h2>

        <div className="flex flex-wrap gap-4">
          <Button>Checkout</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">3. Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>New Arrival</Badge>
          <Badge variant="secondary">Featured</Badge>
          <Badge variant="destructive">Out of Stock</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">4. Inputs</h2>
        <div className="max-w-sm">
          <Input type="email" placeholder="Email address" />
        </div>
      </section>


        <section className="space-y-4 pt-8">
          <h2 className="text-2xl font-bold border-b pb-2">5. Avatars</h2>
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="" alt="Broken Link" />
              <AvatarFallback className="bg-slate-900 text-white">DC</AvatarFallback>
            </Avatar>
          </div>
        </section>

  
        <section className="space-y-4 pt-8">
          <h2 className="text-2xl font-bold border-b pb-2">6. Table</h2>
          <div className="border rounded-md">
            <Table>
              <TableCaption>A list of recent orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">ORD-001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">₦25,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ORD-002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">₦12,500</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>


        <section className="space-y-4 pt-8">
          <h2 className="text-2xl font-bold border-b pb-2">7. Dialog</h2>
          <Dialog>
        
            <DialogTrigger asChild>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Open Dialog
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 text-sm text-gray-500">
                (Imagine a really cool form goes right here.)
              </div>
            </DialogContent>
          </Dialog>
        </section>


        <section className="space-y-4 pt-8 pb-12">
          <h2 className="text-2xl font-bold border-b pb-2">8. Theme Toggle</h2>
          <p className="text-sm text-gray-500 mb-2">
            (Visual mockup. Actual dark mode requires next-themes setup!)
          </p>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Sun className="h-4 w-4" />
            <span>Toggle Theme</span>
            <Moon className="h-4 w-4 ml-2 opacity-50" />
          </button>
        </section>
    </div>
  );
}
