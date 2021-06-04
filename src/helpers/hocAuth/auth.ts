// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
// import { auth } from '../../redux/actions/loginActions';
// import { useSelector, useDispatch } from 'react-redux';

// export default function (SpecificComponent: any, option: any, adminRoute = null) {
//   function AuthenticationCheck(props: any) {
//     let user = useSelector((state) => state.users.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
//       //To know my current status, send Auth request
//       dispatch(auth()).then((response: any) => {
//         //Not Loggined in Status
//         if (!response.payload.isAuth) {
//           if (option) {
//             props.history.push("/login");
//           }
//           //Loggined in Status
//         } else {
//           //supposed to be Admin page, but not admin person wants to go inside
//           if (adminRoute && !response.payload.isAdmin) {
//             props.history.push("/");
//           }
//           //Logged in Status, but Try to go into log in page

//           //Entrar a componentes que no se necesita entrar una vez que se esta logueado, ej, formulario login
//           else {
//             if (option === false) {
//               props.history.push("/");
//             }
//           }
//         }
//       });
//     }, []);

//     return <SpecificComponent { ...props } user = { user } />;
//   }
//   return AuthenticationCheck;
// }