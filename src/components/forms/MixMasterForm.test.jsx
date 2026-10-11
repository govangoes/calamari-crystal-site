import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("MixMasterForm", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  async function setupForm() {
    vi.stubEnv("VITE_FORM_ENDPOINT", "https://formspree.io/f/test123");
    const fetchMock = vi.fn(() => Promise.resolve({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    const { default: MixMasterForm } = await import("./MixMasterForm.jsx");
    render(<MixMasterForm fileUploadUrl="https://drive.example.com/upload" />);
    return fetchMock;
  }

  function goToLastStep() {
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  }

  it("walks through the steps and sends the package, add-ons and details", async () => {
    const fetchMock = await setupForm();

    // Step 1: package. Pro is preselected and priced like the Services page.
    expect(screen.getByRole("button", { name: /Pro/ })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: /Deluxe/ }));
    fireEvent.click(screen.getByRole("button", { name: /Stems export/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    // Step 2: the song.
    fireEvent.change(screen.getByLabelText(/Song or project name/), {
      target: { value: "Unknown Hacker" },
    });
    fireEvent.click(screen.getByRole("button", { name: "2–3 days" }));
    fireEvent.change(screen.getByLabelText(/Reference track link/), {
      target: { value: "example.com/ref" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    // Step 3: files.
    expect(screen.getByRole("link", { name: "Open upload folder" })).toHaveAttribute(
      "href",
      "https://drive.example.com/upload",
    );
    fireEvent.click(screen.getByLabelText(/Files are ready/));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    // Step 4: contact details are required, then send.
    expect(screen.getByRole("button", { name: "Send Mix / Master Intake" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "ada@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Mix / Master Intake" }));

    expect(await screen.findByText("Intake received.")).toBeInTheDocument();

    const [[url, options]] = fetchMock.mock.calls;
    expect(url).toBe("https://formspree.io/f/test123");
    expect(JSON.parse(options.body)).toMatchObject({
      formType: "mixmaster",
      name: "Ada",
      email: "ada@example.com",
      tier: "Deluxe",
      tierPrice: "$199",
      addOns: "Stems export",
      songTitle: "Unknown Hacker",
      desiredTurnaround: "2–3 days",
      referenceLink: "https://example.com/ref",
      filesReady: "Yes",
    });
  });

  it("does not send without a name and email, or when the spam field is filled", async () => {
    const fetchMock = await setupForm();
    goToLastStep();

    fireEvent.click(screen.getByRole("button", { name: "Send Mix / Master Intake" }));
    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Bot" } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "bot@example.com" } });
    fireEvent.change(screen.getByLabelText("Leave this empty"), { target: { value: "spam" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Mix / Master Intake" }));

    expect(await screen.findByText("Intake received.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
