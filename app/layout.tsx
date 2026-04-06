import type { Metadata } from 'next';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('./globals.css');

export const metadata: Metadata = {
  title: 'Workout Planner',
  description: 'Generate personalized workout routines based on your goals'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
