// ======================================================================================== [Import Libaray]
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// ======================================================================================== [Import Material UI Libaray]
import { IconButton  } from '@mui/material';
//icon
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

// ======================================================================================== [Import Component] js

// ======================================================================================== [Import Component] CSS

function ExcelDownButton({ data, muiColor, sheetName }) {
    const download = async () => {
        // workbook(엑셀 파일 하나를 구성하는 여러 시트로 이루어진 단위) 생성
        const workbook = new ExcelJS.Workbook();

        // sheet 생성
        const worksheet = workbook.addWorksheet(sheetName);

        // 컬럼명들이 담긴 배열이 필요함
        // 그런 배열이 이미 존재한다면 아래와 같이 columns를 직접 만들지 않아도 됨
        const columns = Object.keys(data[0]);

        // worksheet에 컬럼에 대한 정보를 줌
        // 맨 첫 번째 줄에 컬럼들이 삽입됨
        worksheet.columns = columns.map((column) => ({
            header: column, // 컬럼 이름
            key: column // data에서 컬럼의 값을 구분하기 위한 key
        }));

        // 두 번째 줄부터 데이터 행들을 한꺼번에 입력
        worksheet.insertRows(2, data);

        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월
        let date = today.getDate();  // 날짜
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes();  // 분
        let seconds = today.getSeconds();  // 초
        let milliseconds = today.getMilliseconds();
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `AVM_Downloader_${sheetName}_${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}.xlsx`);
    };

    return (
        <IconButton size="small" edge="end" color={muiColor} sx={{ ml: 0.5, mt: 0.5 }} onClick={() => download()}>
            <CloudDownloadIcon />
        </IconButton>
    )

}
export default ExcelDownButton;
