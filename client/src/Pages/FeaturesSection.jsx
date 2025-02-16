import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    { title: "Anxiety Support", description: "Get real-time guidance to manage anxiety and calm your mind.", icon: "😟" },
    { title: "Depression Assistance", description: "Receive support and coping strategies to help with depression.", icon: "😞" },
    { title: "Stress Management", description: "Learn relaxation techniques to reduce stress and improve well-being.", icon: "😰" },
    { title: "Relationship Guidance", description: "Get advice on handling conflicts and strengthening relationships.", icon: "❤️" },
    { title: "Mindfulness Coaching", description: "Practice mindfulness exercises to stay present and improve mental clarity.", icon: "🧘" },
    { title: "Crisis Support", description: "Immediate assistance during emotional distress or crisis situations.", icon: "🚨" },
  ];

  return (
    <div className="bg-[#F6F8FC] py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6" data-aos="fade-up">
        Things Our Mental Health Chatbot Can Do
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
        Our chatbot is designed to assist you with various mental health challenges, offering tailored support based on your needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center" 
            data-aos="fade-up" 
            data-aos-delay={`${index * 100}`}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
