import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

interface OnboardingPageProps {
  params: { organizationId: string };
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
  const { organizationId } = await params;

  return (
    <div>
      {organizationId}
      <OnboardingWizard organizationId={organizationId} />
    </div>
  );
}
