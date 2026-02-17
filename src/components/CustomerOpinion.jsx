// import React from "react";
// // import bgImage from "/Images/styleImg.png";
// // import flower from "/Images/flower2.png";

// const CustomerOpinion = () => {
//   const testimonials = [
//     {
//       text: "I absolutely love the quality of the\nproducts! The flash sales are a\ngame-changer – I got my favorite\nlipstick at half the price. Highly\nrecommended!",
//       name: "Priya S.",
//       location: "Mumbai",
//     },
//     {
//       text: "Affordable yet luxurious!The\nskincare range really worked\nwonders for me.Plus, the\npackaging is so classy – feels\npremium every time.",
//       name: "Ananya R.",
//       location: "Delhi",
//     },
//     {
//       text: "Finally a brand that delivers\nwhat it promises.Cruelty-\nfree, trendy, and budget-\nfriendly – I’m a loyal\ncustomer now.",
//       name: "Meera K.",
//       location: "Pune",
//     },
//   ];

//   return (
//     <div
//       className="w-full min-h-screen bg-no-repeat bg-cover py-10 text-gray-800 relative"
//       style={{
//         backgroundImage: `url("/Images/styleImg.png"), url("/Images/styleImg.png")`,
//         backgroundPosition: "left center, right center",
//         backgroundRepeat: "no-repeat, no-repeat",
//         backgroundSize: "40%, 40%",
//       }}
//     >
     
//       <img
//         src="/Images/flower2.png"
//         alt="flower decoration"
//         className="absolute -top-40 left-[1300px] w-96 h-96"
//       />

//       <div className="text-center mb-12">
//         <h2 className="text-5xl font-rafgins">What Our Customers Say</h2>
//         <p className="mt-4 text-xl text-[#7D7D86]">
//           Real stories from beauty lovers who shop with us every day.
//         </p>
//       </div>

     
//       <div className="flex flex-col md:flex-row justify-between items-stretch px-6 md:px-20 mx-auto">
//         {testimonials.map((item, index) => (
//           <div
//             key={index}
//             className="rounded-2xl p-6 flex-1 mx-2 relative "
//           >
        
//             <div className="flex mb-4 text-yellow-500 text-3xl justify-center">★★★★★</div>

        
//             <p className="font-outfit text-[21px]  whitespace-pre-line text-center">“{item.text}”</p>

      
//             <p className="mt-4  text-[#8E347A] text-4xl font-satisfy text-center">
//               {item.name} - {item.location}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomerOpinion;
