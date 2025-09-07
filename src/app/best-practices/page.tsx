import Link from "next/link";

export const metadata = {
  title: "RAID Best Practices — Reliable and Efficient Arrays",
  description:
    "Build stable RAID arrays with practical guidance: backups, disk counts, monitoring, rebuild planning, and mixed-drive cautions.",
  alternates: { canonical: "/best-practices" },
};

export default function BestPracticesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-800">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">RAID Best Practices — Reliable and Efficient Arrays</h1>
      <p className="mt-3 text-slate-700">
        RAID reduces downtime from drive failures, but it is not a backup. Use these practices to avoid surprises,
        and confirm capacity choices with the{" "}
        <Link href="/#calc" className="underline underline-offset-4">RAID Calculator</Link>.
      </p>

      <ol className="mt-6 list-decimal pl-5 text-slate-700 space-y-3">
        <li><strong>Keep real backups.</strong> RAID does not protect against deletion, ransomware, or site loss.</li>
        <li><strong>Use the right disk count.</strong> RAID 5 needs ≥3. RAID 6 is safest with ≥6. RAID 10 needs an even number.</li>
        <li><strong>Monitor SMART and alerts.</strong> Replace suspect disks early. Automate alerts via your NAS or OS.</li>
        <li><strong>Standardize hardware.</strong> Same model and firmware reduces edge cases during rebuilds.</li>
        <li><strong>Document configuration.</strong> Record stripe size, block size, controller settings, and cabling.</li>
        <li><strong>Test rebuild expectations.</strong> Know how long a rebuild takes for your capacity and workload.</li>
        <li><strong>Plan maintenance windows.</strong> Rebuilds and expansions are safest during low I/O periods.</li>
      </ol>

      <nav className="mt-10 text-sm text-slate-700">
        <Link href="/raid-levels-guide" className="underline underline-offset-4 mr-4">RAID Levels Guide</Link>
        <Link href="/performance-tips" className="underline underline-offset-4 mr-4">Performance Tips</Link>
        <Link href="/troubleshooting" className="underline underline-offset-4">Troubleshooting</Link>
      </nav>

      <div className="mt-8">
        <Link href="/#calc" className="inline-block rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm hover:bg-slate-200 text-slate-800">
          Plan your array now
        </Link>
      </div>
    </article>
  );
}