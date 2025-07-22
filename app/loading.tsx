import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 mt-20">
<div className="text-center space-y-6">
  <Skeleton className="h-[30vh] w-full bg-white mx-auto rounded-lg" />
  <Skeleton className="h-[20vh] w-full bg-white mx-auto rounded-md" />
  <Skeleton className="h-[20vh] w-full bg-white mx-auto rounded-md" />
  <div className="flex justify-center space-x-4 mt-8">
    <Skeleton className="h-[5vh] w-full bg-white rounded-lg" />
    <Skeleton className="h-[5vh] w-full bg-white rounded-lg" />
  </div>
</div>
</div>
  )
}

