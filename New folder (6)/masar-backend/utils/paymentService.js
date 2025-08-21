const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async ({ amount, method, orderId }) => {
  try {
    // Mock payment processing for different methods
    switch (method) {
      case 'visa':
        // Stripe payment processing
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, // Convert to cents
          currency: 'sar',
          metadata: { orderId: orderId.toString() }
        });
        
        return {
          success: true,
          transactionId: paymentIntent.id
        };

      case 'apple':
        // Apple Pay simulation
        return {
          success: Math.random() > 0.1, // 90% success rate
          transactionId: `apple_${Date.now()}`
        };

      case 'stc':
        // STC Pay simulation
        return {
          success: Math.random() > 0.05, // 95% success rate
          transactionId: `stc_${Date.now()}`
        };

      case 'bank':
        // Bank transfer - always pending
        return {
          success: true,
          transactionId: `bank_${Date.now()}`,
          status: 'pending'
        };

      default:
        throw new Error('طريقة دفع غير مدعومة');
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const refundPayment = async (transactionId, amount) => {
  try {
    if (transactionId.startsWith('pi_')) {
      // Stripe refund
      const refund = await stripe.refunds.create({
        payment_intent: transactionId,
        amount: amount * 100
      });
      
      return {
        success: true,
        refundId: refund.id
      };
    }
    
    // Mock refund for other methods
    return {
      success: true,
      refundId: `refund_${Date.now()}`
    };
  } catch (error) {
    console.error('Refund processing error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  processPayment,
  refundPayment
};