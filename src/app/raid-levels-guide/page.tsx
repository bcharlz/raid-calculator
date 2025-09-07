import Link from "next/link";

export const metadata = {
  title: "RAID Levels Guide — RAID 0, 1, 5, 6, and 10 Explained",
  description:
    "Understand RAID 0/1/5/6/10: how each level works, pros and cons, and when to use them. Includes internal links back to the RAID Calculator.",
  alternates: { canonical: "/raid-levels-guide" },
};

export default function RaidLevelsGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight">RAID Levels Guide — RAID 0, 1, 5, 6, and 10 Explained</h1>
      <p className="mt-3 text-slate-300">
        RAID (Redundant Array of Independent Disks) helps you balance performance, capacity, and resilience.
        This guide summarizes the most common levels so you can make a confident choice, then verify it with the{" "}
        <Link href="/#calc" className="underline underline-offset-4">RAID Calculator</Link>.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">RAID 0 (Striping)</h2>
        <p className="text-slate-300">
          Splits data across all disks. It delivers maximum throughput and IOPS because every disk contributes to reads and writes.
          There is no redundancy. If one disk fails, the entire array fails.
        </p>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Pros: peak speed, 100% capacity.</li>
          <li>Cons: zero fault tolerance.</li>
          <li>Use cases: scratch space, temporary renders, non-critical workloads.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">RAID 1 (Mirroring)</h2>
        <p className="text-slate-300">
          Duplicates identical data to a mirror disk. Reads can be fast. Writes go to both disks.
          Efficiency is 50%, but recovery is straightforward.
        </p>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Pros: simple, resilient to single-disk failure.</li>
          <li>Cons: halves capacity.</li>
          <li>Use cases: boot volumes, small business servers, low-capacity critical data.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">RAID 5 (Striping with Single Parity)</h2>
        <p className="text-slate-300">
          Stripes data plus parity across all disks. Needs three or more disks. Usable capacity ≈ (N − 1) × disk size.
          Rebuilds stress remaining disks, so plan for monitoring and backups.
        </p>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Pros: good efficiency, single-disk fault tolerance.</li>
          <li>Cons: write penalty, risky rebuild windows on large HDDs.</li>
          <li>Use cases: balanced NAS arrays with 4–8 drives.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">RAID 6 (Striping with Dual Parity)</h2>
        <p className="text-slate-300">
          Similar to RAID 5, but with two parity blocks. Needs four or more disks. Usable capacity ≈ (N − 2) × disk size.
          Safer on big arrays because it survives two failures.
        </p>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Pros: two-disk fault tolerance.</li>
          <li>Cons: more write overhead than RAID 5.</li>
          <li>Use cases: large HDD arrays where rebuilds take many hours or days.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">RAID 10 (Mirrored Stripes)</h2>
        <p className="text-slate-300">
          Stripes across mirrored pairs. Requires an even number of disks. Delivers strong IOPS and good resilience.
          Efficiency is roughly 50%.
        </p>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Pros: excellent performance and resilience.</li>
          <li>Cons: higher cost per usable TB.</li>
          <li>Use cases: databases, VMs, mixed read/write workloads.</li>
        </ul>
      </section>

      <nav className="mt-10 text-sm text-slate-300">
        <span className="mr-2">Next up:</span>
        <Link href="/performance-tips" className="underline underline-offset-4 mr-4">RAID Performance Tips</Link>
        <Link href="/best-practices" className="underline underline-offset-4 mr-4">Best Practices</Link>
        <Link href="/troubleshooting" className="underline underline-offset-4">Troubleshooting</Link>
      </nav>

      <div className="mt-8">
        <Link href="/#calc" className="inline-block rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
          Try the RAID Calculator
        </Link>
      </div>
    </article>
  );
}
EOF

# 3) Performance Tips
cat > src/app/performance-tips/page.tsx << 'EOF'
import Link from "next/link";

export const metadata = {
  title: "RAID Performance Tips — Maximize IOPS and Throughput",
  description:
    "Practical ways to improve RAID performance: the right level, stripe size, matched drives, SSD vs HDD, caching, and benchmarking. Includes a link back to the calculator.",
  alternates: { canonical: "/performance-tips" },
};

export default function PerformanceTipsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight">RAID Performance Tips — Maximize IOPS and Throughput</h1>
      <p className="mt-3 text-slate-300">
        A well-tuned array can feel dramatically faster. These tips focus on practical, low-risk changes you can make,
        then validate with the{" "}
        <Link href="/#calc" className="underline underline-offset-4">RAID Calculator</Link>.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Pick the Right RAID Level</h2>
        <p className="text-slate-300">
          RAID 0 provides the highest throughput, but no redundancy. RAID 10 balances fault tolerance with excellent random IOPS.
          RAID 5 and 6 are efficient for capacity and reads, but parity math adds write overhead.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Use Matched, Enterprise-Grade Drives</h2>
        <p className="text-slate-300">
          Mixed sizes waste capacity. Mixed performance characteristics create hotspots. Prefer NAS or enterprise HDDs or SSDs,
          and keep firmware consistent across the set.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Stripe Size and Workload</h2>
        <p className="text-slate-300">
          Larger stripes favor large sequential workloads, like media. Smaller stripes help random workloads, like small database pages.
          Your controller or software RAID docs recommend defaults; benchmark to confirm.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">SSD Caches and Write-Back Policies</h2>
        <p className="text-slate-300">
          Read caches help hot sets. Write-back caching improves latency, but requires power-loss protection to avoid corruption.
          Follow vendor guidance for battery-backed or supercap modules.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Benchmark and Monitor</h2>
        <p className="text-slate-300">
          Use repeatable tools (<code>fio</code>, CrystalDiskMark) and monitor SMART stats. Change one variable at a time.
          Keep notes so you can reproduce improvements.
        </p>
      </section>

      <nav className="mt-10 text-sm text-slate-300">
        <Link href="/raid-levels-guide" className="underline underline-offset-4 mr-4">RAID Levels Guide</Link>
        <Link href="/best-practices" className="underline underline-offset-4 mr-4">Best Practices</Link>
        <Link href="/troubleshooting" className="underline underline-offset-4">Troubleshooting</Link>
      </nav>

      <div className="mt-8">
        <Link href="/#calc" className="inline-block rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
          Estimate capacity and IOPS
        </Link>
      </div>
    </article>
  );
}