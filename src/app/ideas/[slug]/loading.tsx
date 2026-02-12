export default function IdeaDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-gray-200 bg-white" />
      <main className="flex-1 bg-gray-50/30">
        {/* Header skeleton */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-4 py-10 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 h-8 w-32 animate-pulse rounded-lg bg-white/10" />
            <div className="mb-4 flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-md bg-white/20" />
              <div className="h-6 w-16 animate-pulse rounded-md bg-white/15" />
              <div className="h-6 w-14 animate-pulse rounded-md bg-white/10" />
            </div>
            <div className="mb-3 h-10 w-4/5 animate-pulse rounded bg-white/15" />
            <div className="mb-2 h-5 w-full animate-pulse rounded bg-white/10" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-white/10" />
            <div className="mt-4 h-4 w-28 animate-pulse rounded bg-white/10" />
          </div>
        </div>

        {/* Quick stats skeleton */}
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 text-center">
                <div className="mx-auto mb-1 h-5 w-5 rounded-full bg-gray-200" />
                <div className="mx-auto mb-1 h-3 w-12 rounded bg-gray-100" />
                <div className="mx-auto h-4 w-16 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Problem & Solution skeleton */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-3 h-4 w-16 rounded bg-gray-200" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-gray-100" />
                <div className="h-3 w-4/5 rounded bg-gray-100" />
                <div className="h-3 w-3/5 rounded bg-gray-100" />
              </div>
            </div>
            <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-3 h-4 w-16 rounded bg-gray-200" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-gray-100" />
                <div className="h-3 w-4/5 rounded bg-gray-100" />
                <div className="h-3 w-3/5 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="space-y-3">
              <div className="h-6 w-48 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-3/4 rounded bg-gray-100" />
              <div className="h-2" />
              <div className="h-5 w-36 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-5/6 rounded bg-gray-100" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-2/3 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
