import Link from 'next/link';
import type { Metadata } from 'next';
import QueryProvider from '@/lib/queryProvider';
import '../styles/globals.css';
import { Header, RecentSearchList } from '@/components';

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description:
    'Weather lookup by city and offering data analytics and multi-city comparison',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <html lang="en">
        <body>
          <Header />
          <main
            className="flex min-h-screen w-full flex-col items-center justify-start mx-auto sm:p-4 lg:p-6"
            style={{ maxWidth: 'min(80%, 1920px)' }}>
            {children}

            <RecentSearchList />
          </main>
          <footer className="flex w-full items-center justify-center mx-auto p-4 lg:p-6 bg-black text-white gap-2">
            &copy; Maile Lucks for
            <Link
              href="https://grassrootsanalytics.com"
              target="_blank"
              className="text-blue-500 hover:underline inline">
              Grassroots Analytics
            </Link>
          </footer>
        </body>
      </html>
    </QueryProvider>
  );
}
