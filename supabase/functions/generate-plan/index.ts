import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a senior freelance consultant and product manager. Given a client brief, produce a detailed project plan as JSON.

Rules:
- Be specific and realistic. No generic filler.
- Features should be concrete (e.g. "Stripe checkout with Apple Pay support" not "payment integration").
- Timeline should include reasoning.
- Pricing should reflect real freelance market rates ($80-150/hr).
- Tasks should be actionable work items with time estimates.

Respond with ONLY valid JSON in this exact structure:
{
  "title": "Short project title",
  "scope": "2-3 sentence project overview describing what will be built and key deliverables",
  "timeline": "X–Y weeks",
  "priceRange": "$X,XXX – $XX,XXX",
  "pricingJustification": "1-2 sentences explaining the pricing logic",
  "tasks": ["Task 1 with time estimate", "Task 2 with time estimate", ...],
  "clientSummary": "A professional 4-5 paragraph proposal suitable to send directly to a client. Address them as 'Hi [Client],' and sign off as the developer."
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { brief } = await req.json();

    if (!brief || typeof brief !== "string" || brief.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Brief must be at least 10 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("AI service is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Client brief: "${brief}"` },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse JSON from response (handle markdown code blocks)
    let plan;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      plan = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response");
    }

    // Validate required fields
    const required = ["title", "scope", "timeline", "priceRange", "tasks", "clientSummary"];
    for (const field of required) {
      if (!plan[field]) {
        throw new Error(`Missing field: ${field}`);
      }
    }

    return new Response(JSON.stringify(plan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-plan error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Something went wrong" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
