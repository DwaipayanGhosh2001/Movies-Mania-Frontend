import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const TypingEffect = ({ text }) => {
  const [typedText, setTypedText] = useState("");
  const controls = useAnimation();

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i < text.length; i++) {
        await controls.start({ opacity: 1, transition: { duration: 0.1 } });
        await controls.start({ opacity: 0, transition: { duration: 0.1 } });
        setTypedText((prevText) => prevText + text[i]);
      }
    };

    typeText();
  }, [text, controls]);
  /*
This component accepts a text prop, which represents the text to be typed. 
It initializes a state variable typedText using the useState hook to keep track of the currently typed text. 
The controls variable is created using the useAnimation hook from Framer Motion to control the animation.
The useEffect hook is used to trigger the typing animation whenever the text prop changes.
 Inside the useEffect hook, we define an async function called typeText to handle the animation. 
 It iterates over each character in the text prop and animates the cursor's opacity to make it visible and then invisible. 
 After each iteration, the current character is appended to the typedText state using the setTypedText function.
*/
  return (
    <div>
      <motion.span style={{ display: "inline-block", marginRight: "0.2em" }}>
        {typedText}
      </motion.span>
      <motion.span
        style={{ display: "inline-block", opacity: 0 }}
        animate={controls}
      >
        |
      </motion.span>
    </div>
    /*
    In the return statement, the component renders two <span> elements inside a <div>. 
    The first <span> element displays the currently typed text (typedText). 
    It uses the motion component from Framer Motion to apply animations. 
    The second <span> element represents the cursor, which is initially hidden (opacity: 0). 
    The animate prop is used to control the animation of the cursor using the controls object.
    */
  );
};

export default TypingEffect;
