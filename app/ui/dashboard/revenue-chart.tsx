import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const chartHeight = 350;
  // NOTE: comment in this code when you get to this point in the course

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <Card className="w-full md:col-span-4">
      <CardHeader className={`${lusitana.className}`}>
        <CardTitle>Recent Revenue</CardTitle>
      </CardHeader>
      <CardContent className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
        <div
          className="mb-6 hidden flex-col col-span-1 justify-between text-sm text-gray-400 sm:flex"
          style={{ height: `${chartHeight}px` }}
        >
          {yAxisLabels.map((label) => (
            <p key={label}>{label}</p>
          ))}
        </div>

        <div className='grid col-span-11 grid-cols-12 gap-2 w-full'>
          {revenue.map((month) => (
            <div key={month.month} className="col-span-1 flex flex-col-reverse items-center gap-2">
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
              <div
                className="w-full rounded-md bg-blue-400 hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center pb-2 pt-6">
        <Calendar size={18} className="text-gray-500" />
        <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
      </CardFooter>
    </Card >
  );
}
