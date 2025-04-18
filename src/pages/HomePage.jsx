import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import Hero from '../components/layout/Hero';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import required Swiper modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const HomePage = () => {
  // Medical supplies product data
  const featuredProducts = [
    { id: 1, name: 'Digital Thermometer', price: 29.99, image: 'https://placehold.co/300x300?text=Thermometer', rating: 4.5, reviews: 128, discount: 20 },
    { id: 2, name: 'Blood Pressure Monitor', price: 89.99, image: 'https://placehold.co/300x300?text=BP+Monitor', rating: 4.8, reviews: 356, discount: 0 },
    { id: 3, name: 'Pulse Oximeter', price: 49.99, image: 'https://placehold.co/300x300?text=Oximeter', rating: 4.7, reviews: 245, discount: 15 },
    { id: 4, name: 'Glucose Monitor Kit', price: 79.99, image: 'https://placehold.co/300x300?text=Glucose+Monitor', rating: 4.3, reviews: 187, discount: 10 },
  ];

  const newArrivals = [
    { id: 5, name: 'N95 Respirator Masks (10pk)', price: 24.99, image: 'https://placehold.co/300x300?text=N95+Masks', rating: 4.1, reviews: 64, discount: 0 },
    { id: 6, name: 'Infrared Forehead Thermometer', price: 59.99, image: 'https://placehold.co/300x300?text=IR+Thermometer', rating: 4.6, reviews: 132, discount: 0 },
    { id: 7, name: 'Medical Stethoscope', price: 39.99, image: 'https://placehold.co/300x300?text=Stethoscope', rating: 4.4, reviews: 98, discount: 0 },
    { id: 8, name: 'First Aid Kit (Comprehensive)', price: 45.99, image: 'https://placehold.co/300x300?text=First+Aid+Kit', rating: 4.2, reviews: 112, discount: 0 },
  ];

  // Medical categories
  const trendingCategories = [
    { id: 1, name: 'Diagnostic Devices', image: 'https://placehold.co/400x300?text=Diagnostic+Devices', count: 42 },
    { id: 2, name: 'Personal Protection', image: 'https://placehold.co/400x300?text=PPE', count: 38 },
    { id: 3, name: 'Home Care', image: 'https://placehold.co/400x300?text=Home+Care', count: 56 },
  ];

  // Medical flash deals
  const flashDeals = [
    { id: 9, name: 'Digital Blood Pressure Monitor', price: 129.99, salePrice: 79.99, image: 'https://placehold.co/300x300?text=BP+Monitor', timeLeft: '2d 5h' },
    { id: 10, name: 'Nebulizer Machine', price: 89.99, salePrice: 49.99, image: 'https://placehold.co/300x300?text=Nebulizer', timeLeft: '1d 12h' },
    { id: 11, name: 'Diabetic Testing Kit', price: 199.99, salePrice: 149.99, image: 'https://placehold.co/300x300?text=Testing+Kit', timeLeft: '8h 45m' },
  ];

  // Medical categories with small cards
  const categories = [
    { id: 1, name: 'Medical Devices', image: 'https://placehold.co/200x200?text=Medical+Devices', count: 42 },
    { id: 2, name: 'First Aid', image: 'https://placehold.co/200x200?text=First+Aid', count: 38 },
    { id: 3, name: 'Personal Care', image: 'https://placehold.co/200x200?text=Personal+Care', count: 56 },
    { id: 4, name: 'Diagnostics', image: 'https://placehold.co/200x200?text=Diagnostics', count: 29 },
    { id: 5, name: 'Hospital Supplies', image: 'https://placehold.co/200x200?text=Hospital+Supplies', count: 45 },
    { id: 6, name: 'Mobility Aids', image: 'https://placehold.co/200x200?text=Mobility+Aids', count: 33 }
  ];

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
      <div className="-mt-0 -pt-0">
        <Hero />
      </div>

      {/* Categories Section */}
      <section className="py-4 md:py-8 bg-white">
        <div className="md:container mx-auto px-4">
          {/* Desktop Grid View */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-mobile hover:shadow-mobile-lg transition-shadow duration-300 border border-gray-100">
                  <div className="relative aspect-square">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Slider View */}
          <div className="sm:hidden">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={12}
              slidesPerView={2.2}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="categories-swiper"
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Link
                    to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                      <div className="relative aspect-square">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-xs font-medium text-gray-900 truncate">{category.name}</h3>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Medical Flash Deals</h2>
              <p className="text-sm md:text-base text-gray-600">Limited time offers on essential medical supplies</p>
            </div>
            <Link to="/flash-deals" className="text-sm md:text-base text-primary-500 hover:text-primary-600 font-medium">View All</Link>
          </div>
          
          {/* Mobile Grid View */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {flashDeals.map(deal => (
              <div key={deal.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-accent-200">
                <div className="relative">
                  <img src={deal.image} alt={deal.name} className="w-full h-32 object-cover" />
                  <div className="absolute top-1 right-1 bg-accent-500 text-white text-xs px-1.5 py-0.5 rounded">
                    {deal.timeLeft}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{deal.name}</h3>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-secondary-600">${deal.salePrice.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 line-through">${deal.price.toFixed(2)}</span>
                    </div>
                    <span className="bg-secondary-100 text-secondary-800 text-xs font-medium px-1.5 py-0.5 rounded self-start">
                      {Math.round(((deal.price - deal.salePrice) / deal.price) * 100)}% OFF
                    </span>
                  </div>
                  <button className="w-full mt-2 bg-accent-500 hover:bg-accent-600 text-white py-1.5 px-3 rounded text-xs font-medium transition duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Slider View */}
          <div className="hidden sm:block relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                }
              }}
              className="flash-deals-swiper"
            >
              {flashDeals.map(deal => (
                <SwiperSlide key={deal.id}>
                  <FlashDealCard deal={deal} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-3 md:px-4">
          {/* Use Swiper on mobile, grid on larger screens */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            <div className="flex items-center bg-white p-3 md:p-6 rounded-lg border">
              <div className="mr-3 md:mr-4 bg-primary-100 p-2 md:p-3 rounded-full">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-lg mb-0.5 md:mb-1">Fast Delivery</h3>
                <p className="text-xs md:text-sm text-gray-600">On all orders over $50</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-3 md:p-6 rounded-lg border">
              <div className="mr-3 md:mr-4 bg-primary-100 p-2 md:p-3 rounded-full">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-lg mb-0.5 md:mb-1">24/7 Support</h3>
                <p className="text-xs md:text-sm text-gray-600">Healthcare professionals available</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-3 md:p-6 rounded-lg border">
              <div className="mr-3 md:mr-4 bg-primary-100 p-2 md:p-3 rounded-full">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-lg mb-0.5 md:mb-1">Quality Guarantee</h3>
                <p className="text-xs md:text-sm text-gray-600">FDA approved products</p>
              </div>
            </div>
          </div>

          {/* Mobile Swiper */}
          <div className="sm:hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
            >
              <SwiperSlide>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
                  <div className="mr-3 bg-primary-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-0.5">Fast Delivery</h3>
                    <p className="text-xs text-gray-600">On all orders over $50</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
                  <div className="mr-3 bg-primary-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-0.5">24/7 Support</h3>
                    <p className="text-xs text-gray-600">Healthcare professionals available</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
                  <div className="mr-3 bg-primary-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-0.5">Quality Guarantee</h3>
                    <p className="text-xs text-gray-600">FDA approved products</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Medical Devices</h2>
              <p className="text-sm md:text-base text-gray-600">Top-rated medical equipment and supplies</p>
            </div>
            <Link to="/products" className="text-sm md:text-base text-primary-500 hover:text-primary-600 font-medium">View All</Link>
          </div>

          {/* Mobile Grid View */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                  {product.discount > 0 && (
                    <div className="absolute top-1 right-1 bg-secondary-500 text-white text-xs px-1.5 py-0.5 rounded">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-gray-900">${product.price}</span>
                    {product.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through">
                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="flex items-center text-accent-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-accent-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1">({product.reviews})</span>
                  </div>
                  <button className="w-full mt-2 bg-primary-500 hover:bg-primary-600 text-white py-1.5 px-3 rounded text-xs font-medium transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Slider View */}
          <div className="hidden sm:block relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                }
              }}
              className="flash-deals-swiper"
            >
              {featuredProducts.map(product => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
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
                <img src="https://placehold.co/600x400?text=COVID+Essentials" alt="COVID Essentials" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">New Medical Supplies</h2>
              <p className="text-sm md:text-base text-gray-600">Latest additions to our medical inventory</p>
            </div>
            <Link to="/new-arrivals" className="text-sm md:text-base text-primary-500 hover:text-primary-600 font-medium">View All</Link>
          </div>

          {/* Mobile Grid View */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {newArrivals.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                  {product.discount > 0 && (
                    <div className="absolute top-1 right-1 bg-secondary-500 text-white text-xs px-1.5 py-0.5 rounded">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-gray-900">${product.price}</span>
                    {product.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through">
                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="flex items-center text-accent-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-accent-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1">({product.reviews})</span>
                  </div>
                  <button className="w-full mt-2 bg-primary-500 hover:bg-primary-600 text-white py-1.5 px-3 rounded text-xs font-medium transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Slider View */}
          <div className="hidden sm:block relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                }
              }}
              className="flash-deals-swiper"
            >
              {newArrivals.map(product => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
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
            <p className="mt-4 text-sm text-primary-100">By subscribing, you agree to our Privacy Policy and consent to receive updates from Medical Bazzar Nepal.</p>
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
              <p className="text-gray-700 mb-6">"The blood pressure monitor I purchased is incredibly accurate and easy to use. As a healthcare professional, I highly recommend Medical Bazzar Nepal products."</p>
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src="https://placehold.co/48x48" alt="Customer" />
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
              <p className="text-gray-700 mb-6">"I needed diabetic testing supplies urgently and Medical Bazzar Nepal delivered next day. The quality is excellent and prices are much better than my local pharmacy."</p>
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src="https://placehold.co/48x48" alt="Customer" />
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
              <p className="text-gray-700 mb-6">"Our clinic has been ordering supplies from Medical Bazzar Nepal for over a year now. Their products are reliable, delivery is prompt, and customer service is exceptional."</p>
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src="https://placehold.co/48x48" alt="Customer" />
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
                <img src={`https://placehold.co/150x50?text=MedBrand${index + 1}`} alt={`Medical Brand ${index + 1}`} className="h-12" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
