import AdminAuthForm from "@/components/Forms/admin-auth-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminAuthPage = () => {
  const dataString = localStorage.getItem("preAdminData");
  const data = dataString ? JSON.parse(dataString) : null;

  const greeting = data
    ? `שלום ${data.firstName} ${data.secondName}`
    : "שלום משתמש";

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card>
        <CardHeader className="text-right text-lg ">
          {greeting}, לכניסה למערכת נא למלא את כתובת המייל והסיסמה שלך
        </CardHeader>
        <CardContent>
          <AdminAuthForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuthPage;
