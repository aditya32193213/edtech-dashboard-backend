const axios = require("axios");

const chatWithGemini = async (req, res) => {
  try {
    const { message, context } = req.body;

    const prompt = `
You are a virtual learning assistant for an EdTech platform.

Context:
${context || "No context"}

User question:
${message}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini REST Error:", error.response?.data || error.message);
    return res.status(500).json({
      reply: "Sorry, I’m having trouble answering right now."
    });
  }
};

module.exports = { chatWithGemini };
