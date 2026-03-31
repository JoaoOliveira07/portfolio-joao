import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-joao.vercel.app'),
  title: {
    default: "João Paulo Oliveira | Backend Developer",
    template: "%s | João Paulo Oliveira"
  },
  description: "Backend Developer especializado em Java, Spring Boot e AWS. Expertise em Event-Driven Architecture, integrações complexas e Infrastructure as Code.",
  keywords: [
    "Java Developer",
    "Spring Boot",
    "AWS",
    "Backend Developer",
    "Event-Driven Architecture",
    "Terraform",
    "Microservices",
    "Infrastructure as Code",
    "PostgreSQL",
    "Hibernate"
  ],
  authors: [{ name: "João Paulo Oliveira", url: "https://github.com/JoaoOliveira07" }],
  creator: "João Paulo Oliveira",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: "https://portfolio-joao.vercel.app",
    title: "João Paulo Oliveira - Backend Developer",
    description: "Especializado em Java, Spring Boot e AWS. Construindo sistemas estáveis, performáticos e escaláveis.",
    siteName: "João Paulo Oliveira Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Paulo Oliveira - Backend Developer",
    description: "Especializado em Java, Spring Boot e AWS. Construindo sistemas estáveis, performáticos e escaláveis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
