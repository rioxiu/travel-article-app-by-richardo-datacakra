import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface IArticleFormData {
  title: string;
  description: string;
  cover_image_url: string; // Sesuaikan tipe ini dengan URL file
  category: number;
}

const AddArticlePage: FC = () => {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArticleFormData>();

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async (): Promise<string | null> => {
    if (!file) {
      alert("Please select a file to upload");
      return null;
    }

    const formData = new FormData();
    formData.append("files", file);

    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/upload",
        requestOptions
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error:", errorResponse);
        throw new Error("Upload failed");
      }

      const data = await response.json();
      // return url; // Kembalikan URL dari file yang diupload
      const url = data[0].url;
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null; // Kembalikan null jika terjadi kesalahan
    }
  };

  const onSubmit = async (data_form: IArticleFormData) => {
    try {
      const coverImageUrl = await handleFileUpload(); // Upload file dan ambil URL
      if (!coverImageUrl) {
        Swal.fire({
          title: "Error",
          text: "File upload failed",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
      const response = await fetch(import.meta.env.VITE_API_URL + "/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify({
          data: {
            title: data_form.title,
            description: data_form.description,
            cover_image_url: coverImageUrl, // Gunakan URL file yang baru diupload
            category: data_form.category,
          },
        }),
      });
      console.log(response.body);
      const responseData = await response.json(); // Ambil data_form JSON dari respons
      if (!response.ok) {
        console.error("Error response:", responseData); // Debug informasi kesalahan
        Swal.fire({
          title: "Error",
          text: responseData.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Ok",
        });
        throw new Error(responseData.message);
      }
      Swal.fire({
        title: "Success",
        text: "Article added successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
      console.log("Artikel berhasil ditambahkan:", responseData);
    } catch (error) {
      console.error("Gagal menambahkan artikel:", error);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center min-h-screen p-10">
        <div className="bg-white p-10 rounded shadow-md max-w-2xl w-full">
          <h2 className="text-black text-3xl font-semibold mb-10 text-center">
            Add Article
          </h2>
          <form
            className="flex gap-4 flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              <label className="text-black">Title:</label>
              <input
                className="max-w-2xl input input-bordered"
                type="text"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-black">Description:</label>
              <textarea
                className="textarea-bordered max-w-2xl textarea"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-black">Cover Image:</label>
              <input type="file" required onChange={handleFileChange} />
            </div>
            <div className="flex flex-col gap-3">
              <label>Category:</label>
              <select
                className="max-w-2xl select"
                {...register("category", { required: true })}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <button className="btn">Add Article</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddArticlePage;
