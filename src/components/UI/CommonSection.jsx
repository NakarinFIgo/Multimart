import React from 'react';
import CommonBackGround from '../../assets/images/common-section.jpg';

function CommonSection({ title }) {
  return (
    <div className="bg-cover bg-center min-h-[400px] flex items-center justify-center text-white font-bold text-4xl 2xl:text-9xl" style={{ backgroundImage: `url(${CommonBackGround})` }}>
      <h1>{title}</h1>
    </div>
  );
}

export default CommonSection;
