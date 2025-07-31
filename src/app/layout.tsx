import "@/app/globals.css";
import MuiThemeProvider from "@/theme/theme-provider";

export const metadata = {
  title: "Script Generator",
  description: "Create marketing scripts fast",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  );
}
