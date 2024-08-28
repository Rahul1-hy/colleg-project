import React from 'react';

function HowItWorks() {
  return (
    <section className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#D388F8] mb-6">How It Works</h2>
        <p className="text-lg mb-12">TalesTogether is a collaborative story game where users work together to create fun and exciting stories!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-[#FFEF20] mb-4">1. Start a New Story</h3>
            <p>Authenticated users begin a new story by writing the first two lines. Set the stage and kick off the creativity!</p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-[#FFEF20] mb-4">2. Add Contributions</h3>
            <p>Other users join in and contribute two more lines to the story. After each user adds their part, the story grows.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-[#FFEF20] mb-4">3. Complete the Story</h3>
            <p>After four contributions, the story is complete! No further contributions can be made, and the final story is locked in.</p>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-[#FFEF20] mb-4">4. Enjoy the Completed Story</h3>
            <p>Once the story is finished, everyone can read the final masterpiece. Enjoy the twists and turns!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
