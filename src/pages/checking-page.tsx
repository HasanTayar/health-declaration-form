import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { checkForExistingPDF } from "@/lib/firebase/services/check-for-existing-pdf";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckingPage = () => {
  const [id, setId] = useState("");
  const [isLoading , setIsLoading]=useState(false)
  const [isExists , setIsExists] = useState(false)
  const navigate = useNavigate()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleChecking = async ()=>{
    setIsLoading(true)
    const exists = await checkForExistingPDF({id})
    if(exists){
        setIsLoading(false)
        setIsExists(true)
    }else{
        setIsLoading(false)
        const encodedId = encodeURIComponent(id)
        navigate(`/health-declaration-form/form?id=${encodedId}`)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
      <Card>       <CardHeader>
          <CardTitle className="max-w-lg w-full  rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold text-center mb-4">
            <img src="/assets/logo.jpg" alt="Logo" className="object-contain mx-auto" />

              מילוי טופס הצארת בריאות
            </h2>
          </CardTitle>
          <CardContent>
            <h2 className="text-xl  text-right mb-4">
              נא להזין תעודת זהות{" "}
              <span className="text-red-500 font-bold">*</span>
            </h2>
            <Input type="text" className="rounded-lg text-lg text-clip" required min={9} max={9} value={id} onChange={handleInputChange}/>
            <div className="mt-5 flex justify-end">

            <Button disabled={isLoading} onClick={handleChecking}>הבא</Button>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

    </div>
  );
};

export default CheckingPage;
