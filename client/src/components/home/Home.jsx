import React from 'react'
import {} from '../home/Home.css'

function Home() {
  return (
    <div className='abcd'>
    <div className="mat">
      <div>
        <h1 className='hi display-5 fw-bold'>Welcome to Our Blogging Platform</h1>
        <p className='display-5 fs-5 fw-normal'>
          Explore a world of insightful articles, creative content, and engaging discussions. Whether you're here to share your thoughts or discover new perspectives, our platform is designed for you.
        </p>
      </div>
      <div >
        <h2 className='display-4 fs-2 fw-bold'>Featured Posts</h2>
        <p className='display-5 fs-5 fw-normal'>Discover our handpicked selection of featured blog posts that cover a wide range of topics.</p>
      </div>
      <div>
        <h2 className='display-4 fs-2 fw-bold'>Join Our Community</h2>
        <p className='display-5 fs-5 fw-normal'>Connect with like-minded individuals, share your experiences, and be a part of our vibrant blogging community.</p>
      </div>
    </div>
    </div>
  )
}

export default Home