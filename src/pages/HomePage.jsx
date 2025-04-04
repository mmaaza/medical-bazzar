import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Medical supplies product data
  const featuredProducts = [
    { id: 1, name: 'Digital Thermometer', price: 29.99, image: 'https://via.placeholder.com/300x300?text=Thermometer', rating: 4.5, reviews: 128, discount: 20 },
    { id: 2, name: 'Blood Pressure Monitor', price: 89.99, image: 'https://via.placeholder.com/300x300?text=BP+Monitor', rating: 4.8, reviews: 356, discount: 0 },
    { id: 3, name: 'Pulse Oximeter', price: 49.99, image: 'https://via.placeholder.com/300x300?text=Oximeter', rating: 4.7, reviews: 245, discount: 15 },
    { id: 4, name: 'Glucose Monitor Kit', price: 79.99, image: 'https://via.placeholder.com/300x300?text=Glucose+Monitor', rating: 4.3, reviews: 187, discount: 10 },
  ];

  const newArrivals = [
    { id: 5, name: 'N95 Respirator Masks (10pk)', price: 24.99, image: 'https://via.placeholder.com/300x300?text=N95+Masks', rating: 4.1, reviews: 64, discount: 0 },
    { id: 6, name: 'Infrared Forehead Thermometer', price: 59.99, image: 'https://via.placeholder.com/300x300?text=IR+Thermometer', rating: 4.6, reviews: 132, discount: 0 },
    { id: 7, name: 'Medical Stethoscope', price: 39.99, image: 'https://via.placeholder.com/300x300?text=Stethoscope', rating: 4.4, reviews: 98, discount: 0 },
    { id: 8, name: 'First Aid Kit (Comprehensive)', price: 45.99, image: 'https://via.placeholder.com/300x300?text=First+Aid+Kit', rating: 4.2, reviews: 112, discount: 0 },
  ];

  // Medical categories
  const trendingCategories = [
    { id: 1, name: 'Diagnostic Devices', image: 'https://via.placeholder.com/400x300?text=Diagnostic+Devices', count: 42 },
    { id: 2, name: 'Personal Protection', image: 'https://via.placeholder.com/400x300?text=PPE', count: 38 },
    { id: 3, name: 'Home Care', image: 'https://via.placeholder.com/400x300?text=Home+Care', count: 56 },
  ];

  // Medical flash deals
  const flashDeals = [
    { id: 9, name: 'Digital Blood Pressure Monitor', price: 129.99, salePrice: 79.99, image: 'https://via.placeholder.com/300x300?text=BP+Monitor', timeLeft: '2d 5h' },
    { id: 10, name: 'Nebulizer Machine', price: 89.99, salePrice: 49.99, image: 'https://via.placeholder.com/300x300?text=Nebulizer', timeLeft: '1d 12h' },
    { id: 11, name: 'Diabetic Testing Kit', price: 199.99, salePrice: 149.99, image: 'https://via.placeholder.com/300x300?text=Testing+Kit', timeLeft: '8h 45m' },
  ];

  // Display stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-accent-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-accent-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
        </svg>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      );
    }

    return stars;
  };

  // Product card component
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full hover:bg-opacity-70 transition-all">
          <button className="focus:outline-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          <button className="bg-primary-500 hover:bg-primary-600 text-white py-1 px-3 rounded-md text-sm transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  // Flash Deal Card Component
  const FlashDealCard = ({ deal }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-accent-200">
      <div className="relative">
        <img src={deal.image} alt={deal.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          Ends in: {deal.timeLeft}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{deal.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold text-secondary-600">${deal.salePrice.toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${deal.price.toFixed(2)}</span>
          </div>
          <span className="bg-secondary-100 text-secondary-800 text-xs font-medium px-2 py-1 rounded">
            {Math.round(((deal.price - deal.salePrice) / deal.price) * 100)}% OFF
          </span>
        </div>
        <button className="w-full mt-3 bg-accent-500 hover:bg-accent-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Quality Medical Supplies</h1>
              <p className="text-xl mb-6">Save up to 40% on essential healthcare products for home and professional use.</p>
              <div className="flex space-x-4">
                <Link to="/sale" className="bg-white text-primary-500 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition duration-300">
                  Shop Now
                </Link>
                <Link to="/collections" className="bg-transparent hover:bg-primary-600 border border-white font-medium py-3 px-6 rounded-md transition duration-300">
                  View Categories
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="https://via.placeholder.com/600x400?text=Medical+Supplies" alt="Medical Supplies" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>

        {/* Wave Shape Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-16 text-gray-50 fill-current">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
              <div className="mr-4 bg-primary-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">On all orders over $50</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
              <div className="mr-4 bg-primary-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Healthcare professionals available</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
              <div className="mr-4 bg-primary-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Quality Guarantee</h3>
                <p className="text-gray-600 text-sm">FDA approved products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="py-12 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Medical Flash Deals</h2>
              <p className="text-gray-600">Limited time offers on essential medical supplies</p>
            </div>
            <Link to="/flash-deals" className="text-primary-500 hover:text-primary-600 font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flashDeals.map(deal => (
              <FlashDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Medical Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCategories.map(category => (
              <Link key={category.id} to={`/category/${category.name.toLowerCase().replace(' ', '-')}`} className="group">
                <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold mb-1">{category.name}</h3>
                    <p className="text-primary-100">{category.count} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Medical Devices</h2>
            <Link to="/products" className="text-primary-500 hover:text-primary-600 font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10 flex items-center">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-4">COVID-19 Essentials</h2>
                  <p className="text-xl mb-6">Get 30% off on all masks, sanitizers, and protective equipment!</p>
                  <Link to="/covid-essentials" className="inline-block bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition duration-300">
                    Shop COVID Supplies
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img src="https://via.placeholder.com/600x400?text=COVID+Essentials" alt="COVID Essentials" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Medical Supplies</h2>
            <Link to="/new-arrivals" className="text-primary-500 hover:text-primary-600 font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">Subscribe for Health Updates</h2>
            <p className="text-lg mb-6 text-primary-100">Get the latest health tips, product updates and special offers directly to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 transition duration-300 text-white font-medium px-6 py-3 rounded-md"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm text-primary-100">By subscribing, you agree to our Privacy Policy and consent to receive updates from MediSanj.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex text-accent-500 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-700 mb-6">"The blood pressure monitor I purchased is incredibly accurate and easy to use. As a healthcare professional, I highly recommend MediSanj products."</p>
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src="https://via.placeholder.com/48x48" alt="Customer" />
                <div>
                  <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex text-accent-500 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-700 mb-6">"I needed diabetic testing supplies urgently and MediSanj delivered next day. The quality is excellent and prices are much better than my local pharmacy."</p>
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src="https://via.placeholder.com/48x48" alt="Customer" />
                <div>
                  <h4 className="font-semibold">Robert Chen</h4>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex text-accent-500 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-700 mb-6">"Our clinic has been ordering supplies from MediSanj for over a year now. Their products are reliable, delivery is prompt, and customer service is exceptional."</p>
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src="https://via.placeholder.com/48x48" alt="Customer" />
                <div>
                  <h4 className="font-semibold">Maria Rodriguez, RN</h4>
                  <p className="text-sm text-gray-500">Clinic Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Carry */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Trusted Medical Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
                <img src={`https://via.placeholder.com/150x50?text=MedBrand${index + 1}`} alt={`Medical Brand ${index + 1}`} className="h-12" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
