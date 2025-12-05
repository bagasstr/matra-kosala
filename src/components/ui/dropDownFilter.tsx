'use client';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, Filter } from 'lucide-react';
import { Checkbox } from './checkbox';
import { useState } from 'react';

export function DropDownFilter(filter: any, setFilter: any) {
   const categories = ['struktur', 'arsitektur', 'mep', 'material alam'];

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant='outline' className='rounded-sm p-3 h-10'>
               <Filter />
               Kategori
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Filter Kategori</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className='p-2 space-y-2'>
               {categories.map((category) => (
                  <div key={category} className='flex items-center'>
                     <select
                        className='border rounded-md px-4 py-2'
                        value={filter || ''}
                        onChange={(e) => setFilter(e.target.value || null)}>
                        <option value=''>{category}</option>
                     </select>
                  </div>
               ))}
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
