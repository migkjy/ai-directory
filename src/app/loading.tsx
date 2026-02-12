export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-gray-200 bg-white" />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 h-8 w-32 animate-pulse rounded bg-blue-500/30" />
            <div className="mx-auto mb-4 h-12 w-96 max-w-full animate-pulse rounded bg-blue-400/20" />
            <div className="mx-auto h-6 w-64 animate-pulse rounded bg-blue-400/20" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="mb-3 h-5 w-2/3 rounded bg-gray-200" />
                <div className="mb-2 h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-4/5 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
