import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCcw } from 'lucide-react';
export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <Card className="flex w-full flex-col md:col-span-4">
      <CardHeader>
        <CardTitle>
          Latest Invoices
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white px-6">
        {latestInvoices.map((invoice, i) => {
          return (
            <div
              key={invoice.id}
              className={clsx(
                'flex flex-row items-center justify-between py-4',
                {
                  'border-t': i !== 0,
                },
              )}
            >
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={invoice.image_url} />
                  <AvatarFallback>{invoice.name.split(" ").map(word => word.at(0))}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {invoice.name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p
                className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
              >
                {invoice.amount}
              </p>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex items-center pb-2 pt-6">
        <RefreshCcw size={18} className="text-gray-500" />
        <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
      </CardFooter>
    </Card>
  );
}
