/*
* Created by : Ranasinghe I.N
* Registration Number : IT17164054
* Cover-up Assigment
*
* */

import React, {Component} from "react";
import {Button, Form, FormControl, Modal} from "react-bootstrap";


class EditBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            blogNew: {
                title: '',
                post: '',
                author: '',
                createdOn: new Date()
            }
        }

    }

    componentWillReceiveProps(nextProps, nextContexts) {
        this.setState({ blogNew: nextProps.blogPost });
    }



    onChangeEdit(event, index) {

        switch (event.target.id) {
            case 'blogTitleV'+index:
                this.setState({
                    blogNew: {
                        title: event.target.value,
                        post: this.state.blogNew.post,
                        author: this.state.blogNew.author,
                        createdOn: new Date()
                    }
                }, () => {
                })
                break;
            case 'blogBodyV'+index:
                this.setState({
                    blogNew: {
                        title: this.state.blogNew.title,
                        post: event.target.value,
                        author: this.state.blogNew.author,
                        createdOn: new Date()
                    }
                }, () => {
                })
                break;
            case 'blogAuthorV'+index:
                this.setState({
                    blogNew: {
                        title: this.state.blogNew.title,
                        post: this.state.blogNew.post,
                        author: event.target.value,
                        createdOn: new Date()
                    }
                }, () => {
                })
                break;
            default:
                break;
        }

    }

    editBlogPost(oldObj, newObj) {

        this.props.editFunction(oldObj, newObj);

    }

    handleClose = () => {
        this.setState({show: false, blogNew: this.props.blogPost})
    };
    handleShow = () => {
        this.setState({show: true})
    };

    render() {

        let index = this.props.indexNumber;



        return (
            <>
                <Button block variant="outline-info" onClick={this.handleShow}>
                    <i className="fas fa-edit"/>
                </Button>

                <Modal key={"E" + index} show={this.state.show} onHide={this.handleClose}>
                    <Form onSubmit={ (event) => {

                        event.preventDefault();

                        this.setState({show: false}, () => {
                            this.editBlogPost(this.props.blogPost, this.state.blogNew);
                        });
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title" id={"blogTitleV"+index}
                                              onChange={event => this.onChangeEdit(event, index)} required value={this.state.blogNew.title}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Body</Form.Label>
                                <FormControl as="textarea" placeholder="Enter the Message Here..." id={"blogBodyV"+index}
                                             onChange={event => this.onChangeEdit(event, index)} required value={this.state.blogNew.post}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" placeholder="Enter Author Name" id={"blogAuthorV"+index}
                                              onChange={event => this.onChangeEdit(event, index)} required value={this.state.blogNew.author}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default EditBlog;