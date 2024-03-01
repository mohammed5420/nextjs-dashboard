import clsx from 'clsx';
import { Check, Clock } from 'lucide-react';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500 hover:bg-gray-200': status === 'pending',
          'bg-green-600 text-white hover:bg-green-700': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <Clock className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <Check className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
