import { handleApiError } from "@/lib/apiClient";
import { ACTION_STATUS_MAP, authlete } from "@/lib/authleteSdkClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const processAuthorizationSchema = z.object({
  serviceId: z.string(),
  clientIdAlias: z.string(),
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
      client_id: data.clientIdAlias,
      redirect_uri: data.redirectUri,
      response_type: data.responseType,
      ...(data.scope && { scope: data.scope }),
      ...(data.codeChallenge && { code_challenge: data.codeChallenge }),
      ...(data.codeChallengeMethod && { code_challenge_method: data.codeChallengeMethod }),
    }).toString();

    const result = await authlete.authorization.processRequest({
      serviceId: data.serviceId,
      authorizationRequest: {
        parameters,
      },
    });

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
  } catch (error: unknown) {
    return handleApiError(error, "Failed to process auth");
  }
}
