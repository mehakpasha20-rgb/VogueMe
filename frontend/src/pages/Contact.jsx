import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#351C24] via-[#A9445D] to-[#D45D79] p-8 md:p-12 mb-12 shadow-[0_20px_50px_rgba(169,68,93,0.15)] text-white">
        <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#FF8DA1]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] left-[10%] w-[250px] h-[250px] bg-[#D45D79]/25 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/10 backdrop-blur-md text-[#FFE5EC] uppercase tracking-wider mb-4 border border-white/15">
              <i className="ti ti-mail text-[#FF8DA1] animate-pulse"></i> Support Centre
            </span>
            <h1 className="text-[38px] md:text-[52px] font-black tracking-tight capitalize drop-shadow-md mb-2">Contact Us</h1>
            <p className="text-[#FFE5EC]/90 font-medium max-w-xl text-[14px] md:text-[15px] opacity-90 leading-relaxed">
              Have questions, feedback, or need style assistance? Get in touch with our team of AI specialists and fashion consultants. We're here to help you shine.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 text-center shadow-lg self-start md:self-auto min-w-[140px] border-b-4 border-b-[#FF8DA1]/40">
            <div className="text-[32px] md:text-[40px] font-black text-white leading-none">24/7</div>
            <div className="text-[10px] font-extrabold text-[#FF8DA1] uppercase tracking-widest mt-1.5">AI Assistance</div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8 animate-slideIn" style={{ animationDelay: '0.2s' }}>
        {/* Contact Information */}
        <div className="bg-white/50 backdrop-blur-lg p-8 rounded-3xl border border-white/60 shadow-[0_15px_35px_rgba(255,133,161,0.06)]">
          <h3 className="text-[22px] font-black text-[#351C24] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Get in Touch
          </h3>
          
          <div className="space-y-4">
            {/* Email Link */}
            <a href="mailto:support@vogueme.com" className="flex items-start gap-4 group cursor-pointer hover:bg-white/55 p-3 rounded-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-[#FFE5EC] rounded-xl flex items-center justify-center flex-shrink-0 text-[#FF2E63] group-hover:scale-105 transition-transform">
                <i className="ti ti-mail text-xl"></i>
              </div>
              <div>
                <h4 className="text-[14px] font-black text-[#351C24] mb-1">Email Support</h4>
                <p className="text-[13px] text-[#A9445D] font-bold">support@vogueme.com</p>
                <span className="text-[9px] text-[#FF2E63] font-black uppercase tracking-wider bg-[#FFE5EC] px-2 py-0.5 rounded mt-1 inline-block">Write an Email</span>
              </div>
            </a>

            {/* Phone Link - Automatically opens call log */}
            <a href="tel:+15551234567" className="flex items-start gap-4 group cursor-pointer hover:bg-white/55 p-3 rounded-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-[#FFE5EC] rounded-xl flex items-center justify-center flex-shrink-0 text-[#FF2E63] group-hover:scale-105 transition-transform">
                <i className="ti ti-phone text-xl"></i>
              </div>
              <div>
                <h4 className="text-[14px] font-black text-[#351C24] mb-1">Phone (Call Center)</h4>
                <p className="text-[13px] text-[#A9445D] font-bold">+1 (555) 123-4567</p>
                <span className="text-[9px] text-emerald-600 font-black uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50 mt-1 inline-block">Click to Call Now</span>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start gap-4 p-3">
              <div className="w-12 h-12 bg-[#FFE5EC] rounded-xl flex items-center justify-center flex-shrink-0 text-[#FF2E63]">
                <i className="ti ti-map-pin text-xl"></i>
              </div>
              <div>
                <h4 className="text-[14px] font-black text-[#351C24] mb-1">Headquarters</h4>
                <p className="text-[13px] text-[#8A606A] font-semibold leading-relaxed">123 Fashion Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white/50 backdrop-blur-lg p-8 rounded-3xl border border-white/60 shadow-[0_15px_35px_rgba(255,133,161,0.06)]">
          <h3 className="text-[22px] font-black text-[#351C24] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span> Business Hours
          </h3>
          
          <div className="space-y-3 font-semibold text-[#8A606A]">
            <div className="flex justify-between border-b border-[#FFC2D1]/30 pb-2">
              <span className="text-[13px]">Monday - Friday</span>
              <span className="text-[13px] text-[#351C24] font-black">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between border-b border-[#FFC2D1]/30 pb-2">
              <span className="text-[13px]">Saturday</span>
              <span className="text-[13px] text-[#351C24] font-black">10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px]">Sunday</span>
              <span className="text-[13px] text-[#FF2E63] font-black">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
