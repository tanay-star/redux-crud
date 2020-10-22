export const getEmployee = () => {
  return {
    type: 'GET_EMPLOYEE',
  }
}
export const addEmployee = (data) => {
  return {
    type: 'ADD_EMPLOYEE',
    payload: data,
  }
}
export const editEmployee = (data) => {
  return {
    type: 'EDIT_EMPLOYEE',
    payload: data,
  }
}
export const deleteEmployee = (employeeId) => {
  return {
    type: 'DELETE_EMPLOYEE',
    payload: employeeId,
  }
}
