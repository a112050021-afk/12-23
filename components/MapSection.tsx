
import React from 'react';

const MapSection: React.FC = () => {
  return (
    <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-inner mb-8 border-4 border-white">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY || ''}&q=Taipei+City&zoom=12`}
        allowFullScreen
        title="Taipei Map"
      ></iframe>
      {/* Fallback if no API KEY is present in env, showing a general embed */}
      {!process.env.API_KEY && (
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d115668.04616238302!2d121.505504!3d25.047764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac6b61db9825%3A0xb0574483d574347!2z6Ie65YyX5biC!5e0!3m2!1szh-TW!2stw!4v1715842851234!5m2!1szh-TW!2stw" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </div>
  );
};

export default MapSection;
