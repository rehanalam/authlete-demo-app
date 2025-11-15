import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
  } catch (error: unknown) {
    return error instanceof Error
      ? NextResponse.json(
          {
            success: false,
            message: error.message || "Failed to create service",
          },
          { status: 500 },
        )
      : String(error);
  }
}
