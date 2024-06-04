// ======================================================================================== [Import Libaray]
import React, { useEffect, useState } from 'react';
// Redux
import { useDispatch } from "react-redux";
import { setBackDrop } from "../store";
// ======================================================================================== [Import Material UI Libaray]
// N/A

// ======================================================================================== [Import Project JS]
// Auth
import authPermissionCheck from '../Auth/authPermissionCheck'

//Nav
import navCompList from '../Nav/navCompList';
// Nav - RedirectPage
import PermissionDenied from '../Redirect/RedirectPermissionDenied'

// ======================================================================================== [Import CSS]
// N/A

function AuthDynRoute({ menuCD, comp }) {
  // Redux
  let dispatch = useDispatch()

  const [permission, setPermission] = useState(true);

  const checkPermission = async () => {
    dispatch(setBackDrop(true))
    try {
      setPermission(await authPermissionCheck(menuCD));
    } catch (error) {
      console.log("ERROR OCCUR \n\n")
      console.log(error)
      setPermission(false);
    }
    dispatch(setBackDrop(false))
  };

  useEffect(() => {
    checkPermission();
  }, [menuCD]);

  if (permission) {
    return navCompList[comp];
  } else {
    return <PermissionDenied />;
  }
};

export default AuthDynRoute;