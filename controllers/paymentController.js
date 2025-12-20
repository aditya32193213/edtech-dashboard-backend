const Stripe = require("stripe");

exports.createCheckoutSession = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        message: "Stripe secret key missing",
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { courseId, title, price } = req.body;

    if (!courseId || !title || !price) {
      return res.status(400).json({
        message: "Missing payment data",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: title },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?courseId=${courseId}`,
      cancel_url: `${process.env.CLIENT_URL}/courses`,
    });

    res.status(200).json({ sessionUrl: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({
      message: "Failed to create checkout session",
    });
  }
};
