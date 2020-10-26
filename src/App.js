import React from 'react'
import logo from './logo.svg'
import './App.css'
//importing components
import DialogBox from './dialogbox'
//connecting to redux
import { connect } from 'react-redux'
//importing actions
import {
  addEmployee,
  getEmployee,
  deleteEmployee,
  editEmployee,
} from './redux/action'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      employeeName: '',
      employeeDepartment: '',
      modalShow: false,
    }
  }
  componentDidMount() {
    this.props.getEmployee()
  }

  clearData = () => {
    this.setState({
      id: 0,
      employeeName: '',
      employeeDepartment: '',
    })
  }

  handleNameChange = (e) => {
    this.setState({
      employeeName: e.target.value,
    })
  }

  handleDepartmentChange = (e) => {
    this.setState({
      employeeDepartment: e.target.value,
    })
  }

  editDetails = (data) => {
    this.setState({
      id: data.id,
      employeeName: data.employeeName,
      employeeDepartment: data.employeeDepartment,
    })
  }

  deleteEmployee = (id) => {
    this.clearData()
    this.setState({ modalShow: true })
    this.props.deleteEmployee(id)
  }

  setConfirmOpen = (value) => {
    this.setState({ open: value })
  }

  submitData = () => {
    if (
      this.state.employeeName &&
      this.state.employeeDepartment &&
      !this.state.id
    ) {
      const newEmployee = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        employeeName: this.state.employeeName,
        employeeDepartment: this.state.employeeDepartment,
      }

      this.props.addEmployee(newEmployee)
    } else if (
      this.state.employeeName &&
      this.state.employeeDepartment &&
      this.state.id
    ) {
      const updatedDetails = {
        id: this.state.id,
        employeeName: this.state.employeeName,
        employeeDepartment: this.state.employeeDepartment,
      }

      this.props.editEmployee(updatedDetails)
    } else {
      alert('Enter Employee Details.')
    }

    this.clearData()
  }

  render() {
    let modalClose = () => {
      this.setState({ modalShow: false })
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRUD opeartions for Employee Module</h1>
        </header>
        <p className="App-intro">
          <div className="leftsection">
            Employee Name :{' '}
            <input
              onChange={this.handleNameChange}
              value={this.state.employeeName}
              type="text"
              placeholder="Employee Name"
            />{' '}
            <br />
            Employee Department :{' '}
            <input
              onChange={this.handleDepartmentChange}
              value={this.state.employeeDepartment}
              type="text"
              placeholder="Employee Department"
            />
            <br />
            {this.state.id ? (
              <button onClick={this.submitData}>UPDATE</button>
            ) : (
              <button onClick={this.submitData}>ADD</button>
            )}{' '}
            <button onClick={this.clearData}>CLEAR</button>
          </div>
          <div className="rightsection">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Depatment Name</th>
                  <th>Action(s)</th>
                </tr>
              </thead>
              <tbody>
                {this.props.employees &&
                  this.props.employees.map((data, index) => {
                    return (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{data.employeeName}</td>
                        <td>{data.employeeDepartment}</td>
                        <td>
                          <button onClick={() => this.editDetails(data)}>
                            EDIT
                          </button>{' '}
                          <button onClick={() => this.deleteEmployee(data.id)}>
                            DELETE
                          </button>{' '}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            <DialogBox show={this.state.modalShow} onHide={modalClose} />
          </div>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployee: () => dispatch(getEmployee()),
    addEmployee: (data) => dispatch(addEmployee(data)),
    editEmployee: (data) => dispatch(editEmployee(data)),
    deleteEmployee: (data) => dispatch(deleteEmployee(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
