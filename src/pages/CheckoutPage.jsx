import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperComponent from '../components/ui/StepperComponent';
import CartReviewStep from '../components/checkout/CartReviewStep';
import ShippingDetailsStep from '../components/checkout/ShippingDetailsStep';
import PaymentStep from '../components/checkout/PaymentStep';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    cart: [], // This should be populated from your cart context/state
    shipping: null,
    payment: null
  });

  // Example cart data - replace with your actual cart data
  const sampleCart = [
    {
      id: 1,
      name: 'Digital Thermometer',
      price: 29.99,
      quantity: 1,
      image: 'https://placehold.co/300x300?text=Thermometer'
    },
    {
      id: 2,
      name: 'Blood Pressure Monitor',
      price: 169.99,
      quantity: 1,
      image: 'https://placehold.co/300x300?text=BP+Monitor'
    }
  ];

  const handleCartNext = () => {
    setCurrentStep(2);
  };

  const handleShippingBack = () => {
    setCurrentStep(1);
  };

  const handleShippingNext = (shippingData) => {
    setOrderData(prev => ({
      ...prev,
      shipping: shippingData
    }));
    setCurrentStep(3);
  };

  const handlePaymentBack = () => {
    setCurrentStep(2);
  };

  const handleOrderComplete = async (paymentData) => {
    setOrderData(prev => ({
      ...prev,
      payment: paymentData
    }));

    try {
      // Here you would typically:
      // 1. Send the order to your backend
      // 2. Process payment if needed
      // 3. Clear the cart
      // 4. Navigate to success page

      // For now, we'll just log the data and navigate
      console.log('Order completed:', {
        ...orderData,
        payment: paymentData
      });

      // Navigate to success page or order confirmation
      navigate('/order-success');
    } catch (error) {
      console.error('Error completing order:', error);
      // Handle error appropriately
    }
  };

  // Calculate order summary
  const calculateOrderSummary = () => {
    const subtotal = sampleCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10; // Example fixed shipping cost
    return {
      subtotal,
      shipping,
      total: subtotal + shipping
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Stepper */}
        <div className="mb-8">
          <StepperComponent currentStep={currentStep} />
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <CartReviewStep
            cart={sampleCart}
            onNext={handleCartNext}
          />
        )}

        {currentStep === 2 && (
          <ShippingDetailsStep
            onNext={handleShippingNext}
            onBack={handleShippingBack}
          />
        )}

        {currentStep === 3 && (
          <PaymentStep
            onBack={handlePaymentBack}
            onComplete={handleOrderComplete}
            orderSummary={calculateOrderSummary()}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;