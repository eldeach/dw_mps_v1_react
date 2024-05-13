// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
// N/A

// ======================================================================================== [Import Project JS]
// N/A

// ======================================================================================== [Import CSS]
// N/A

function envLangFinder(envData, LANG_CD) {
    var selectedRow = envData.find(function (oneRow) {
        return (oneRow.LANG_CD === `${LANG_CD}` && oneRow.REGION == `${cookies.load('cpv-site-lang')}`);
    });

    // 해당하는 값 추출
    var extractedValue = selectedRow ? selectedRow['VAL_STR'] : null;

    if (extractedValue !== null) {
        return extractedValue
    } else {
        return cookies.load('cpv-site-lang')
    }
}

export default envLangFinder;