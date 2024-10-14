import React, { Fragment, useEffect } from "react";
import Cookies from "js-cookie";
import DashboardComponent from "../../components/dashboardComponnent";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction, setUser } from "../../redux/reducer/authLoginReducer";

const ArticlePages = () => {
  const [articles, setArticles] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize] = React.useState(4);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({ isLogin: Cookies.get("jwt") }));
  }, [dispatch]);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/articles?populate=*`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${Cookies.get("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setArticles(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const displayedArticles = articles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <DashboardComponent>
      <div className="w-full min-h-screen flex flex-col gap-10 p-10 phone:p-5 m-auto my-8">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-center text-4xl ">List Travel</h1>
          <Link to="/create-article" className="btn rounded-md max-w-sm ">
            Add Article
          </Link>
        </div>
        <div className="grid grid-cols-4 tablet:grid-cols-2 phone:place-items-center phone:grid-cols-1 gap-7">
          {displayedArticles.map(
            (article: {
              id: number;
              documentId: string;
              cover_image_url: string;
              title: string;
            }) => (
              <div key={article.id} className="card bg-base-100 w-96 shadow-xl">
                <figure>
                  <img
                    className="w-fit"
                    src={article.cover_image_url}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body flex flex-col justify-between">
                  <h2 className="card-title">{article.title}</h2>
                  <div className="card-actions justify-end mt-4">
                    <a className="btn" href={`/article/${article.documentId}`}>
                      See list
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="flex join justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn-outline max-w-sm p-2 join-item"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn-outline max-w-sm p-2 join-item"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardComponent>
  );
};

export default ArticlePages;
