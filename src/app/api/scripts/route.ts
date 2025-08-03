import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, type } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db();
    const scripts = db.collection("scripts");

    const result = await scripts.insertOne({
      clerkUserId: userId,
      title,
      content,
      type,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: "Script saved!",
      id: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save script" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);

  console.log(searchParams);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("limit") || "10");
  const type = searchParams.get("type") || "";
  const skip = (page - 1) * pageSize;

  try {
    const client = await clientPromise;
    const db = client.db();
    const scripts = db.collection("scripts");

    // Build query
    const query: any = { clerkUserId: userId };

    if (type) {
      query.type = type;
    }

    // Get total count for pagination
    const total = await scripts.countDocuments(query);

    // Get paginated results
    const userScripts = await scripts
      .find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return NextResponse.json({
      scripts: userScripts,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
        hasMore: skip + pageSize < total,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch scripts" },
      { status: 500 }
    );
  }
}
