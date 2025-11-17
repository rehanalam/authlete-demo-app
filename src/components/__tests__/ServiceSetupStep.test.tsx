import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ServiceSetupStep from "../onboarding/service-setup";

vi.mock("@/hooks/userService", () => ({
  useCreateService: () => ({
    mutateAsync: vi.fn().mockResolvedValue({
      success: true,
      service: { apiKey: "123456" },
    }),
    isPending: false,
    isError: false,
    error: null,
  }),
}));

vi.mock("@/stores/oboarding-store", () => ({
  useOnboardingStore: () => ({
    setService: vi.fn(),
  }),
}));

// Mock API_CLUSTERS
vi.mock("@/types", () => ({
  API_CLUSTERS: [
    { value: "US", label: "United States", flag: "🇺🇸" },
    { value: "EU", label: "Europe", flag: "🇪🇺" },
  ],
}));

const renderComponent = () => {
  const props = {
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  render(<ServiceSetupStep organizationId="org123" {...props} />);

  return props;
};

describe("ServiceSetupStep", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly", () => {
    renderComponent();

    expect(screen.getByText("Service Setup")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Sample Service")).toBeInTheDocument();
    expect(screen.getByText("United States")).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", async () => {
    const { onBack } = renderComponent();
    const buttons = screen.getAllByRole("button", { name: "Back" });
    const backButton = buttons[buttons.length - 1];
    await userEvent.click(backButton);
    expect(onBack).toHaveBeenCalled();
  });

  it("submits form and calls onNext on successful submission", async () => {
    const { onNext } = renderComponent();

    const serviceInputs = screen.getAllByPlaceholderText("Sample Service");
    const serviceInput = serviceInputs[serviceInputs.length - 1];
    await userEvent.clear(serviceInput);
    await userEvent.type(serviceInput, "My Test Service");

    const continueButtons = screen.getAllByRole("button", { name: "Continue" });
    const continueButton = continueButtons[continueButtons.length - 1];
    await userEvent.click(continueButton);

    // wait for async form submission
    await waitFor(() => expect(onNext).toHaveBeenCalled());
  });

  it("shows validation error if service name is empty", async () => {
    renderComponent();

    const continueButtons = screen.getAllByRole("button", { name: "Continue" });
    const continueButton = continueButtons[continueButtons.length - 1];
    await userEvent.click(continueButton);

    const errorMessages = await screen.findAllByText("Service name is required");
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
