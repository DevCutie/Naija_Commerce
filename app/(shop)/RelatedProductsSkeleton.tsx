export default function RelatedProductsSkeleton() {
  return (
    <div className="mt-24 border-t pt-16">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="group block">
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 animate-pulse"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}