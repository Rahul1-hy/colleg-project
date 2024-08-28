import React from 'react';

function PrivacyPolicy() {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D388F8]">Privacy Policy</h1>
          <p className="text-lg text-gray-400 mt-2">
            At TalesTogether, your privacy is of utmost importance to us. This Privacy Policy outlines how we handle your data and protect your information while you enjoy your storytelling journey on our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#FFEF20]">Information We Collect</h2>
            <p className="text-gray-300 mt-4">
              We collect information such as your name, email address, and user-generated content to personalize your experience and facilitate collaboration on stories. We are committed to keeping your information secure.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#FFEF20]">How We Use Your Information</h2>
            <p className="text-gray-300 mt-4">
              Your data is used to enhance your experience, provide support, and improve our platform. We never share your personal information with third parties without your consent, except where required by law.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#FFEF20]">Your Rights</h2>
            <p className="text-gray-300 mt-4">
              You have the right to access, correct, or delete your personal data at any time. If you have any concerns about your privacy or wish to make changes to your information, feel free to contact us.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#FFEF20]">Changes to the Policy</h2>
            <p className="text-gray-300 mt-4">
              We may update this Privacy Policy from time to time. Any changes will be posted here, and we encourage you to review it regularly to stay informed about how we are protecting your information.
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

export default PrivacyPolicy;
