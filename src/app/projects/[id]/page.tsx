export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Project #{id}</h1>
          <p className="text-sm text-gray-400">Photos, timeline, verification logs and on-chain links.</p>
        </div>
        <a href="/marketplace" className="inline-flex items-center rounded-md bg-emerald-500 px-3 py-1.5 text-black hover:bg-emerald-400 text-sm">Buy Credits</a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl card-dark p-4">
            <h2 className="font-medium mb-3 text-white">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="aspect-video rounded-md glass" />
              <div className="aspect-video rounded-md glass" />
              <div className="aspect-video rounded-md glass" />
            </div>
          </div>

          <div className="rounded-xl card-dark p-4">
            <h2 className="font-medium mb-3 text-white">Timeline</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>2024-01-12 • Project submitted for verification</li>
              <li>2024-02-03 • Drone imagery uploaded • hash 0xabc…123</li>
              <li>2024-03-16 • Verified and approved • tx 0xdef…456</li>
              <li>2024-03-20 • 12,000 credits minted • tx 0x789…0ab</li>
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl card-dark p-4">
            <h3 className="font-medium mb-2 text-white">Verification</h3>
            <p className="text-sm text-gray-300">Verifier: EcoVerify</p>
            <p className="text-sm text-gray-300">Status: Approved</p>
            <a href="#" className="text-sm text-emerald-400 hover:underline">View signed attestation</a>
          </div>

          <div className="rounded-xl card-dark p-4">
            <h3 className="font-medium mb-2 text-white">Blockchain</h3>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>Registration tx: <a className="text-emerald-400 hover:underline" href="#">0xdef…456</a></li>
              <li>Mint tx: <a className="text-emerald-400 hover:underline" href="#">0x789…0ab</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}


