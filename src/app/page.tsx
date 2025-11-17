import { getAllOrganizations } from "@/lib/organization";
import OrganizationCard from "@/components/organization/organization-card";
import { Title } from "@/components/ui/title";
import { Text } from "@/components/ui/text";

export default function Home() {
  const organizations = getAllOrganizations();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-12 text-center">
          <Title level={1} variant="lg" className="mb-4">
            Organizations
          </Title>
          <Text variant="md" color="text-zinc-600 dark:text-zinc-400">
            Select an organization to view its dashboard and manage services
          </Text>
        </div>

        {organizations.length === 0 ? (
          <div className="text-center py-12">
            <Text variant="md" color="text-zinc-500">
              No organizations available
            </Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <OrganizationCard key={org.id} organization={org} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
