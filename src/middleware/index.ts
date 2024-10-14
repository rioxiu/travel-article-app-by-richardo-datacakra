// // authMiddleware.ts
// import { Middleware } from "redux";
// import { initializeAuth } from ".././redux/reducer/authLoginReducer";
// import { setUser } from ".././redux/reducer/authLoginReducer"; // Jika Anda ingin mengatur user di sini
// import { useNavigate } from "react-router-dom";

// const authMiddleware: Middleware = store => next => action => {
//     if (action.type === initializeAuth.type) {
//         const jwt = localStorage.getItem("jwt");

//         if (!jwt) {
//             store.dispatch(initializeAuth());
//             // Redirect ke halaman sign-in
//             // Anda perlu menggunakan `useNavigate` dari React Router di komponen
//         } else {
//             store.dispatch(setUser({ /* Ambil informasi user dari JWT jika perlu */ }));
//         }
//     }
//     return next(action);
// };

// export default authMiddleware;
