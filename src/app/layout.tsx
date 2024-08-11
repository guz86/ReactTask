import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vite + React + TS',
  description: 'My App is Vite + React + TS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
