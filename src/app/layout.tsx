import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Montserrat } from 'next/font/google'
import { ToastContainer } from "react-toastify";

const font = Montserrat({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "NexTodo",
  description: "NexTodo - Nextjs v15 CRUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
