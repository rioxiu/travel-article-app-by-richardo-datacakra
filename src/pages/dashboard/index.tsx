import React, { FormEvent, Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import DashboardComponent from "../../components/dashboardComponnent";
import { checkAuth } from "../../middleware";
import { getUserAction, setUser } from "../../redux/reducer/authLoginReducer";
import { useNavigate } from "react-router-dom";
import CommentsChart from "../../components/chart";

const Dashboard = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  console.log("aku cek", isLogin);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser({ isLogin: Cookies.get("jwt") }));
  }, [dispatch]);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/comments",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${Cookies.get("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        // Proses data
        const countComments = data.data.reduce(
          (acc: { [x: string]: number }, comment: { documentId: any }) => {
            const { documentId } = comment;
            if (!acc[documentId]) {
              acc[documentId] = 0;
            }
            acc[documentId]++;
            return acc;
          },
          {}
        );

        const chartData = Object.entries(countComments).map(
          ([documentId, count]) => ({
            documentId,
            count,
          })
        );

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchCommentsData();
  }, []);

  return (
    <DashboardComponent>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="text-4xl font-semibold">Dashboard Komentar</h1>
        {chartData.length > 0 ? (
          <CommentsChart data={chartData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </DashboardComponent>
  );
};

export default Dashboard;
