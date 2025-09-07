import Link from "next/link";

export const metadata = {
  title: "RAID Best Practices — Reliable and Efficient Arrays",
  description:
    "Build stable RAID arrays with practical guidance: backups, disk counts, monitoring, rebuild planning, and mixed-drive cautions.",
  alternates: { canonical: "/best-practices" },
};

export default function BestPracticesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight">RAID Best Practices — Reliable and Efficient Arrays</h1>
      <p className="mt-3 text-slate-300">
        RAID reduces downtime from drive failures, but it is not a backup. Use these practices to avoid surprises,
        and confirm capacity choices with the{" "}
        <Link href="/#calc" className="underline underline-offset-4">RAID Calculator</Link>.
      </p>

      <ol className="mt-6 list-decimal pl-5 text-slate-300 space-y-3">
        <li><strong>Keep real backups.</strong> RAID does not protect against deletion, ransomware, or site loss.</li>
        <li><strong>Use the right disk count.</strong> RAID 5 needs ≥3. RAID 6 is safest with ≥6. RAID 10 needs an even number.</li>
        <li><strong>Monitor SMART and alerts.</strong> Replace suspect disks early. Automate alerts via your NAS or OS.</li>
        <li><strong>Standardize hardware.</strong> Same model and firmware reduces edge cases during rebuilds.</li>
        <li><strong>Document configuration.</strong> Record stripe size, block size, controller settings, and cabling.</li>
        <li><strong>Test rebuild expectations.</strong> Know how long a rebuild takes for your capacity and workload.</li>
        <li><strong>Plan maintenance windows.</strong> Rebuilds and expansions are safest during low I/O periods.</li>
      </ol>

      <nav className="mt-10 text-sm text-slate-300">
        <Link href="/raid-levels-guide" className="underline underline-offset-4 mr-4">RAID Levels Guide</Link>
        <Link href="/performance-tips" className="underline underline-offset-4 mr-4">Performance Tips</Link>
        <Link href="/troubleshooting" className="underline underline-offset-4">Troubleshooting</Link>
      </nav>

      <div className="mt-8">
        <Link href="/#calc" className="inline-block rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
          Plan your array now
        </Link>
      </div>
    </article>
  );
}
EOF

# 5) Troubleshooting
cat > src/app/troubleshooting/page.tsx << 'EOF'
import Link from "next/link";

export const metadata = {
  title: "RAID Troubleshooting — Common Problems and Fixes",
  description:
    "Diagnose degraded arrays, slow rebuilds, performance drops, and detection issues. Practical steps for recovery and prevention.",
  alternates: { canonical: "/troubleshooting" },
};

export default function TroubleshootingPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight">RAID Troubleshooting — Common Problems and Fixes</h1>
      <p className="mt-3 text-slate-300">
        When something goes wrong, move methodically. Protect data first, then restore redundancy. Use vendor tools,
        verify hardware, and test before returning to production.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Degraded Array</h2>
        <p className="text-slate-300">
          A disk dropped out, or SMART shows pending failure. Replace with a same-size or larger disk, then rebuild.
          Avoid heavy writes until resilience returns.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Slow Rebuilds</h2>
        <p className="text-slate-300">
          Large HDDs, parity RAID overhead, or busy workloads extend rebuilds. Prefer maintenance windows. Consider RAID 6
          or RAID 10 for safer rebuild characteristics.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Performance Dropped</h2>
        <p className="text-slate-300">
          Look for mixed drives, thermal throttling, controller limits, or mis-sized stripes. Benchmark before and after changes.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Array Not Detected</h2>
        <p className="text-slate-300">
          Check power, cabling, HBA/RAID firmware, and BIOS. If moving disks to new hardware, match controller models and firmware.
        </p>
      </section>

      <nav className="mt-10 text-sm text-slate-300">
        <Link href="/raid-levels-guide" className="underline underline-offset-4 mr-4">RAID Levels Guide</Link>
        <Link href="/performance-tips" className="underline underline-offset-4 mr-4">Performance Tips</Link>
        <Link href="/best-practices" className="underline underline-offset-4">Best Practices</Link>
      </nav>

      <div className="mt-8">
        <Link href="/#calc" className="inline-block rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
          Re-check capacity and efficiency
        </Link>
      </div>
    </article>
  );
}