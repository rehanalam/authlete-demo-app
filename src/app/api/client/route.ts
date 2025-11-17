import { handleApiError } from "@/lib/apiClient";
import { authlete } from "@/lib/authleteSdkClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const createClientSchema = z.object({
  clientName: z.string().min(1).max(100),
  description: z.string().max(200).optional(),
  clientType: z.enum(["PUBLIC", "CONFIDENTIAL"]),
  applicationType: z.enum(["WEB", "NATIVE"]).optional(),
  redirectUris: z.array(z.string().url()).optional(),
  serviceId: z.string(),
});

const generateClientAlias = (clientName: string) => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${clientName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${timestamp}-${randomSuffix}`;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createClientSchema.parse(body);

    const clientAlias = generateClientAlias(data.clientName);

    const clientInput = {
      clientName: data.clientName,
      ...(data.description && { description: data.description }),
      clientType: data.clientType,
      applicationType: data.applicationType || "WEB",
      redirectUris: data.redirectUris || [],
      grantTypes:
        data.clientType === "CONFIDENTIAL"
          ? ["AUTHORIZATION_CODE", "REFRESH_TOKEN", "CLIENT_CREDENTIALS"]
          : ["AUTHORIZATION_CODE", "REFRESH_TOKEN"],
      clientIdAlias: clientAlias,
      clientIdAliasEnabled: true,
      responseTypes: ["CODE", "TOKEN"],
      tokenAuthMethod: "NONE",
    };

    const client = await authlete.client.create({
      serviceId: data.serviceId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      client: clientInput as any,
    });

    // const client = { clientId: 1884468236 };

    return NextResponse.json({
      success: true,
      client,
    });
  } catch (error: unknown) {
    return handleApiError(error, "Failed to create client");
  }
}
