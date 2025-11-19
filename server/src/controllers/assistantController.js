const Contact = require('../models/Contact');
const { AppError } = require('../utils/errorHandler');
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Strict schema to guarantee JSON
function buildPrompt(query) {
    return `
You are an AI assistant inside a CRM. You MUST extract structured data.

You MUST return ONLY valid JSON with EXACTLY this structure:

{
  "intent": "create_or_update" | "query",
  "contacts": [
    {
      "name": string | null,
      "email": string | null,
      "activities": [
        {
          "type": "call" | "email" | "meeting" | "note",
          "notes": string,
          "timestamp": string | null
        }
      ] | null
    }
  ],
  "ask_for_clarification": string | null
}

STRICT RULES:
- Output ONLY JSON. No text outside JSON.
- For any interaction mentioned ("met", "meeting", "spoke", "called", "emailed", "discussion", "follow up"):
    → YOU MUST return an activity object inside each contact.
- Map activity.type as before.
- If notes are missing, generate a short 1–2 line summary.
- If an email or name is missing, leave it null.
- If intent unclear → set "ask_for_clarification".

Now extract JSON for: "${query}"
Return ONLY JSON.
`;
}


class AssistantController {
    static async handle(req, res, next) {
        try {
            const query = req.body.query;
            if (!query) throw new AppError("Query is required", 400);

            // Build the prompt
            const prompt = buildPrompt(query);

            // Call LLM with strict output
            const aiRes = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a CRM AI assistant." },
                    { role: "user", content: prompt }
                ],
                temperature: 0
            });

            let text = aiRes.choices[0].message.content.trim();

            // Parse JSON safely
            let parsed;
            try {
                parsed = JSON.parse(text);
            } catch (err) {
                const match = text.match(/\{[\s\S]*\}/);
                if (!match) {
                    throw new AppError("AI returned invalid JSON", 500);
                }
                parsed = JSON.parse(match[0]);
            }

            // Handle clarifications
            if (parsed.ask_for_clarification) {
                return res.json({
                    need_clarification: parsed.ask_for_clarification
                });
            }

            // CREATE OR UPDATE CONTACT
            if (parsed.intent === "create_or_update") {
                const contactsData = parsed.contacts || [];

                const savedContacts = [];

                for (const c of contactsData) {
                    const email = c.email || null;
                    const name = c.name || null;
                    const activities = c.activities || [];

                    let contact = null;

                    // Match by email first
                    if (email) contact = await Contact.findOne({ email });

                    // Match by name if no contact yet
                    if (!contact && name) {
                        contact = await Contact.findOne({
                            name: new RegExp("^" + name + "$", "i")
                        });
                    }

                    // Create new if not found
                    if (!contact) {
                        contact = new Contact({
                            name: name || undefined,
                            email: email || undefined,
                            owner: req.user ? req.user.id : undefined
                        });
                    } else {
                        // Update missing info
                        if (!contact.email && email) contact.email = email;
                        if (!contact.name && name) contact.name = name;
                    }

                    // Add all activities
                    for (const act of activities) {
                        contact.activities.push({
                            type: act.type,
                            notes: act.notes || query,
                            timestamp: act.timestamp || new Date()
                        });
                    }

                    await contact.save();
                    savedContacts.push(contact);
                }

                return res.json({ message: "Contacts saved or updated", contacts: savedContacts });
            }


            // QUERY CONTACT
            if (parsed.intent === "query") {
                const searchTerm = parsed.name || parsed.email || query;
                const results = await Contact.search(
                    searchTerm,
                    req.user ? req.user.id : undefined
                );
                return res.json({ results });
            }

            return res.json({ raw: parsed });

        } catch (err) {
            next(err);
        }
    }
}

module.exports = AssistantController;
