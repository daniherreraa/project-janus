import localFont from 'next/font/local'
import "./globals.css";
import CustomCursor from "@/components/ui/customcursor";

export const metadata = {
  title: "Project Janus",
  description: "The Space Biology Knowledge Engine for everyone",
  icons: {
    icon: "/jans.svg"
  }
};

const technor = localFont({
  src: '../public/fonts/Technor-Variable.woff2',
  variable: '--font-technor'
})

const supreme = localFont({
  src: [
    {
      path: '../public/fonts/Supreme-Variable.woff2',
      style: 'normal'
    },
    {
      path: '../public/fonts/Supreme-VariableItalic.woff2',
      style: 'italic'
    }
  ],
  variable: '--font-supreme'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${technor.variable} ${supreme.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
