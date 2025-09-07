import Link from "next/link";

export const metadata = {
  title: "RAID Troubleshooting — Common Problems and Fixes",
  description:
    "Diagnose degraded arrays, slow rebuilds, performance drops, and detection issues. Practical steps for recovery and prevention.",
  alternates: { canonical: "/troubleshooting" },
};

export default function TroubleshootingPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-800">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">RAID Troubleshooting — Common Problems and Fixes</h1>
      <p className="mt-3 text-slate-700">
        When something goes wrong, move methodically. Protect data first, then restore redundancy. Use vendor tools,
        verify hardware, and test before returning to production.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Degraded Array</h2>
        <p className="text-slate-700">
          A disk dropped out, or SMART shows pending failure. Replace with a same-size or larger disk, then rebuild.
          Avoid heavy writes until resilience returns.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Slow Rebuilds</h2>
        <p className="text-slate-700">
          Large HDDs, parity RAID overhead, or busy workloads extend rebuilds. Prefer maintenance windows. Consider RAID 6
          or RAID 10 for safer rebuild characteristics.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Performance Dropped</h2>
        <p className="text-slate-700">
          Look for mixed drives, thermal throttling, controller limits, or mis-sized stripes. Benchmark before and after changes.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Array Not Detected</h2>
        <p className="text-slate-700">
          Check power, cabling, HBA/RAID firmware, and BIOS. If moving disks to new hardware, match controller models and firmware.
        </p>
      </section>

      <nav className="mt-10 text-sm text-slate-700">
        <Link href="/raid-levels-guide" className="underline underline-offset-4 mr-4">RAID Levels Guide</Link>
        <Link href="/performance-tips" className="underline underline-offset-4 mr-4">Performance Tips</Link>
        <Link href="/best-practices" className="underline underline-offset-4">Best Practices</Link>
      </nav>

      <div className="mt-8">
        <Link href="/#calc" className="inline-block rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm hover:bg-slate-200 text-slate-800">
          Re-check capacity and efficiency
        </Link>
      </div>
    </article>
  );
}