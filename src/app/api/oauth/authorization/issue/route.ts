import { ACTION_STATUS_MAP, authlete } from "@/lib/authleteSdkClient";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const issueAuthorizationSchema = z.object({
  serviceId: z.string(),
  ticket: z.string(),
  subject: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = issueAuthorizationSchema.parse(body);

    const result = await authlete.authorization.issue({
      serviceId: data.serviceId,
      authorizationIssueRequest: {
        ticket: data.ticket,
        subject: data.subject,
      },
    });

    const responseData = {
      authorizationCode: result.authorizationCode,
      action: result.action,
      responseContent: result.responseContent,
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
    console.error("Issue authorization error:", error);

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
          message: error.message || "Failed to issue authorization",
        },
        { status: 500 },
      );
    }

    return String(error);
  }
}
