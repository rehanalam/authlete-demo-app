import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface CalloutProps {
  organizationId: string;
}

export function WelcomeCallout({ organizationId }: CalloutProps) {
  return (
    <div className="p-6 bg-blue-50 border-l-4 border-blue-400 rounded-md space-y-3">
      <h2 className="text-2xl font-bold text-blue-900">Welcome to Authlete!</h2>
      <p className="text-blue-800 text-lg">
        Your comprehensive OAuth 2.0 and OpenID Connect solution. Get started in minutes with our
        guided onboarding experience.
      </p>
      <Link href={`/organization/${organizationId}/onboarding`}>
        <Button variant="default" size="lg">
          Start Onboarding
        </Button>
      </Link>
    </div>
  );
}
