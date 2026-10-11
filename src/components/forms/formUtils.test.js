import { afterEach, describe, expect, it, vi } from "vitest";

const input = {
  formType: "booking",
  toEmail: "bookings@govangoes.com",
  subject: "Booking Inquiry",
  fields: { name: "Ada", email: "ada@example.com", message: "Hello" },
  formattedBody: "Booking inquiry",
};

describe("submitFormWithFallback", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("posts flat JSON with an Accept header when an endpoint is configured", async () => {
    vi.stubEnv("VITE_FORM_ENDPOINT", "https://formspree.io/f/test123");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const { submitFormWithFallback } = await import("./formUtils.js");
    const result = await submitFormWithFallback(input);

    expect(result.via).toBe("endpoint");
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/test123");
    expect(options.headers.Accept).toBe("application/json");
    expect(JSON.parse(options.body)).toMatchObject({
      _subject: "Booking Inquiry",
      formType: "booking",
      name: "Ada",
      email: "ada@example.com",
    });
  });
});
