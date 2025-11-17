import { ACTION_STATUS_MAP, authlete } from "@/lib/authleteSdkClient";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const introspectTokenSchema = z.object({
  serviceId: z.string(),
  token: z.string(),
  scopes: z.array(z.string()).optional(),
  subject: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = introspectTokenSchema.parse(body);

    const result = await authlete.introspection.process({
      serviceId: data.serviceId,
      introspectionRequest: {
        token: data.token,
        scopes: data.scopes,
        subject: data.subject,
      },
    });

    const responseData = {
      action: result.action,
      existent: result.existent,
      usable: result.usable,
      sufficient: result.sufficient,
      refreshable: result.refreshable,
      responseContent: result.responseContent,
      expiresAt: result.expiresAt,
    };

    if (result.action && ACTION_STATUS_MAP[result.action]) {
      return NextResponse.json(
        {
          success: false,
          code: result.resultCode,
          message: result.resultMessage,
          action: result.action,
          fullResponse: result,
        },
        { status: ACTION_STATUS_MAP[result.action] },
      );
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      fullResponse: result, // For display in response window
    });
  } catch (error: unknown) {
    console.error("Create token error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid input", errors: error },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      NextResponse.json(
        {
          success: false,
          message: error.message || "Failed to introspec",
        },
        { status: 500 },
      );
    }

    return String(error);
  }
}
