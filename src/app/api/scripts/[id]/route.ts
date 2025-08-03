import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET a single script
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const client = await clientPromise;
    const db = client.db();
    const script = await db.collection("scripts").findOne({
      _id: new ObjectId(id),
      clerkUserId: userId,
    });

    if (!script)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(script);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch script" },
      { status: 500 }
    );
  }
}

// PATCH to update a script
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();
  const { id } = await params;

  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("scripts").updateOne(
      {
        _id: new ObjectId(id),
        clerkUserId: userId,
      },
      {
        $set: {
          content,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      message: "Script updated",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update script" },
      { status: 500 }
    );
  }
}

// DELETE a script
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("scripts").deleteOne({
      _id: new ObjectId(id),
      clerkUserId: userId,
    });

    return NextResponse.json({
      message: "Deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
