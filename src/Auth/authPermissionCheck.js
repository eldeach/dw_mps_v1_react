// ======================================================================================== [Import Libaray]
import axios from 'axios';

// ======================================================================================== [Import Material UI Libaray]
// N/A

// ======================================================================================== [Import Component] js
// N/A

// ======================================================================================== [Import Component] CSS
// N/A

async function authPermissionCheck(MENU_CD) {
    let rs = await axios({
        method: "get",
        url: "/percheck",
        params: {
            MENU_CD: MENU_CD,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.status === 200 && res.data.msg === "PER_01") {
                return true;
            } else if (res.status === 200 && res.data.msg === "PER_02") {
                return false;
            } else {
                return false;
            }
        })
        .catch((error) => {
            console.log("ERROR OCCUR \n\n")
            console.log(error)
            return false;
        })
    return rs
}

export default authPermissionCheck