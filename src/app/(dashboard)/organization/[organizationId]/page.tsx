import { WelcomeCallout } from "@/components/dashboard/callout";
interface PageProps {
  params: { organizationId: string };
}

export default async function OrganizationPage({ params }: PageProps) {
  const { organizationId } = await params;

  return (
    <div className=" w-full flex flex-col items-center mt-12">
      <div className="max-w-3/4 flex items-center justify-between mx-auto ">
        <WelcomeCallout organizationId={organizationId} />
      </div>
    </div>
  );
}
