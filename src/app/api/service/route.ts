import { handleApiError } from "@/lib/apiClient";
import { authlete } from "@/lib/authleteSdkClient";
import { getAccessToken, getDefaultOrganization } from "@/lib/organization";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const createServiceSchema = z.object({
  serviceName: z.string().min(1).max(100),
  description: z.string().max(200).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = createServiceSchema.parse(body);

    const org = getDefaultOrganization();
    const bearerToken = getAccessToken();

    if (!bearerToken) {
      return NextResponse.json(
        { success: false, message: "AUTHLETE_BEARER token not configured" },
        { status: 500 },
      );
    }

    const requestBody = {
      apiServerId: org.apiServerId,
      organizationId: parseInt(org.id),
      service: {
        serviceName: data.serviceName,
        ...(data.description && { description: data.description }),
      },
    };

    // const response = await fetch("https://login.authlete.com/api/service", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${bearerToken}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    // const responseData = await response.json();

    // if (!response.ok) {
    //   console.error("Authlete API error:", responseData);
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: responseData.message || "Failed to create service",
    //       details: responseData,
    //     },
    //     { status: response.status },
    //   );
    // }

    const responseData = { apiKey: 4252493258 };
    return NextResponse.json({
      success: true,
      service: responseData,
    });
  } catch (error: unknown) {
    return handleApiError(error, "Failed to create service");
  }
}
