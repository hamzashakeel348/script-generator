import "@/app/globals.css";
import MuiThemeProvider from "@/theme/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Script Generator",
  description: "Create marketing scripts fast",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      signInForceRedirectUrl="/script-generator"
    >
      <Toaster position="top-right" />
      <html lang="en">
        <body className="h-screen overflow-hidden bg-gray-50">
          <MuiThemeProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </MuiThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
