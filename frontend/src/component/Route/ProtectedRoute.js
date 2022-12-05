// import React, { Fragment } from 'react'
// import { useSelector } from "react-redux";

// import { Navigate, redirect, Route, Routes, useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ element: Component, ...rest }) => {

//   const navigate = useNavigate()
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user)

//   return (
//     <Fragment>
//       {!loading && (
//         <Routes>
//           <Route
//             {...rest}
//             element={() => {
//               if (!isAuthenticated) {
//                 return <Navigate replace to="/login" />
//               }
//               return <Component />
//             }
//             }
//           />
//         </Routes>



//         // <Route 
//         //     {...rest}
//         //     render = {(props)=>{
//         //       if(isAuthenticated){
//         //         return  navigate("/login");
//         //       }
//         //         return <Component {...props} />
//         //       }
//         //     }
//         //     // render={(props) => {
//         //     //   if (!isAuthenticated) {
//         //     //     return navigate("/login");
//         //     //   }
//         //     //   return <Component {...props} />;
//         //     // }}
//         // />
//       )}
//     </Fragment>
//   )
// }

// export default ProtectedRoute;