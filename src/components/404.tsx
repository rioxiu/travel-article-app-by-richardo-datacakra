import { Fragment } from "react";

const Page404 = () => {
  return (
    <Fragment>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-8xl">404</h1>
          <p className="text-lg">
            {" "}
            - Halaman Tidak Ditemukan Maaf, halaman yang Anda cari tidak ada.
          </p>
        </div>
      </main>
    </Fragment>
  );
};

export default Page404;
