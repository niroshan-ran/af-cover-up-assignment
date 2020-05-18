/*
* Created by : Ranasinghe I.N
* Registration Number : IT17164054
* Cover-up Assigment
*
* */

import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";


class DeleteBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }

    }

    deleteBlogPost(obj) {

        this.props.deleteFunction(obj);

    }

    handleClose = () => {
        this.setState({show: false})
    };
    handleShow = () => {
        this.setState({show: true})
    };

    render() {

        let index = this.props.indexNumber;
        let obj = this.props.blogPost;


        return (
            <>
                <Button variant="outline-danger" onClick={this.handleShow}>
                    <i className="fas fa-trash-alt"/>
                </Button>

                <Modal key={"M" + index} show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={() => {
                            this.setState({show: false}, () => {
                                this.deleteBlogPost(obj)
                            });
                        }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DeleteBlog;