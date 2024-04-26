// ======================================================================================== [Import Libaray]
import { flexRender } from "@tanstack/react-table";
import { useMemo, useState, useEffect, useRef } from "react";
import cookies from 'react-cookies'


// ======================================================================================== [Import Material UI Libaray]
import { IconButton } from '@mui/material';
//icon
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS

function TableHeader(props) {

    const { header, tbleWidth } = props;

    const [thWidth, setThWidth] = useState(null);

    useEffect(() => {
        if (tbleWidth) {
            console.log(tbleWidth)
            console.log(Math.round((tbleWidth-30) * (header.getSize() / 1590)))
            setThWidth(Math.round((tbleWidth-30) * (header.getSize() / 1590)))
            console.log(`table width size = ${tbleWidth}`)
        }
    }, [tbleWidth]);

    const sortedUniqueValues = useMemo(() => {
        let values = []
        header.id != "SELECT" ?
            values = Array.from(header.column.getFacetedUniqueValues().keys()).sort()
            : values = []
        return values;
    })

    const onFilterChange = (value) => {
        if (value === "null") {
            header.column.setFilterValue(null);
        } else {
            header.column.setFilterValue(value);
        }
    };

    const [filterOn, setFilterOn] = useState(false);
    const handleFilterToggle = function () {
        if (filterOn) {
            setOptionValue(null)
            setInputValue("")
            onFilterChange(null)
            setFilterOn(false)
        } else {
            setFilterOn(true)
        }
    }
    const [optionValue, setOptionValue] = useState(null)
    const [inputValue, setInputValue] = useState("")

    return (
        <th
            key={header.id}
            style={{
                minWidth: header.getSize(),
                width: thWidth,
                maxWidth: thWidth,
            }}
        >
            <div style={{ display: 'flex' }}>
                {
                    { asc: <ExpandLessIcon sx={{ fontSize: '20px', pb: 0.3, mr: 'auto' }} />, desc: <ExpandMoreIcon sx={{ fontSize: '20px', pb: 0.3, mr: 'auto' }} /> }[header.column.getIsSorted()]
                }
                {
                    header.column.getCanSort() && !header.column.getIsSorted() ? (<UnfoldMoreIcon sx={{ fontSize: '20px', pb: 0.3, mr: 'auto' }} />) : null
                }
                <div onClick={header.column.getToggleSortingHandler()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: header.column.getCanSort() ? "pointer" : "default", }} >
                    {
                        header.isPlaceholder ? null
                            : flexRender(
                                (header.column.columnDef.header[cookies.load('site-lang')] ? header.column.columnDef.header[cookies.load('site-lang')]
                                    : header.column.columnDef.header),
                                header.getContext()
                            )
                    }
                </div>
                {
                    header.id === "SELECT" ? null :
                        header.column.getCanFilter() ?
                            <IconButton size="small" edge="end" color='inherit' sx={{ ml: 'auto', mr: 0.4, p: 0 }} onClick={handleFilterToggle}>
                                {
                                    filterOn ? <FilterAltOffIcon sx={{ fontSize: '14px' }} /> :
                                        <FilterAltIcon sx={{ fontSize: '14px' }} />
                                }
                            </IconButton> : <div style={{ marginLeft: 'auto' }} />
                }
            </div>
            {
                header.column.getCanFilter() ? (
                    filterOn ?
                        <div style={{ marginLeft: '3px', marginRight: '3px', display: 'flex', flexDirection: 'column' }}>
                            <select value={optionValue} onChange={({ currentTarget: { value } }) => {
                                setOptionValue(value)
                                setInputValue(value)
                                onFilterChange(value)
                            }} >
                                <option value="null">
                                    {{
                                        kor: "선택 안 함",
                                        eng: "Not choosing"
                                    }[cookies.load('site-lang')]}
                                </option>
                                {
                                    sortedUniqueValues.map((value) => <option key={value}>{value}</option>)
                                }
                            </select>
                            <input value={inputValue} onChange={({ currentTarget: { value } }) => {
                                setOptionValue("null")
                                setInputValue(value)
                                onFilterChange(value)
                            }
                            } />
                        </div>
                        : null
                ) : null
            }
        </th>
    )
}

export default TableHeader;