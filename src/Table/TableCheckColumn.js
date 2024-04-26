import { useEffect, useRef } from 'react';

function IndeterminateCheckbox({ indeterminate, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
}

const TableCheckColumn = { // row selection 할꺼면
  id: "SELECT",
  size: 20, // TanStack Table은 컬럼 사이즈가 20이 최소
  header: ({ table }) => (
      <IndeterminateCheckbox
          {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
          }}
      />
  ),
  cell: ({ row }) => (
      <IndeterminateCheckbox
          {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
          }}
      />
  ),
}

export default TableCheckColumn;