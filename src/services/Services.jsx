import React from 'react';
import serviceData from '../assets/data/serviceData';
import { motion } from 'framer-motion';

function Services() {
  return (
    <div className="grid md:grid-cols-4 md:justify-items-center justify-around md:px-2 lg:px-2 xl:px-10 2xl:px-[90px]"> 
        {serviceData.map((item, index) => (
            <motion.div whileTap={{scale:1.1}} key={index} className={`border w-[220px] md:w-[180px] lg:w-[230px] xl:w-[280px] h-[80px] py-4 flex gap-2 justify-center mt-4 mx-4 md:px-2 rounded-md border-none`} style={{backgroundColor : item.bg}}>
                <span className="w-10 h-10 md:w-[35px] md:h-[32px] lg:w-[50px] lg:h-[50px] rounded-full bg-black relative">
                    <svg className="w-[25px] md:w-[20px] lg:w-[30px] text-white absolute right-[7px] md:right-[5px] lg:right-[10px] top-[7px] md:top-[7px] lg:top-[10px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d={item.icon}></path></svg>
                </span>
                <div>
                    <div className="font-bold text-xl md:text-sm lg:text-xl">{item.title}</div>
                    <div className="text-xs opacity-50 lg:opacity-80">{item.subtitle}</div>
                </div>
            </motion.div>
        ))}
    </div>
  );
}

export default Services;
