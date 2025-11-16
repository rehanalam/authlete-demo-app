import { authlete } from "@/lib/authleteSdkClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const processAuthorizationSchema = z.object({
  serviceId: z.string(),
  clientId: z.string(),
  redirectUri: z.string().url(),
  responseType: z.string(),
  scope: z.string().optional(),
  codeChallenge: z.string().optional(),
  codeChallengeMethod: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = processAuthorizationSchema.parse(body);

    const parameters = new URLSearchParams({
      client_id: data.clientId,
      redirect_uri: data.redirectUri,
      response_type: data.responseType,
      ...(data.scope && { scope: data.scope }),
      ...(data.codeChallenge && { code_challenge: data.scope }),
      ...(data.codeChallengeMethod && { code_challenge_method: data.scope }),
    }).toString();

    const result = await authlete.authorization.processRequest({
      serviceId: data.serviceId,
      authorizationRequest: {
        parameters,
      },
    });

    // Extract only necessary data for next step
    const responseData = {
      ticket: result.ticket,
      action: result.action,
      resultCode: result.resultCode,
      resultMessage: result.resultMessage,
      client: result.client,
      scopes: result.scopes,
      service: result.service,
    };

    return NextResponse.json({
      success: true,
      data: responseData,
      fullResponse: result, // For display in response window
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Process authorization error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid input", errors: error },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process authorization request",
        details: error,
      },
      { status: error.statusCode || 500 },
    );
  }
}
