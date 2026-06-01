import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CaféStoll | Cafés Especiais & Confeitaria Artesanal",
  description: "Desfrute de grãos selecionados do Sul de Minas, croissants artesanais e um ambiente sofisticado. Viva a autêntica experiência CaféStoll.",
  keywords: ["café", "café especial", "confeitaria", "brunch", "cafeteria premium", "artesanal"],
  authors: [{ name: "CaféStoll Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-full`}>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
