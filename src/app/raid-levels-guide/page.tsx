import Link from "next/link";

export const metadata = {
  title: "RAID Levels Guide — RAID 0, 1, 5, 6, and 10 Explained",
  description:
    "Understand RAID 0/1/5/6/10: how each level works, pros and cons, and when to use them. Includes internal links back to the RAID Calculator.",
  alternates: { canonical: "/raid-levels-guide" },
};

export default function RaidLevelsGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-800">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">RAID Levels Guide — RAID 0, 1, 5, 6, and 10 Explained</h1>
      <p className="mt-3 text-slate-700">
        RAID (Redundant Array of Independent Disks) helps you balance performance, capacity, and resilience.
        This guide summarizes the most common levels so you can make a confident choice, then verify it with the{" "}
        <Link href="/#calc" className="underline underline-offset-4">RAID Calculator</Link>.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">RAID 0 (Striping)</h2>
        <p className="text-slate-700">
          Splits data across all disks. It delivers maximum throughput and IOPS because every disk contributes to reads and writes.
          There is no redundancy. If one disk fails, the entire array fails.
        </p>
        <ul className="list-disc pl-5 text-slate-700">
          <li>Pros: peak speed, 100% capacity.</li>
          <li>Cons: zero fault tolerance.</li>
          <li>Use cases: scratch space, temporary renders, non-critical workloads.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">RAID 1 (Mirroring)</h2>
        <p className="text-slate-700">
          Duplicates identical data to a mirror disk. Reads can be fast. Writes go to both disks.
          Efficiency is 50%, but recovery is straightforward.
        </p>
        <ul className="list-disc pl-5 text-slate-700">
          <li>Pros: simple, resilient to single-disk failure.</li>
          <li>Cons: halves capacity.</li>
          <li>Use cases: boot volumes, small business servers, low-capacity critical data.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">RAID 5 (Striping with Single Parity)</h2>
        <p className="text-slate-700">
          Stripes data plus parity across all disks. Needs three or more disks. Usable capacity ≈ (N − 1) × disk size.
          Rebuilds stress remaining disks, so plan for monitoring and backups.
        </p>
        <ul className="list-disc pl-5 text-slate-700">
          <li>Pros: good efficiency, single-disk fault tolerance.</li>
          <li>Cons: write penalty, risky rebuild windows on large HDDs.</li>
          <li>Use cases: balanced NAS arrays with 4–8 drives.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">RAID 6 (Striping with Dual Parity)</h2>
        <p className="text-slate-700">
          Similar to RAID 5, but with two parity blocks. Needs four or more disks. Usable capacity ≈ (N − 2) × disk size.
          Safer on big arrays because it survives two failures.
        </p>
        <ul className="list-disc pl-5 text-slate-700">
          <li>Pros: two-disk fault tolerance.</li>
          <li>Cons: more write overhead than RAID 5.</li>
          <li>Use cases: large HDD arrays where rebuilds take many hours or days.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">RAID 10 (Mirrored Stripes)</h2>
        <p className="text-slate-700">
          Stripes across mirrored pairs. Requires an even number of disks. Delivers strong IOPS and good resilience.
          Efficiency is roughly 50%.
        </p>
        <ul className="list-disc pl-5 text-slate-700">
          <li>Pros: excellent performance and resilience.</li>
          <li>Cons: higher cost per usable TB.</li>
          <li>Use cases: databases, VMs, mixed read/write workloads.</li>
        </ul>
      </section>

      <nav className="mt-10 text-sm text-slate-700">
        <span className="mr-2">Next up:</span>
        <Link href="/performance-tips" className="underline underline-offset-4 mr-4">RAID Performance Tips</Link>
        <Link href="/best-practices" className="underline underline-offset-4 mr-4">Best Practices</Link>
        <Link href="/troubleshooting" className="underline underline-offset-4">Troubleshooting</Link>
      </nav>

      <div className="mt-8">
        <Link href="/#calc" className="inline-block rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm hover:bg-slate-200 text-slate-800">
          Try the RAID Calculator
        </Link>
      </div>
    </article>
  );
}