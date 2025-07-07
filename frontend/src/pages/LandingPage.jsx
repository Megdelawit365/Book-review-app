// import React, { useEffect, useState } from 'react';
// import NavBar from '../Components/NavBar';
// import Footer from '../Components/Footer';
// import { FiMail } from 'react-icons/fi'; 
// import { FaTelegramPlane } from 'react-icons/fa';
// import { FaGithub } from 'react-icons/fa'; 
// import { FaLinkedin, FaPhone } from 'react-icons/fa';

// const LandingPage = () => {
//   const [books, setBooks] = useState([]);
//   const [fiction, setFiction] = useState([]);
//   const [nonFiction, setNonFiction] = useState([]);
//   const [youngAdult, setYoungAdult] = useState([]);
//   const [open1, setOpen1] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [open3, setOpen3] = useState(false);
//   const [open4, setOpen4] = useState(false);
//   const [open5, setOpen5] = useState(false);

//       useEffect(() => {
//     fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`)
//       .then(res => res.json())
//       .then(data => {
//         setFiction(data.results.books);
//       })
//       .catch(err => {
//         console.error('Error fetching fiction:', err);
//       });

//     fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${NYT_API_KEY}`)
//       .then(res => res.json())
//       .then(data => {
//         setNonFiction(data.results.books);
//       })
//       .catch(err => {
//         console.error('Error fetching non-fiction:', err);
//       });

//     fetch(`https://api.nytimes.com/svc/books/v3/lists/current/young-adult-hardcover.json?api-key=${NYT_API_KEY}`)
//       .then(res => res.json())
//       .then(data => {
//         setYoungAdult(data.results.books);
//       })
//       .catch(err => {
//         console.error('Error fetching young adult:', err);
//       });

//     fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${NYT_API_KEY}`)
//       .then(res => res.json())
//       .then(data => {
//         setLists(data.results.lists);
//       })
//       .catch(err => {
//         console.error('Error fetching lists:', err);
//       });
//   }, []);

//   return (
//     <>
//       <NavBar />
//       <main>
//         <section className='landing-main'>
//           <div className='icons-container'>
//             <FiMail /><FaGithub /><FaTelegramPlane /><FaLinkedin /><FaPhone />
//           </div>
//           <h1>Discover <span>Books</span> . Read & Write Reviews. Save Your Favorites.</h1>
//           <p>A Place For Book Lovers To Explore and Share Book Reviews. Join And Find Your Next Great Read!</p>
//           <button>Get Started</button>
//         </section>
//         <section className='high-section'>
//           <h2>Features</h2>
//           <div className='highlights-container'>
//             <div className='highlight'>
//               <img src={`/search.png`} alt="" />
//               <h1>Find Any Book, Instantly</h1>
//               <p>Browse an API of over 40+ million books.</p>
//             </div>
//             <div className='highlight'>
//               <img src={`/rate.png`} alt="" />
//               <h1>Rate And Review</h1>
//               <p>Share Your Insights and Inspire Readers.</p>
//             </div>
//             <div className='highlight'>
//               <img src={`/items.png`} alt="" />
//               <h1>Build Your Reading List</h1>
//               <p>Create custom lists to plan your reading journey</p>
//             </div>
//             <div className='highlight'>
//               <img src={`/mobile.png`} alt="" />
//               <h1>Minimal, Distraction-Free</h1>
//               <p>A clean and responsive interface built for readers.</p>
//             </div>
//             <div className='highlight'>
//               <img src={`/mobile.png`} alt="" />
//               <h1>For Authors</h1>
//               <p>Submit your book to be discovered and reviewed.</p>
//             </div>
//             <div className='highlight'>
//               <img src={`/items.png`} alt="" />
//               <h1>Filtering</h1>
//               <p>Filter books by year, pages, rating etc.</p>
//             </div>
//           </div>
//         </section>
//         <section id='about' className='about'>
//           <h2>About Booklify</h2>
//           <div>
//             <h3>What is Booklify?</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tempora animi accusamus veniam saepe, obcaecati laudantium asperiores iusto architecto natus odio neque, porro illum odit debitis accusantium, non minus! Suscipit! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum fuga molestiae facere hic, reiciendis repellendus ipsa tenetur enim error officiis, cum sapiente necessitatibus, dolor ex harum quae. Accusantium, velit magnam.
//             </p>
//           </div>
//           <div>
//             <h3>Who is Booklify For?</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid corporis, et magni, sed pariatur iste
//               labore reiciendis culpa vel facere, cupiditate cum delectus libero? Voluptatum dolorem id incidunt optio
//               consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid corporis, et magni, sed pariatur iste
//               labore reiciendis culpa vel facere, cupiditate cum delectus libero? Voluptatum dolorem id incidunt optio
//               consequatur.</p>
//           </div>
//           <div>
//             <h3>What is Booklify?</h3>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid corporis, et magni, sed pariatur iste
//               labore reiciendis culpa vel facere, cupiditate cum delectus libero? Voluptatum dolorem id incidunt optio
//               consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid corporis, et magni, sed pariatur iste
//               labore reiciendis culpa vel facere, cupiditate cum delectus libero? Voluptatum dolorem id incidunt optio
//               consequatur.</p>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default LandingPage
