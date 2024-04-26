
import ChartControl from "../../Chart/ChartControl";
import { Typography } from '@mui/material';
import ChartHistogram from "../../Chart/ChartHistogram";

import dsHistogram from '../Data/dsHistogram'
import dsCtrlScatter from '../Data/dsCtrlScatter'

import { createColumnHelper } from "@tanstack/react-table";

import Table from '../../Table/Table'
import TableCheckColumn from '../../Table/TableCheckColumn'

import { useState, useRef, useEffect } from "react";
// import columnDef from '../ColumnDef/columnDef'



function SamplePage() {

    const [tableSelected, setTableSelected] = useState([]);

    return (
        <div className="sample-page">
            <ChartControl xbar={true} data={dsCtrlScatter} />
            <ChartHistogram data={dsHistogram} />
            <div>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </div>
            <button onClick={() => console.log(tableSelected)}>aa</button>
            <Table
                size={{
                    tableWidth: '96vw',
                    tblNumRow: 5
                }}
                reqParam={{
                    method: 'get',
                    url: '/cpvdata',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }}
                setTableSelected={setTableSelected}
                columns={columnDef}
            />
        </div>

    )
}

export default SamplePage;


const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    TableCheckColumn,
    columnHelper.accessor("SEQ",
        {
            header: 'SEQ',
            size: 70,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("PLANT_CD",
        {
            header: 'PLANT_CD',
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("EQPTID",
        {
            header: 'EQPTID',
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("TAGID",
        {
            header: 'TAGID',
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("TAGNM",
        {
            header: 'TAGNM',
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("BATCH",
        {
            header: 'BATCH',
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("VAL",
        {
            header: 'VAL',
            size: 100,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("SPEC_MAX",
        {
            header: 'SPEC_MAX',
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("SPEC_MIN",
        {
            header: 'SPEC_MIN',
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("UNIT",
        {
            header: 'UNIT',
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("RELDTTM",
        {
            header: 'RELDTTM',
            size: 120,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("INSDTTM",
        {
            header: 'INSDTTM',
            size: 100,
            enableColumnFilter: true,
        }
    ),
]