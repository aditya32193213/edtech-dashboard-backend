const axios = require("axios");

/**
 * Enhanced AI Chatbot Controller with Context-Aware Responses
 * Integrates with Google Gemini API for intelligent learning assistance
 */

let lastRequestTime = 0;
const COOLDOWN_MS = 2000; // 2 seconds cooldown between requests

const chatWithGemini = async (req, res) => {
  
  const now = Date.now();
  if (now - lastRequestTime < COOLDOWN_MS) {
    return res.status(429).json({
      reply: "Please wait a moment before sending another message 🙏",
      error: "COOLDOWN"
    });
  }
  lastRequestTime = now;

  try {
    const { message, context } = req.body;

    // Validation
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        reply: "Please provide a valid message.",
        error: "INVALID_MESSAGE"
      });
    }

    // Enhanced prompt engineering for better educational responses
    const systemPrompt = `You are an intelligent AI Learning Assistant for an EdTech platform. Your role is to:

1. **Personalized Recommendations**: Analyze user progress and suggest next courses
2. **Learning Guidance**: Provide study tips, learning strategies, and motivation
3. **Course Information**: Answer questions about courses, instructors, and curriculum
4. **Progress Tracking**: Help users understand their learning journey
5. **Platform Navigation**: Guide users through platform features

**Tone & Style:**
- Friendly, encouraging, and professional
- Use emojis sparingly (1-2 per response) for warmth
- Keep responses clear and well-structured, with enough detail to be helpful
- Provide actionable advice
- Be enthusiastic about learning

**Important Guidelines:**
- If user data shows no enrollments, encourage them to explore courses
- For progress-related queries, reference specific course completion percentages
- When recommending courses, consider their current skill level
- Always end with a follow-up question or offer of additional help
- Never make up course names or data not in the context
- When recommending courses, always provide at least one concrete next-step suggestion before ending the response.


**Context Information:**
${context || "No user context available - treat as guest user"}

**User Question:**
${message}

**Response Instructions:**
Provide a helpful, contextually relevant response based on the above information.`;

    // Call Gemini API with enhanced configuration
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
      {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract reply with robust error handling
    const candidates = response.data?.candidates;
    
    if (!candidates || candidates.length === 0) {
      console.warn("No candidates in Gemini response");
      return res.status(200).json({
        reply: "I'm here to help! Could you rephrase your question? 🤔"
      });
    }

    const reply = candidates[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.warn("No text in Gemini response");
      return res.status(200).json({
        reply: "I'm processing your request. Could you try asking in a different way?"
      });
    }

    // Clean up the reply (remove markdown artifacts if any)
    const cleanReply = reply.trim();

    return res.status(200).json({ 
      reply: cleanReply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Gemini API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      code: error.code
    });

    
    // Timeout errors
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        reply: "The request took too long. Please try again with a simpler question. ⏱️",
        error: "TIMEOUT"
      });
    }

    // Rate limit errors (from Gemini)
    if (error.response?.status === 429) {
      return res.status(429).json({
        reply: "I'm getting a lot of questions right now. Please wait a moment and try again. 🙏",
        error: "RATE_LIMIT"
      });
    }

    // Authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error("🔒 API Key Issue - Check GEMINI_API_KEY in .env");
      return res.status(500).json({
        reply: "I'm having trouble connecting right now. Our team has been notified. 🔧",
        error: "AUTH_ERROR"
      });
    }

    // Server errors from Gemini
    if (error.response?.status >= 500) {
      return res.status(503).json({
        reply: "The AI service is temporarily unavailable. Please try again in a moment. 🔄",
        error: "SERVICE_UNAVAILABLE"
      });
    }

    // Generic fallback
    return res.status(500).json({
      reply: "I apologize, but I'm experiencing technical difficulties. Please try again shortly. 💙",
      error: "UNKNOWN_ERROR"
    });
  }
};


module.exports = { 
  chatWithGemini
};