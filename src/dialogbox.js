import React from 'react'
import { Modal, Button } from 'react-bootstrap'
//connecting to store
import { connect } from 'react-redux'
//importing actions
import { deleteEmployee } from './redux/action'

const DialogBox = (props) => {
  console.log(props)
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4>Delete the post ? </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onHide}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.deleteemployee(props.id)
              props.onHide()
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteemployee: (data) => dispatch(deleteEmployee(data)),
  }
}

export default connect(null, mapDispatchToProps)(DialogBox)
