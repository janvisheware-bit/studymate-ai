export default async (req) => {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ error: "Only POST requests are allowed." }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    try {
        const { question, subject } = await req.json();

        if (!question || question.trim() === "") {
            return new Response(
                JSON.stringify({ error: "Please enter a question." }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-5.6-luna",
                    input: [
                        {
                            role: "system",
                            content:
                                "You are StudyMate AI, a friendly AI study assistant. Explain concepts clearly and simply for students. Give helpful, accurate, easy-to-understand answers."
                        },
                        {
                            role: "user",
                            content:
                                `Subject: ${subject || "General"}\n\nQuestion: ${question}`
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error: data.error?.message || "OpenAI request failed."
                }),
                {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                answer: data.output_text || "I couldn't generate an answer."
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Something went wrong. Please try again."
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};
