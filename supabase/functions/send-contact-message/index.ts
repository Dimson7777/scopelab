import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

/**
 * send-contact-message
 *
 * Receives a contact-form submission and "delivers" it to the project owner.
 *
 * For now this is a simulated send: we validate the payload, log the message
 * (visible in Edge Function logs), and return success. When a verified email
 * domain is configured, swap the `simulateSend` block for a real provider call.
 */

const RECIPIENT = "dimibukejlovic@icloud.com";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.trim().length <= max;
}

function isValidEmail(v: unknown): v is string {
  if (typeof v !== "string") return false;
  const trimmed = v.trim();
  return trimmed.length <= 255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Manual validation — keeping deps minimal.
  const errors: Record<string, string> = {};
  if (!isNonEmptyString(payload.name, 100)) {
    errors.name = "Name is required (max 100 characters).";
  }
  if (!isValidEmail(payload.email)) {
    errors.email = "A valid email is required.";
  }
  if (!isNonEmptyString(payload.message, 2000)) {
    errors.message = "Message is required (max 2000 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ error: "Validation failed", fields: errors }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const name = (payload.name as string).trim();
  const email = (payload.email as string).trim();
  const message = (payload.message as string).trim();

  try {
    // ── Simulated send ────────────────────────────────────────────────
    // Logged to the Edge Function logs so the owner can read submissions
    // until a verified email domain is set up.
    console.log("📩 New contact message", {
      to: RECIPIENT,
      from: { name, email },
      message,
      receivedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ success: true, recipient: RECIPIENT }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Failed to deliver contact message", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});