import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
//importing actions
import {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from './redux/action'
//connecting to redux store
import { connect } from 'react-redux'
//importing components
import DialogBox from './dialogbox'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      employeeName: '',
      employeeDepartment: '',
      modalShow: false,
      empId: 0,
      employeeNameError: '',
      employeeDepartmentError: '',
    }
  }

  componentDidMount() {
    this.props.getEmployee()
  }

  validate = () => {
    let employeeNameError = ''
    let employeeDepartmentError = ''

    if (this.state.employeeName === '') {
      employeeNameError = 'Name is required'
    }
    if (this.state.employeeDepartment === '') {
      employeeDepartmentError = 'Department is required'
    }
    if (employeeNameError) {
      this.setState({ employeeNameError: employeeNameError })
    }
    if (employeeDepartmentError) {
      this.setState({ employeeDepartmentError: employeeDepartmentError })
    }
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
      this.clearData()
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
      this.clearData()
    } else {
      this.validate()
    }

    // this.clearData()
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
    if (window.confirm('Are you sure?')) {
      this.props.deleteEmployee(id)
    }
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

  clearData = () => {
    this.setState({
      id: 0,
      employeeName: '',
      employeeDepartment: '',
      employeeNameError: '',
      employeeDepartmentError: '',
    })
  }

  deleteButtonClick = (id) => {
    this.setState({ modalShow: true })
    this.setState({ empId: id })
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
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.employeeNameError}
            </div>
            <br />
            Employee Department :{' '}
            <input
              onChange={this.handleDepartmentChange}
              value={this.state.employeeDepartment}
              type="text"
              placeholder="Employee Department"
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.employeeDepartmentError}
            </div>
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
                    console.log(data)

                    return (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{data.employeeName}</td>
                        <td>{data.employeeDepartment}</td>
                        <td>
                          <button onClick={() => this.editDetails(data)}>
                            EDIT
                          </button>{' '}
                          <button
                            onClick={() => this.deleteButtonClick(data.id)}
                          >
                            DELETE
                          </button>{' '}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            <DialogBox
              show={this.state.modalShow}
              onHide={modalClose}
              id={this.state.empId}
            />
          </div>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees,
})

export default connect(mapStateToProps, {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
})(App)
