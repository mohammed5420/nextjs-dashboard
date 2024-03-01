import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Banknote, Clock, Inbox, Users } from "lucide-react"

const iconMap = {
  collected: Banknote,
  customers: Users,
  pending: Clock,
  invoices: Inbox,
};

export default async function CardWrapper() {
  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();
  return (
    <>
      <CardComp title="Collected" value={totalPaidInvoices} type="collected" />
      <CardComp title="Pending" value={totalPendingInvoices} type="pending" />
      <CardComp title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <CardComp
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function CardComp({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <Card className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <CardTitle className="flex gap-2 p-4 text-sm font-medium">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        {title}
      </CardTitle>
      <CardContent>
        <p
          className={`${lusitana.className}
truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
