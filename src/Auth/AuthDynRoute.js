// ======================================================================================== [Import Libaray]
import React, { useEffect, useState } from 'react';

// ======================================================================================== [Import Material UI Libaray]
// N/A

// ======================================================================================== [Import Project JS]
// Auth
import authPermissionCheck from '../Auth/authPermissionCheck'

//Nav
import navCompList from '../Nav/navCompList';
// Nav - RedirectPage
import PermissionDenied from '../Rep/RepPermissionDenied'

// ======================================================================================== [Import CSS]
// N/A

function AuthDynRoute({ menuCD, comp }) {
  const [permission, setPermission] = useState(false);

  const checkPermission = async () => {
    try {
      setPermission(await authPermissionCheck(menuCD));
    } catch (error) {
      console.log("ERROR OCCUR \n\n")
      console.log(error)
      setPermission(false);
    }
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