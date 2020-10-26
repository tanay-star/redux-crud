import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DialogBox = (props) => {
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
          <Button variant="danger" onClick={props.onHide}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DialogBox
