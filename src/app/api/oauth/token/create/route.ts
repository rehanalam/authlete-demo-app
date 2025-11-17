import { handleApiError } from "@/lib/apiClient";
import { ACTION_STATUS_MAP, authlete } from "@/lib/authleteSdkClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const createTokenSchema = z.object({
  serviceId: z.string(),
  authorizationCode: z.string(),
  clientIdAlias: z.string(),
  // clientSecret: z.string(),
  redirectUri: z.string().url(),
  codeVerifier: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createTokenSchema.parse(body);

    const parameters = new URLSearchParams({
      grant_type: "authorization_code",
      code: data.authorizationCode,
      redirect_uri: data.redirectUri,

      ...(data.codeVerifier && { code_verifier: data.codeVerifier }),
    }).toString();

    const result = await authlete.token.process({
      serviceId: data.serviceId,
      tokenRequest: {
        parameters: parameters,
        clientId: data.clientIdAlias,
        // clientSecret: data.clientSecret,
      },
    });

    const responseData = {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      scopes: result.scopes,
      subject: result.subject,
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
    return handleApiError(error, "Failed to create token");
  }
}
