// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'
// N/A

// ======================================================================================== [Import Material UI Libaray]
// N/A

// ======================================================================================== [Import Component] js
// N/A

// ======================================================================================== [Import Component] CSS
// N/A

const TableActionColumn = (actions) => {
    return (
        {
            id: "ACTION",
            size: 80, // TanStack Table은 컬럼 사이즈가 20이 최소
            header: { kor: '액션', eng: 'Action' },
            cell: ({ row }) => (
                <div>
                    {
                        actions.map((action, index)=> action (row.original))
                    }
                </div>
            )

        }
    )
}

export default TableActionColumn;