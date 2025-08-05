
import { Mail, Phone, MapPin, Instagram, Twitter } from 'lucide-react';

const ContactSection = () => {
 

 
   

  

  return (
    <section className="bg-gradient-to-br  from-slate-50 to-blue-50 py-16 px-4 min-h-screen flex justify-center items-center">
      <div className=" w-full mx-auto ">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have a question or want to work together? I d love to hear from you. 
            Send me a message and I ll respond as soon as possible.
          </p>
        </div>

        <div className=" gap-12  w-full flex justify-center items-center ">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <a href="mailto:kevindorny003@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                      kevindorny003@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <a href="tel:+916367395312" className="text-green-600 hover:text-green-800 transition-colors">
                      +91 6367395312
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-200 transition-colors">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">india</p>
                    <p className="text-gray-600">rajasthan , bhilwara</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Follow Me</h3>
              
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/dornygrp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                
                
                
                <a 
                  href="https://x.com/dornygrp35016" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-blue-500 p-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="w-6 h-6 text-white" />
                </a>
                
               
                 
                
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Instagram:</strong> personal ig account
                </p>
                <p className="text-purple-600 font-medium">@aviinashagarwal</p>
              </div>
            </div>
          </div>
          </div>

          

        
      </div>
    </section>
  );
};

export default ContactSection;