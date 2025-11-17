import axios from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function handleApiError(error: unknown, fallbackMessage = "Something went wrong") {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid input",
        errors: error.flatten(), // cleaner output
      },
      { status: 400 },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || fallbackMessage,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: fallbackMessage,
      detail: String(error),
    },
    { status: 500 },
  );
}
