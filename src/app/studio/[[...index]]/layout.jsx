export const metadata = {
  title: "Ecommerce Sanity Studio",
  description: "Ecommerce backend Sanity Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
