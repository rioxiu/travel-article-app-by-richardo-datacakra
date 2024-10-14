import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import DashboardComponent from "../../components/dashboardComponnent";
import { useTable } from "react-table";
import Swal from "sweetalert2";

interface ICategoryFormData {
  name: string;
}

const SuperAdmin: FC = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesName, setCategoriesName] = useState("");
  const [editCategoriesName, setEditCategoriesName] = useState("");
  const [documentid, setDocumentId] = useState("");
  const dataTable = useMemo(() => categories, [categories]);

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: (row: string, index: string) => index + 1,
      },
      {
        Header: "Category Name",
        accessor: "name",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row: string }) => {
          return (
            <div className="gap-4 flex flex-row justify-between">
              <a
                href="#modal"
                onClick={() => {
                  //   setEditCategoriesName(row.original.name);
                  setDocumentId(row.original.documentId); // Set ID kategori yang akan diedit
                }}
                className="btn btn-success"
              >
                Edit
              </a>
            </div>
          );
        },
      },

      {
        Header: "Action",
        accessor: "actionx",
        Cell: ({ row }) => {
          return (
            <div className="gap-4 flex flex-row justify-between">
              <button
                onClick={() => handleHapus(row.original.documentId)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: dataTable });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/categories",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/categories",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              name: categoriesName,
            },
          }),
        }
      );

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to post category",
          icon: "error",
          confirmButtonText: "Cool",
        });
        throw new Error("Failed to post category");
      }

      Swal.fire({
        title: "Success",
        text: "Category posted successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
      setCategoriesName("");
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleHapus = async (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Kamu yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya!",
        cancelButtonText: "Batalkan",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(
              import.meta.env.VITE_API_URL + `/categories/${id}`,
              {
                method: "DELETE",
                headers: {
                  authorization: `Bearer ${Cookies.get("jwt")}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              swalWithBootstrapButtons.fire({
                title: "Success!",
                text: "Kategori berhasil dihapus.",
                icon: "success",
              });
              fetchCategories();
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "There was an issue deleting the category.",
                icon: "error",
              });
            }
          } catch (error) {
            console.error(error);
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: "There was an issue deleting the category.",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  const editSubmit = async (e) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/categories/${documentid}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              name: editCategoriesName,
            },
          }),
        }
      );

      if (!response.ok) {
        alert("Failed to post category");
      }

      alert("Category posted successfully");
      setCategoriesName("");
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardComponent>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Manage Categories</h1>
        <form className="mb-4 flex flex-row gap-8 justify-end">
          <input
            value={categoriesName}
            placeholder="Category Name"
            className={`input `}
            onChange={(e) => setCategoriesName(e.target.value)}
          />
          <button onClick={onSubmit} type="submit" className="btn">
            Add Category
          </button>
        </form>

        <table {...getTableProps()} className="table w-full">
          <thead className="text-center">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="border">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="border">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div id="modal" role="modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Category!</h3>
            <p className="py-4"></p>
            <div className="modal-action flex flex-col gap-4 ">
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  value={editCategoriesName}
                  className="input input-bordered"
                  onChange={(e) => setEditCategoriesName(e.target.value)}
                />

                <button
                  onClick={() => editSubmit(documentid)}
                  className="btn max-w-lg"
                >
                  Edit
                </button>
              </form>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardComponent>
  );
};

export default SuperAdmin;
