import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./Slider.css";
import { motion } from 'framer-motion';



function Slider() {

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [cursorVariant, setCursorVariant] = useState("default");


  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "#ffbd59",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");
  
  
 
  return (
    <div className="slider">
     
      <div className="text1">
      <h1 className="tittle-1" onMouseEnter={textEnter} onMouseLeave={textLeave} >Moksha 
       
        <div className="sub-tittle-1">By NIT Agartala </div>
      </h1>
      </div>
      <motion.div
        className='cursor'
        variants={variants}
        animate={cursorVariant}
      />
      

      
      
     <div className='landing-img'>
      <img src="./images/man_with_bird.png" alt="" />
     </div>
       
      
      
    </div>
  );
}

export default Slider;
