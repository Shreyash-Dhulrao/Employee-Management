import { createSlice } from "@reduxjs/toolkit";
import { addUser , Dashboard } from "../../firebase/Firebase";

const initialState = ({
    newArr : [],
    empId: null,
})

export const EmployeeCount = createSlice({
    name:"Employee",
    initialState,
    reducers:({
        addEmp: (state ,action)=>{
            addUser(action.payload)
        },
        checkEmp: (state , action)=>{
            state.empId = action.payload
        },
        newDashboard: (state, action)=>{
            Dashboard(action.payload)
            console.log(action.payload)
        }
    })
})

export const {addEmp , checkEmp , newDashboard} = EmployeeCount.actions

export default EmployeeCount.reducer