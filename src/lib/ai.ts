import { createServerFn } from "@tanstack/react-start";

export const generateBriefing = createServerFn({ method: "POST" })
  .validator((input: { summary: string; lang?: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI is not available" };
    const tamil = data.lang === "ta";
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 420,
        messages: [
          {
            role: "system",
            content: tamil
              ? "நீங்கள் ஒரு தமிழ்நாடு தொகுதி புகார் மேசையின் செயல்பாட்டு ஆய்வாளர். பயனர் செய்தியில் தொகுதி பெயர் இருக்கும். எம்.எல்.ஏ மேசைக்கு 4 குறுகிய புள்ளி நுண்ணறிவுகளும் 1 பரிந்துரைக்கப்பட்ட நடவடிக்கையும் தமிழில் எழுதுங்கள். தலைப்புகள் வேண்டாம்."
              : "You are a concise operations analyst for a Tamil Nadu constituency complaint desk. The user message names the constituency. Write 4 short bullet insights and 1 recommended action for the MLA desk. No markdown headings. No fluff.",
          },
          { role: "user", content: data.summary },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI API error ${res.status}` };
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
