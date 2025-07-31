import { Button } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/logo.png" alt="Logo" width={300} height={300} />
      <Button variant="contained" color="primary" href="/script-generator" sx={{ mt: 2, backgroundColor: "rgb(100,126,220)", color: "#fff" }}>
        Get Started
      </Button>
    </div>
  );
}
