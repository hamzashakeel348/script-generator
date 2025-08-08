import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const {
    type,
    industry,
    platform,
    duration,
    productName,
    benefits,
    audience,
    cta,
  } = await req.json();

  // const prompt = `
  // You are a top-tier UGC creator and influencer, known for making authentic, relatable Reels that don't feel like ads.

  // Your task is to write the **spoken monologue** for a ${platform} Reel based on the product details below. The output should be a single block of text, exactly as you would say it on camera to your followers.

  // Follow this proven structure:

  // 1.  **The Hook:** Start with a relatable question, a "secret," a common frustration, or a bold statement to grab attention immediately (e.g., "Okay, be honest...", "I'm going to let you in on a secret...", "Do you ever...?").
  // 2.  **The Problem:** Describe a common, relatable problem that the ${audience} experiences. Make them nod along.
  // 3.  **The Solution:** Casually introduce "${productName}" as the solution you've found. Weave in the benefits (${benefits}) naturally, as if you're just sharing a personal discovery.
  // 4.  **The CTA:** End with a soft, natural call to action. Use the provided CTA: "${cta}".

  // **Crucial Guidelines:**
  // - **Tone:** Write in the first person ("I", "me"). Use natural, casual language. Imagine you're talking to a friend.
  // - **Format:** The output must be **only the spoken text**.
  // - **DO NOT** include visual cues like "[Visual: ...]", scene numbers, or labels like "Narrator:". Just provide the text of the monologue.

  // Here are the details:

  // - Type: ${type}
  // - Industry: ${industry}
  // - Platform: ${platform}
  // - Duration: ${duration}
  // - Product Name: ${productName}
  // - Benefits: ${benefits}
  // - Audience: ${audience}
  // - CTA: ${cta}

  // Now, write the monologue.
  // `;

  const prompt = `
You are a top-tier UGC creator and influencer, known for making authentic, relatable Reels that don't feel like ads.

Your task is to generate content for a ${platform} Reel based on the product details below.

Follow this proven structure for the monologue:
1.  **The Hook:** Start with a relatable question, a "secret," or a common frustration.
2.  **The Problem:** Describe a common problem the ${audience} experiences.
3.  **The Solution:** Casually introduce "${productName}" and weave in the benefits (${benefits}).
4.  **The CTA:** End with the soft call to action: "${cta}".

**Output Format:**
Your final response MUST be a valid JSON object. Do not write any text or explanations outside of the JSON object.

The JSON object must have exactly two string keys:
1.  "title": A short, catchy, hook-based title for the Reel (5-10 words).
2.  "monologue": The full spoken monologue text, following all the creative guidelines above.

Here's an example of the required format:
{
  "title": "The kitchen hack I can't live without anymore.",
  "monologue": "Okay, so I'm going to let you in on a secret, used tea towels are the thing right now and I know it sounds crazy, but hear me out..."
}

**Product Details:**
- Type: ${type}
- Industry: ${industry}
- Platform: ${platform}
- Duration: ${duration}
- Product Name: ${productName}
- Benefits: ${benefits}
- Audience: ${audience}
- CTA: ${cta}

Now, generate the JSON object.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a skilled Instagram scriptwriter who writes visually structured Reels scripts for DTC brands.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Received empty response from OpenAI.");
    }

    // Parse the JSON string from the AI's response
    const parsedScript = JSON.parse(responseContent);

    // Return the parsed object to the client
    return NextResponse.json(parsedScript);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate script" },
      { status: 500 }
    );
  }
}
