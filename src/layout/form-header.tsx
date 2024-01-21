const FormHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 ">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            <img
              src="/assets/logo.jpg"
              alt="Logo"
              className="object-contain mx-auto"
            />
            מילוי טופס הצארת בריאות
          </h2>

          {children}
        </div>
        <footer className="flex items-center justify-center rounded-full">
          <a
            href="https://www.quantumpinnaclematrix.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/poweredByQPM.png"
              alt="Powered by QPM"
              className="w-32 md:w-48 hover:scale-105 transition-transform"
            />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default FormHeader;
