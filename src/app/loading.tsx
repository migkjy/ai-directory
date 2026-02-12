export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-gray-200 bg-white" />
      <main className="flex-1">
        {/* Hero skeleton */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 h-4 w-40 animate-pulse rounded bg-purple-400/30" />
            <div className="mx-auto mb-4 h-12 w-96 max-w-full animate-pulse rounded bg-purple-400/20" />
            <div className="mx-auto mb-8 h-6 w-80 max-w-full animate-pulse rounded bg-purple-400/20" />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="h-12 w-44 animate-pulse rounded-lg bg-purple-400/30" />
              <div className="h-12 w-64 animate-pulse rounded-xl bg-purple-400/15" />
            </div>
          </div>
        </div>
        {/* Cards section skeleton */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex gap-2">
                  <div className="h-5 w-16 rounded-md bg-gray-200" />
                  <div className="h-5 w-14 rounded-md bg-gray-100" />
                </div>
                <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
                <div className="mb-1 h-4 w-full rounded bg-gray-100" />
                <div className="mb-4 h-4 w-4/5 rounded bg-gray-100" />
                <div className="flex justify-between border-t border-gray-100 pt-3">
                  <div className="h-3 w-16 rounded bg-gray-100" />
                  <div className="h-3 w-20 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
