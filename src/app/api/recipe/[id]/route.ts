import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log(`Building recipe: ${id}`);
  } catch (error: unknown) {
    return error instanceof Error
      ? NextResponse.json(
          {
            success: false,
            message: error.message || "Failed to GET recipe",
          },
          { status: 500 },
        )
      : String(error);
  }
}
