// const Stripe = require("stripe");
// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is missing in .env");
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const { courseId, title, price } = req.body;

//     // Basic validation
//     if (!courseId || !title || !price) {
//       return res.status(400).json({
//         message: "Missing required payment data",
//       });
//     }

//     // Create Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],

//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: title,
//             },
//             unit_amount: price * 100, // Stripe works in paise
//           },
//           quantity: 1,
//         },
//       ],

//       mode: "payment",

//       success_url: `${process.env.FRONTEND_URL}/payment-success?courseId=${courseId}`,
//       cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,

//       metadata: {
//         courseId,
//       },
//     });

//     res.status(200).json({
//       sessionId: session.id,
//     });
//   } catch (error) {
//     console.error("Stripe error:", error.message);
//     res.status(500).json({
//       message: "Failed to create checkout session",
//     });
//   }
// };

const Stripe = require("stripe");

exports.createCheckoutSession = async (req, res) => {
  try {
    // 🔐 Check env INSIDE the request (safe)
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        message: "Stripe secret key not configured on server",
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { courseId, title, price } = req.body;

    // Basic validation
    if (!courseId || !title || !price) {
      return res.status(400).json({
        message: "Missing required payment data",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: title,
            },
            unit_amount: price * 100, // paise
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.FRONTEND_URL}/payment-success?courseId=${courseId}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,

      metadata: {
        courseId,
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({
      message: "Failed to create checkout session",
    });
  }
};
