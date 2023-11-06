import { useState,useEffect } from "react"

const useTableData = (setFilteredTableData) =>{
    const [tableData,setTableData] = useState([])
    const backend_url = process.env.REACT_APP_BACKEND_URI;

    const fetchUsers = async () =>{
      const data = await fetch(`${backend_url}api/auth/get-all`,{
        headers:{
          'Authorization':localStorage.getItem('token')
        }
    })
      const res = await data.json()
      console.log(res.users)
      setTableData(res.users)
      setFilteredTableData(res.users)
    }
    useEffect(()=>{
        fetchUsers()
    },[])
    return tableData
}

export default useTableData