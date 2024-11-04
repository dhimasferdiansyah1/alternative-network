import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const mojangResponse = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${username}`
    );

    if (!mojangResponse.ok) {
      if (mojangResponse.status === 204 || mojangResponse.status === 404) {
        return NextResponse.json(
          { error: "Minecraft username not found" },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { error: `Mojang API Error: ${mojangResponse.status}` },
          { status: mojangResponse.status }
        );
      }
    }

    const mojangData = await mojangResponse.json();
    return NextResponse.json(mojangData);
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { error: "Failed to check Minecraft username" },
      { status: 500 }
    );
  }
}
