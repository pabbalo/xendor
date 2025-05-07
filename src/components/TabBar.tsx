
'use client';

import Link from 'next/link';
import { HomeIcon, CalendarDaysIcon, CogIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation'; // Import usePathname

const navigation = [
  { name: 'Clienti', href: '/clients', icon: HomeIcon },
  { name: 'Appuntamenti', href: '/appointments', icon: CalendarDaysIcon },
  { name: 'Impostazioni', href: '/settings', icon: CogIcon }, // Placeholder, no page created yet
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function TabBar() {
  const pathname = usePathname(); // Get current path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-20">
      <div className="max-w-xl mx-auto flex justify-around">
        {navigation.map((item) => {
          const current = pathname === item.href || (item.href === '/clients' && pathname.startsWith('/clients')); // Make 'Clienti' active for /clients and /clients/detail etc.
          return (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                current
                  ? 'text-indigo-600 border-t-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-t-2 hover:border-gray-300',
                'group flex flex-col items-center justify-center w-full py-2 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none'
              )}
              aria-current={current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500',
                  'h-5 w-5 sm:h-6 sm:w-6 mb-0.5 sm:mb-1'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

