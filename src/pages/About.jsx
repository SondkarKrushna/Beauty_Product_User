import React from 'react';
import AboutUs from '../components/AboutUs';
import OurPromises from '../components/OurPromises';
import WhyWereDifferent from '../components/WhyWereDifferent';
// import CustomerOpinion from '../components/CustomerOpinion';

const About = () => {
  return (
    <div>
        <AboutUs />
        <WhyWereDifferent />
        <OurPromises />
        
        {/* <CustomerOpinion /> */}
    </div>
  )
}

export default About