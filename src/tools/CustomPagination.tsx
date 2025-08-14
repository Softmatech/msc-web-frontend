import { Pagination } from "react-admin";
import { useEffect, useState } from "react";

const CustomPagination = (props: any) => {
  // Load user preference from localStorage or default to 10
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const saved = localStorage.getItem("rowsPerPage");
    return saved ? parseInt(saved, 10) : 10;
  });

  useEffect(() => {
    localStorage.setItem("rowsPerPage", rowsPerPage.toString());
  }, [rowsPerPage]);

  return (
    <Pagination
      {...props}
      rowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 2000]}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(event) =>
        setRowsPerPage(parseInt(event.target.value, 10))
      }
    />
  );
};

export default CustomPagination;
