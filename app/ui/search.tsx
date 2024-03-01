'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search as SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams);
    if (!pathname.includes("customers")) {
      params.set('page', '1');
    }
    if (text) {
      params.set('query', text);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="grid w-full items-center gap-1.5">
        <Input
          className="pl-10"
          onChange={e => handleSearch(e.currentTarget.value)}
          defaultValue={searchParams.get('query')?.toString()}
          type="text" id="search" placeholder={placeholder} />
      </div>
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
