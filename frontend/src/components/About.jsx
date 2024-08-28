import React from 'react';

function About() {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D388F8]">About TalesTogether</h1>
          <p className="text-lg text-gray-400 mt-2">
            Welcome to TalesTogether, where creativity meets collaboration. Our platform allows storytellers and readers to connect through collaborative storytelling. Whether you're here to start a new adventure or join an existing one, we're thrilled to have you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#FFEF20]">Our Mission</h2>
            <p className="text-gray-300 mt-4">
              Our mission is to create a vibrant community where storytellers can share their ideas and readers can dive into exciting narratives. We believe in the power of storytelling to bring people together and spark imagination.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#FFEF20]">How It Works</h2>
            <p className="text-gray-300 mt-4">
              On TalesTogether, you can start a new story or contribute to existing ones. Our platform makes it easy to collaborate with others, share your ideas, and watch your story unfold. Explore our collection and be a part of the storytelling magic!
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="/" className="bg-[#FFEF20] text-black py-2 px-6 rounded-lg font-semibold hover:bg-yellow-500">
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
