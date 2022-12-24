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




// class Simple extends ReactComponennt {
//     work(){
//         alert("Nice Work Environment")
//     }
//     render(){
//         return (
//             <button onClick={this.work}>Work Environment</button>
//         )
//     }
// }

import react from 'react';

class NameForm extends ReactComponent{

    constructor(props){
        super(props);
        this.state = {value: ""}
    }

    hanndleChange(event) {
        this.setState({value: event.target.value});
    }

    hanndleSubmit(event){
        alert("A Name was enterd: ", this.state.value);
        event.priventDefault();
    }

    render() {
        return (

            <form onSubmit={this.hanndleSubmit.bind(this)}>
                <label> Name: 
                <input 
                    type="text"
                    value={this.state.value}
                    onChange={this.hanndleChange.bind}
                />
                </label>
                <input type='submit' value="Submit" />
                

            </form>


        );
    }

}








// I have worked on many projects. And Odyssey is one of the most interesting projects I've had the pleasure of working on. Odyssey is a client-side web application used for project management and employee monitoring. They are designed and developed using React and Redux. In this project, we have two tenant users and one administrator. Administrators have full access to Odyssey. They can create and assign tasks to users and view details about users and tasks on the dashboard. And on the user's tenant, the user can select the assigned task and start a timer to monitor the working hours on a particular task. When the task is done, we need to stop the timer. When the timer goes off, the total work hours are stored in the database, and details about the work are on the user dashboard. We calculate daily working hours and show total hours worked on a project. And also track the status of any project assigned to us.


// I have worked on many projects. And Odyssey is one of the most interesting projects I've had the pleasure of working on. Odyssey is a client-side web application that is used for project management and employee monitoring. They are designed and developed using React and Redux. In this project, we have two tenant users and an admin. Admins have full access to odyssey they can create and assign tasks to the users and see the details about the user and tasks on the dashboard. And on the user's tenant, the user can select the assigned task and start the timer to monitor working hours on a particular task when the task is completed, we need to stop the timer when the timer is stopped, the total working hours are stored to the database and show the details about the task on the user dashboard.