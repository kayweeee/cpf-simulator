import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';
import React, { useEffect , useRef } from 'react';
import './faq.css';
import landingpage from '../../public/landingpage.png';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0 }
};


const Faq = () => {
    // scroll animation pointers
    const control1 = useAnimation();
    const [ref1, inView1] = useInView();
    const control2 = useAnimation();
    const [ref2, inView2] = useInView();
    const control3 = useAnimation();
    const [ref3, inView3] = useInView();
    const control4 = useAnimation();
    const [ref4, inView4] = useInView();
    // for button scroll
    const targetRef1 = useRef(null); 
    const targetRef2 = useRef(null); 


    const scrollToComponent1 = () => {
    targetRef1.current.scrollIntoView({ behavior: "smooth" });
};

    const scrollToComponent2 = () => {
    targetRef2.current.scrollIntoView({ behavior: "smooth" });
};

    useEffect(() => {
        if (inView1) {
            control1.start("visible");
        } else {
            control1.start("hidden");
        }
    }, [control1, inView1]);

    useEffect(() => {
        if (inView2) {
            control2.start("visible");
        } else {
            control2.start("hidden");
        }
    }, [control2, inView2]);

    useEffect(() => {
        if (inView3) {
            control3.start("visible");
        } else {
            control3.start("hidden");
        }
    }, [control3, inView3]);

    useEffect(() => {
        if (inView4) {
            control4.start("visible");
        } else {
            control4.start("hidden");
        }
    }, [control4, inView4]);

    return (
        <div>
            <Topnavbar />
            <div className="greenFlexBox">
                <div className="leftFlex">
                    <div className="title">CPF Simulator FAQ</div>
                    <div className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                    <div className="buttons">
                        <button className="submitButton"onClick={scrollToComponent1}>How to get started</button>
                        <button className="submitButton"onClick={scrollToComponent2}>Downloading transcript</button>
                    </div>
                </div>
                <div className="rightFlex">
                    <img src={landingpage.src} alt="faq" className="faq" width="90%" height="90%" />
                </div>
            </div>
            <motion.div className="whiteFlexBox"
                ref={ref1}
                variants={boxVariant}
                initial="hidden"
                animate={control1}
                ref={targetRef1}
            >
                <div className="leftFlexWhite">
                    <motion.img src={landingpage.src} alt="anotherImage" className="anotherImage" width="90%" height="90%"
                        ref={ref1}
                        variants={boxVariant}
                        initial="hidden"
                        animate={control1}
                    />
                </div>
                <div className="rightFlexWhite">
                    <div className="title">CPF Simulator FAQ</div>
                    <div className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
            </motion.div>
            <motion.div className="whiteFlexBox"
                ref={ref2}
                variants={boxVariant}
                initial="hidden"
                animate={control2}
            >
                <div className="leftFlexWhiteNew">
                    <div className="title">CPF Simulator FAQ</div>
                    <div className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
                <div className="rightFlexWhiteNew">
                    <motion.img src={landingpage.src} alt="anotherImage" className="anotherImage" width="90%" height="90%"
                        ref={ref2}
                        variants={boxVariant}
                        initial="hidden"
                        animate={control2}
                    />
                </div>
            </motion.div>
            <motion.div className="whiteFlexBox"
                ref={ref3}
                variants={boxVariant}
                initial="hidden"
                animate={control3}
            >
                <div className="leftFlexWhite">
                    <motion.img src={landingpage.src} alt="anotherImage" className="anotherImage" width="90%" height="90%"
                        ref={ref3}
                        variants={boxVariant}
                        initial="hidden"
                        animate={control3}
                    />
                </div>
                <div className="rightFlexWhite">
                    <div className="title">CPF Simulator FAQ</div>
                    <div className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
            </motion.div>
            <motion.div className="whiteFlexBox"
                ref={ref4}
                variants={boxVariant}
                initial="hidden"
                animate={control4}
                ref={targetRef2}
            >
                <div className="leftFlexWhiteNew">
                    <div className="title">Downloading Transcipt</div>
                    <div className="paragraph">Heres how you download transcript</div>
                </div>
                <div className="rightFlexWhiteNew">
                    <motion.img src={landingpage.src} alt="anotherImage" className="anotherImage" width="90%" height="90%"
                        ref={ref4}
                        variants={boxVariant}
                        initial="hidden"
                        animate={control4}
                    />
                </div>
            </motion.div>
            <Bottomnavbar />
        </div>
    );
}

export default Faq;