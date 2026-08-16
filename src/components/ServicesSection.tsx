import React from 'react';
import { Car, Compass, Mountain, Hotel, Ticket, Heart, Trees } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesSectionProps {
  onOpenEnquiry: (contextData?: { tripType?: string }) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenEnquiry }) => {
  const services = [
    {
      icon: Compass,
      title: 'Package Tours',
      desc: 'Exclusive customized holiday packages tailored to your schedule across Wild Dooars, Tea Gardens & Bhutan.',
      action: 'Enquire Now',
      type: 'Package Tour'
    },
    {
      icon: Car,
      title: 'Car Rental',
      desc: 'Serene road trip experience with AC & Non-AC cars, Innova, Bolero, and Maruti Suzuki driven by mountain experts.',
      action: 'Rent a Car',
      type: 'Car Rental'
    },
    {
      icon: Mountain,
      title: 'Adventure Tours',
      desc: 'High adrenaline river rafting, forest trekking, Jayanti riverbed drives, and nature exploration trips.',
      action: 'Explore Adventure',
      type: 'Adventure Trip'
    },
    {
      icon: Hotel,
      title: 'Hotel & Resort Booking',
      desc: 'Luxurious resort stays, forest homestays, and eco-lodges near Jaldapara, Lataguri, & Phuentsholing.',
      action: 'Check Hotels',
      type: 'Hotel Booking'
    },
    {
      icon: Ticket,
      title: 'Jungle Safaris',
      desc: 'Expert guidance for Jaldapara & Gorumara Jeep Safaris, Elephant rides, and Forest Department permit coordination.',
      action: 'Safari Guidance',
      type: 'Wildlife Tour'
    },
    {
      icon: Heart,
      title: 'Honeymoon Trips',
      desc: 'Embrace romantic quietude, candlelight dinners, and scenic mountain views with exclusive Honeymoon Packages.',
      action: 'View Packages',
      type: 'Honeymoon Trip'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-emerald-100 font-sans">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered">
          <div className="icon-box mb-2">
            <Trees className="w-10 h-10 mx-auto text-[#15803d]" />
          </div>
          <h2>
            Our Awesome <span>Services</span>
          </h2>
          <div className="desc-text">
            Comprehensive travel management, premium car rentals, resort bookings, and safari arrangements across Wild Dooars.
          </div>
        </div>

        {/* Clean 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white p-7 rounded-2xl border border-emerald-100 shadow-sm hover:border-[#15803d] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center mb-5 group-hover:bg-[#15803d] group-hover:text-white transition-colors border border-emerald-200/80 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenEnquiry({ tripType: srv.type })}
                  className="text-xs font-extrabold text-[#15803d] hover:text-[#166534] uppercase tracking-wider flex items-center gap-1.5 pt-3 border-t border-emerald-100"
                >
                  <span>{srv.action}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
