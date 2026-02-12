export default function IdeasLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-gray-200 bg-white" />
      <main className="flex-1 bg-gray-50/30">
        {/* Hero skeleton */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 h-4 w-32 animate-pulse rounded bg-purple-400/30" />
            <div className="mx-auto mb-4 h-10 w-72 max-w-full animate-pulse rounded bg-purple-400/20" />
            <div className="mx-auto h-5 w-80 max-w-full animate-pulse rounded bg-purple-400/20" />
            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="h-4 w-16 animate-pulse rounded bg-purple-400/20" />
              <div className="h-4 w-px bg-purple-400/30" />
              <div className="h-4 w-20 animate-pulse rounded bg-purple-400/20" />
              <div className="h-4 w-px bg-purple-400/30" />
              <div className="h-4 w-16 animate-pulse rounded bg-purple-400/20" />
            </div>
          </div>
        </div>

        {/* Search bar skeleton */}
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="mb-4 h-12 w-full animate-pulse rounded-xl bg-gray-200/60" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-gray-200/60" />
            ))}
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="mb-3 flex gap-2">
                  <div className="h-6 w-16 rounded-md bg-gray-200" />
                  <div className="h-6 w-20 rounded-md bg-gray-100" />
                </div>
                <div className="mb-2 h-5 w-4/5 rounded bg-gray-200" />
                <div className="mb-1 h-4 w-full rounded bg-gray-100" />
                <div className="mb-1 h-4 w-full rounded bg-gray-100" />
                <div className="mb-4 h-4 w-3/5 rounded bg-gray-100" />
                <div className="mb-3 flex gap-2">
                  <div className="h-5 w-14 rounded-full bg-gray-100" />
                  <div className="h-5 w-20 rounded-full bg-gray-100" />
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <div className="h-3 w-16 rounded bg-gray-100" />
                    <div className="h-3 w-20 rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
