export default function ToolLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-gray-200 bg-white" />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mb-8 animate-pulse rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gray-200" />
              <div className="flex-1">
                <div className="mb-2 h-8 w-48 rounded bg-gray-200" />
                <div className="flex gap-2">
                  <div className="h-5 w-20 rounded bg-gray-100" />
                  <div className="h-5 w-24 rounded bg-gray-100" />
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-4/5 rounded bg-gray-100" />
              <div className="h-4 w-3/5 rounded bg-gray-100" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-3 h-5 w-24 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-100" />
            </div>
            <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-3 h-5 w-24 rounded bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-4/5 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
