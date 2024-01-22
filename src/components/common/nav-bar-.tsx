import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { auth } from "@/lib/firebase/config";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <header className="w-full h-20 bg-red-50 flex justify-between items-center px-4">
      <div className="flex items-center">
        <img
          src="/assets/logo.jpg"
          alt="She Gyms Logo"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="font-semibold text-xl">
          She Gyms by Muscles Factory
        </span>
      </div>
      <Button
        className=" bg-red-50 font-bold py-2 px-4 rounded"
        onClick={handleLogout}
        variant="outline"
      >
        להתנתק
      </Button>
    </header>
  );
};

export default NavBar;
