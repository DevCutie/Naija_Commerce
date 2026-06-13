export default function ProductPageLoading() {
	return (
		<div className="container mx-auto py-10 px-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{/* Image Skeleton */}
				<div className="aspect-square bg-gray-100 rounded-xl animate-pulse"></div>

				{/* Content Skeleton */}
				<div>
					<div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
					<div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse mb-6"></div>
					<div className="h-20 w-full bg-gray-100 rounded animate-pulse mb-8"></div>
					<div className="h-14 w-40 bg-gray-200 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
	);
}
