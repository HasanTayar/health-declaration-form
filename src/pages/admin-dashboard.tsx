import { useEffect, useState } from "react";
import { DataTable } from "@/components/clients/data-table";
import NavBar from "@/components/common/nav-bar-";
import { getAllFormSubmissions } from "@/lib/firebase/services/get-all-sumbissions";
import { FormSubmission } from "@/constants";
import { columns } from "@/components/clients/columns";

const AdminDashBoard = () => {
  const [data, setData] = useState<FormSubmission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const submissions = await getAllFormSubmissions();
      if (submissions) {
        setData(submissions);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default AdminDashBoard;
