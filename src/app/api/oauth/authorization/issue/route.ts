import { authlete } from "@/lib/authleteSdkClient";
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

    return NextResponse.json({
      success: true,
      data: responseData,
      fullResponse: result, // For display in response window
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Issue authorization error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid input", errors: error },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to issue authorization",
        details: error,
      },
      { status: error.statusCode || 500 },
    );
  }
}
