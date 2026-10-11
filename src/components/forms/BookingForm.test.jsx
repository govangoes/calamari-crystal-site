import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("BookingForm", () => {
  beforeEach(() => {
    // Fix "today" so the calendar and the dates picked below are predictable.
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 11, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  async function setupForm() {
    vi.stubEnv("VITE_FORM_ENDPOINT", "https://formspree.io/f/test123");
    // The form asks /api/availability for booked days on load, and posts to the form endpoint on send.
    const fetchMock = vi.fn((url) =>
      Promise.resolve(
        String(url).includes("/api/availability")
          ? { ok: true, json: async () => ({ busyDates: ["2026-10-24"] }) }
          : { ok: true },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { default: BookingForm } = await import("./BookingForm.jsx");
    render(<BookingForm />);
    return fetchMock;
  }

  const formPosts = (fetchMock) =>
    fetchMock.mock.calls.filter(([url]) => String(url).includes("formspree.io"));

  it("walks through the steps and sends the picked date, time and length", async () => {
    const fetchMock = await setupForm();

    // Step 1: service. Continue stays locked until one is chosen.
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /Wedding/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    // Step 2: calendar, time list, length slider. Past days and today are not pickable.
    expect(screen.getByRole("button", { name: "Sunday, October 11, 2026" })).toBeDisabled();
    expect(screen.getByText("Pick a date first, then choose a start time.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Saturday, October 17, 2026" }));
    fireEvent.click(screen.getByRole("button", { name: "7:00 PM" }));
    fireEvent.change(screen.getByLabelText("How long?"), { target: { value: "90" } });
    expect(screen.getByText(/Wraps up around 8:30 PM/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    // Step 3: location is required.
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/City \/ venue/), { target: { value: "Orlando, FL" } });
    fireEvent.click(screen.getByRole("button", { name: "$500–$1,000" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    // Step 4: contact details, then send.
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "ada@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Booking Request" }));

    expect(await screen.findByText("You’re on the list.")).toBeInTheDocument();

    const [[url, options]] = formPosts(fetchMock);
    expect(url).toBe("https://formspree.io/f/test123");
    expect(JSON.parse(options.body)).toMatchObject({
      formType: "booking",
      name: "Ada",
      email: "ada@example.com",
      eventType: "Wedding",
      eventDate: "2026-10-17",
      startTime: "7:00 PM",
      endTime: "8:30 PM",
      setLength: "1 hr 30 min",
      durationMinutes: 90,
      city: "Orlando, FL",
      budgetRange: "$500–$1,000",
    });
  });

  it("does not send anything when the hidden spam field is filled", async () => {
    const fetchMock = await setupForm();

    fireEvent.click(screen.getByRole("button", { name: /Hosting/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Saturday, October 17, 2026" }));
    fireEvent.click(screen.getByRole("button", { name: "8:00 PM" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText(/City \/ venue/), { target: { value: "Orlando" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Bot" } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "bot@example.com" } });
    fireEvent.change(screen.getByLabelText("Leave this empty"), { target: { value: "spam" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Booking Request" }));

    expect(await screen.findByText("You’re on the list.")).toBeInTheDocument();
    expect(formPosts(fetchMock)).toHaveLength(0);
  });

  it("blocks days that are already booked", async () => {
    await setupForm();

    fireEvent.click(screen.getByRole("button", { name: /Wedding/ }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    const booked = await screen.findByRole("button", {
      name: "Saturday, October 24, 2026, already booked",
    });
    expect(booked).toBeDisabled();
    expect(screen.getByText("Crossed-out days are already booked.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Saturday, October 17, 2026" })).toBeEnabled();
  });
});
