import Link from "next/link";

export const metadata = {
  title: "RAID Performance Tips — Maximize IOPS and Throughput",
  description:
    "Practical ways to improve RAID performance: the right level, stripe size, matched drives, SSD vs HDD, caching, and benchmarking. Includes a link back to the calculator.",
  alternates: { canonical: "/performance-tips" },
};

export default function PerformanceTipsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-800">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">RAID Performance Tips — Maximize IOPS and Throughput</h1>
      <p className="mt-3 text-slate-700">
        A well-tuned array can feel dramatically faster. These tips focus on practical, low-risk changes you can make,
        then validate with the{" "}
        <Link href="/#calc" className="underline underline-offset-4">RAID Calculator</Link>.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Pick the Right RAID Level</h2>
        <p className="text-slate-700">
          RAID 0 provides the highest throughput, but no redundancy. RAID 10 balances fault tolerance with excellent random IOPS.
          RAID 5 and 6 are efficient for capacity and reads, but parity math adds write overhead.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Use Matched, Enterprise-Grade Drives</h2>
        <p className="text-slate-700">
          Mixed sizes waste capacity. Mixed performance characteristics create hotspots. Prefer NAS or enterprise HDDs or SSDs,
          and keep firmware consistent across the set.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Stripe Size and Workload</h2>
        <p className="text-slate-700">
          Larger stripes favor large sequential workloads, like media. Smaller stripes help random workloads, like small database pages.
          Your controller or software RAID docs recommend defaults; benchmark to confirm.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">SSD Caches and Write-Back Policies</h2>
        <p className="text-slate-700">
          Read caches help hot sets. Write-back caching improves latency, but requires power-loss protection to avoid corruption.
          Follow vendor guidance for battery-backed or supercap modules.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Benchmark and Monitor</h2>
        <p className="text-slate-700">
          Use repeatable tools (<code>fio</code>, CrystalDiskMark) and monitor SMART stats. Change one variable at a time.
          Keep notes so you can reproduce improvements.
        </p>
      </section>

      <nav className="mt-10 text-sm text-slate-700">
        <Link href="/raid-levels-guide" className="underline underline-offset-4 mr-4">RAID Levels Guide</Link>
        <Link href="/best-practices" className="underline underline-offset-4 mr-4">Best Practices</Link>
        <Link href="/troubleshooting" className="underline underline-offset-4">Troubleshooting</Link>
      </nav>

      <div className="mt-8">
        <Link href="/#calc" className="inline-block rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm hover:bg-slate-200 text-slate-800">
          Estimate capacity and IOPS
        </Link>
      </div>
    </article>
  );
}