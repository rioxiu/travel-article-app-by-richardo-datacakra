import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardComponent from "../../../components/dashboardComponnent";
import Cookies from "js-cookie";
import CommentSection from "../../../components/comment";
const DetailArticlePages = () => {
  const { id } = useParams();
  const [article, setArticle] = React.useState(null);
  const [islLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = useCallback(async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/articles/${id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.data);
      setArticle(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setArticle]);

  return (
    <DashboardComponent>
      <main className="flex justify-center items-center">
        {islLoading ? (
          <div className="loader">
            <span className="loading loading-dots loading-xs"></span>
            <span className="loading loading-dots loading-sm"></span>
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-lg"></span>
          </div> // Indikator loading
        ) : (
          article && (
            <div className="card shadow-xl mx-auto max-w-3xl text-white mt-10 p-10">
              <h2 className="text-2xl font-semibold my-4">{article.title}</h2>
              <figure>
                <img
                  className="w-fit rounded-xl"
                  src={article.cover_image_url}
                  alt={article.title}
                />
              </figure>
              <div className="card-body flex flex-col">
                <p>{article.description}</p>
              </div>
              <div className="max-w-5xl">
                <CommentSection documentId={id} />
              </div>
            </div>
          )
        )}
      </main>
    </DashboardComponent>
  );
};

export default DetailArticlePages;
