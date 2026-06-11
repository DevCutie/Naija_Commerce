'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DesignPage() {
	return (
		<div className="p-10 space-y-12 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-8">Design System</h1>

			<section className="space-y-4 p-6 border rounded-lg">
				<h2 className="text-xl font-semibold border-b pb-2">
					Toasts (Notifications)
				</h2>
				<p className="text-sm text-gray-500 mb-4">
					Click the buttons to test the Sonner setup.
				</p>

				<div className="flex gap-4">
					<Button
						onClick={() => toast.success('Successfully updated profile!')}
					>
						Test Success Toast
					</Button>
					<Button
						variant="destructive"
						onClick={() => toast.error('Failed to connect to server.')}
					>
						Test Error Toast
					</Button>
				</div>
			</section>

			<section className="space-y-4 p-6 border rounded-lg">
				<h2 className="text-xl font-semibold border-b pb-2">Tabs</h2>
				<p className="text-sm text-gray-500 mb-4">
					Testing the shadcn tab interface.
				</p>

				<Tabs defaultValue="account" className="w-[400px]">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="password">Password</TabsTrigger>
					</TabsList>

					<TabsContent value="account" className="p-4 border rounded-md mt-2">
						Make changes to your account here.
					</TabsContent>
					<TabsContent value="password" className="p-4 border rounded-md mt-2">
						Change your password here.
					</TabsContent>
				</Tabs>
			</section>
		</div>
	);
}
