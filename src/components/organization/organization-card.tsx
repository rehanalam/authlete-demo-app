"use client";

import Link from "next/link";
import { Organization } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface OrganizationCardProps {
  organization: Organization;
}

export default function OrganizationCard({ organization }: OrganizationCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg">{organization.name}</CardTitle>
              <CardDescription className="mt-1">ID: {organization.id}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">
          {organization.description || "No description available"}
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">API Server ID:</span>
            <span className="font-medium">{organization.apiServerId}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/organization/${organization.id}`} className="w-full">
          <Button className="w-full" variant="default">
            View Organization
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
