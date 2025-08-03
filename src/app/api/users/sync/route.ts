import { auth, currentUser } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await currentUser();

  try {
    const client = await clientPromise;
    const db = client.db("test");
    const users = db.collection("users");

    // Avoid duplicate insertion
    const exists = await users.findOne({ clerkUserId: userId });
    if (exists) return NextResponse.json({ message: "User already exists" });

    await users.insertOne({
      clerkUserId: userId,
      email: user?.emailAddresses[0]?.emailAddress,
      plan: "free",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User synced" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to insert user" }, { status: 500 });
  }
}
