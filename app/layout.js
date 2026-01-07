import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Toast from "./components/Toast";
import { DataProvider } from "./context/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EduStream - Student Management",
  description: "A premium student management dashboard for forward-thinking institutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} flex h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 antialiased`}>
        <DataProvider>
          <Toast />
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden overflow-y-auto">
            <Header />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
