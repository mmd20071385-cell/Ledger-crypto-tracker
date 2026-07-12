export default function LoadingSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-ink-line/70">
          <td colSpan={7} className="px-5 py-3">
            <div className="h-8 w-full animate-pulse rounded bg-ink-raised/70" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
