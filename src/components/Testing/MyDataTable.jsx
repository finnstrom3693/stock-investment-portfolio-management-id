import React, {useState} from "react";
import DataTable from "react-data-table-component";

function MyDataTable(){
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Age',
      selector: row => row.age,
      sortable: true
    }
  ];
  const data = [
    {
      id:1,
      name:"faizal",
      email:"faizalnf1800@gmail.com",
      age:"26"
    },
    {
      id:2,
      name:"finn",
      email:"sfinn3693@gmail.com",
      age:"26"
    },
    {
      id:3,
      name:"rhamsol",
      email:"rahmatsoleh69@gmail.com",
      age:"26"
    },
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(event){
    const newData = data.filter(row =>{
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  return(
    <div className="container mt-5 bg-light py-2 px-2 rounded">
      <div className="d-flex justify-content-between align-items-center my-2">
        <div className="ms-3 text-uppercase fw-bold">Mencoba</div>
        <div className="text-end"><input type="text" onChange={handleFilter} /></div>
      </div>
      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
      ></DataTable>
    </div>
  )
}

export default MyDataTable;