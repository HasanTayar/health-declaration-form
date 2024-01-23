import instagramLogo from "/assets/instagram.svg";
import whatsappLogo from "/assets/whatsapp.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

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
            מילוי טופס הצארת בריאות
          </h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/she.gym1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramLogo} alt="Instagram" className="w-8 h-8" />
            </a>
            <a
              href={import.meta.env.VITE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8" />
            </a>
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() =>
                navigate(
                  "/health-declaration-form/checking-form-submissions-id"
                )
              }
            >
              להתחלה
            </Button>
          </div>
        </div>
        <footer className="flex items-center justify-center rounded-full">
          <a
            href="https://www.quantumpinnaclematrix.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/poweredByQPM.svg"
              alt="Powered by QPM"
              className="w-32 md:w-48 hover:scale-105 transition-transform"
            />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
