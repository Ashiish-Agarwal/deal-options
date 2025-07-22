import React from 'react';

const Story = () => {
  const testimonials = [
    {
      quote: "I have no idea of coding but when I saw this tool I just tried it and it was like wow - I can just click and things change! My website is so much better now, just with a few GUI steps.",
      name: "Sophie Allen",
      title: "From Zero to Hero",
    },
    {
      quote: "Before, I had to wait for my developer and he took a long time. Now I just change the banner or offers in 2 minutes - no more WhatsApp messages or delays!",
      name: "John Doe", 
      title: "Lightning Fast Changes",
    },
    {
      quote: "I tried this because my friend said it was good, and yes, after using it I also think it saves me a lot of time, especially on mobile sale pages.",
      name: "James Walker",
      title: "Time Saver for Real",
    },
    {
      quote: "My English isn't perfect, but the tool is simple and my son helped me a little. Now my shop has its own website and offers are running fast!",
      name: "Emily Stone",
      title: "Dreams Come True",
    },
    {
      quote: "My website was doing well but I had hardcoded discounts. Changing website banners and discounts daily was too much work, but this tool solved everything!",
      name: "Ankit Kushwah",
      title: "Perfect Solution",
    },
    {
      quote: "I'm running a mobile business. When our developer launched this tool and said 'you can do it with GUI', I was amazed at how simple it was!",
      name: "Michael Brooks",
      title: "Business Game Changer",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br  text-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96  mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96  mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96  mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Story Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r  bg-clip-text text-transparent leading-tight">
            The Story That Changed Everything
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl leading-relaxed text-black mb-8">
              It started with a simple conversation between friends. One day, my buddy came to me with a problem that seemed small at first, 
              but turned out to be affecting countless developers and business owners around the world.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <p className="text-lg text-black italic leading-relaxed">
                &quot;You know what&apos;s frustrating?&quot; he said. &quot;Every time I need to update my website - change a banner, update an offer, 
                fix a small detail - I either have to code it myself, wait for a developer, or pay someone to do something that should take 2 minutes. 
                There has to be a better way.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* The Problem Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            We Discovered We Weren&apos;t Alone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
            {[
              { icon: "⏰", title: "Time Wasted", desc: "Hours spent waiting for simple changes" },
              { icon: "💸", title: "Money Drained", desc: "High costs for minor updates" },
              { icon: "📱", title: "Mobile Struggles", desc: "Complex responsive design challenges" },
              { icon: "🔧", title: "Technical Barriers", desc: "Non-coders feeling helpless" },
              { icon: "💬", title: "Communication Gaps", desc: "Endless messages with developers" },
              { icon: "🚀", title: "Missed Opportunities", desc: "Slow deployment killing momentum" }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
                <p className="text-black text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Solution Story */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r -400 bg-clip-text text-black">
            So We Built Something Beautiful
          </h2>
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <p className="text-xl leading-relaxed text-center text-black mb-8">
              As a small dev team, we knew we had to create something affordable, intuitive, and powerful. 
              We spent months understanding the pain points, testing with real users, and building a solution 
              that would make website management as simple as clicking a button.
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/30">
                <div className="text-center">
                  <div className="text-3xl mb-4">✨</div>
                  <h3 className="text-2xl font-bold mb-2 text-black">The Magic Formula</h3>
                  <p className="text-black">Simple GUI + Instant Changes + Low Cost = Happy Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-black">
            Real Stories from Real People
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
              >
                <div className="mb-6">
                  <div className="text-4xl text-black mb-4 group-hover:scale-110 transition-transform duration-300">&quot;</div>
                  <p className="text-black leading-relaxed text-sm italic">{testimonial.quote}</p>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <p className="font-semibold text-black text-lg">{testimonial.name}</p>
                  <p className="text-black text-sm font-medium">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Impact */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-black">
            The Impact We Never Expected
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <p className="text-xl leading-relaxed text-black mb-8">
              What started as solving a friend s problem became a movement. We &quot; ve watched shop owners launch their first websites&lsquo;
              seen developers save hundreds of hours, and helped businesses adapt faster than ever before.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">1000+</div>
                <div className="text-black text-sm">Hours Saved Daily</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-black text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
                <div className="text-black text-sm">Possibilities Unlocked</div>
              </div>
            </div>
            <p className="text-lg text-black mt-8 italic">
              Sometimes the best solutions come from the simplest conversations between friends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;