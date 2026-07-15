import { Repeat } from 'meemaw';

interface HoursRow {
  readonly days: string;
  readonly hours: string;
}

const ROWS: readonly HoursRow[] = [
  { days: 'Mon – Sat', hours: '8:00 AM – 10:00 PM' },
  { days: 'Sunday',    hours: '1:00 PM – 10:00 PM' },
];

export function HoursTable() {
  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        <Repeat each={[...ROWS]}>
          {(row) => (
            <tr key={row.days} className="border-b border-hairline last:border-0">
              <td className="font-body text-[15px] text-ink py-3 pr-6">{row.days}</td>
              <td className="font-mono text-[15px] text-steel py-3">{row.hours}</td>
            </tr>
          )}
        </Repeat>
      </tbody>
    </table>
  );
}
