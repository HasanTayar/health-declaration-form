import React from "react";
import success from "/assets/success.svg";
const DonePage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4 md:mx-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            <img
              src="/assets/logo.jpg"
              alt="Logo"
              className="object-contain mx-auto"
            />
            הטופה שלכה התקבל בהצליה
          </h2>

          <img src={success} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DonePage;
