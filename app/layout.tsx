import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "João Paulo Oliveira | Backend Developer",
  description: "Backend Developer especializado em Java, Spring Boot e AWS. Expertise em Event-Driven Architecture, integrações complexas e Infrastructure as Code.",
  keywords: ["Java Developer", "Spring Boot", "AWS", "Backend Developer", "Event-Driven Architecture", "Terraform", "Microservices"],
  authors: [{ name: "João Paulo Oliveira" }],
  openGraph: {
    title: "João Paulo Oliveira - Backend Developer",
    description: "Especializado em Java, Spring Boot e AWS. Construindo sistemas estáveis, performáticos e escaláveis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
