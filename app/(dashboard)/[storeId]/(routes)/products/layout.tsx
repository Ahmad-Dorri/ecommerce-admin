export const metadata = {
  title: 'محصولات',
  description: 'محصولات',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
