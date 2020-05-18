/*
* Created by : Ranasinghe I.N
* Registration Number : IT17164054
* Cover-up Assigment
*
* */


import React, {Component} from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import {Button, Form, Card, FormControl} from "react-bootstrap";
import DeleteBlog from "./Components/DeleteBlog";
import EditBlog from "./Components/EditBlog";
import $ from "jquery"

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blogPostList: [],
            blog: {
                title: '',
                post: '',
                author: '',
                createdOn: new Date()
            }
        }


        this.createForm = this.createForm.bind(this);
        this.createTable = this.createTable.bind(this);
        EditBlog.bind(this);
        DeleteBlog.bind(this);
    }


    createBlog(event) {
        event.preventDefault();

        let newList = this.state.blogPostList;

        newList.push(this.state.blog);

        newList.sort((a, b) => {

            return b.createdOn - a.createdOn;

        });

        this.setState({
            blogPostList: newList
        }, () => {
            this.setState({
                blog: {
                    title: '',
                    post: '',
                    author: '',
                    createdOn: new Date()
                }
            }, () => {
                $('#blogBody').val('');
                $('#blogAuthor').val('');
                $('#blogTitle').val('').focus();
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                alert("Blog Post Created SuccessFully!!!");
            })
        });


    }


    editBlog = (oldObj, newObj) => {

        let updatedList = this.state.blogPostList;

        let index = updatedList.indexOf(oldObj);


        if (index !== -1) {

            updatedList[index] = newObj;

            updatedList.sort((a, b) => {

                return b.createdOn - a.createdOn;

            });


            this.setState({
                blogPostList: updatedList
            }, () => {
                $('#blogTitle').focus();
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                alert("Blog Post Edited Successfully!!!");

            });
        }


    }

    deleteBlog = (obj) => {

        let updatedList = this.state.blogPostList;

        let index = updatedList.indexOf(obj);

        if (index !== -1) {
            updatedList.splice(index, 1);

            updatedList.sort((a, b) => {

                return b.createdOn - a.createdOn;

            });

            this.setState({
                blogPosts: updatedList
            }, () => {
                $('#blogTitle').focus();
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                alert("Blog Post Deleted Successfully!!!");
            });
        }


    }


    onChange(event) {

        switch (event.target.id) {
            case 'blogTitle':
                this.setState({
                    blog: {
                        title: event.target.value,
                        post: this.state.blog.post,
                        author: this.state.blog.author,
                        createdOn: new Date()
                    }
                }, () => {

                })
                break;
            case 'blogBody':
                this.setState({
                    blog: {
                        title: this.state.blog.title,
                        post: event.target.value,
                        author: this.state.blog.author,
                        createdOn: new Date()
                    }
                }, () => {

                })
                break;
            case 'blogAuthor':
                this.setState({
                    blog: {
                        title: this.state.blog.title,
                        post: this.state.blog.post,
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

    createForm() {
        return (
            <div>
                <Container>
                    <Card className="justify-content-sm-center w-auto">

                        <Card.Body>

                            <Form onSubmit={event => this.createBlog(event)}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Title" id="blogTitle"
                                                  onChange={event => this.onChange(event)} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Body</Form.Label>
                                    <FormControl as="textarea" placeholder="Enter the Message Here..." id="blogBody"
                                                 onChange={event => this.onChange(event)} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Author Name" id="blogAuthor"
                                                  onChange={event => this.onChange(event)} required/>
                                </Form.Group>
                                <Button variant="primary" type="submit" block>
                                    Post
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>


                </Container>


            </div>
        );
    }

    createTable() {
        let data = this.state.blogPostList;

        return data.map((blog, index) => (
            <div key={"D" + index}>
                <Container>
                    <Card className="justify-content-sm-center w-auto">
                        <Card.Header as="h5">{blog.title}</Card.Header>
                        <Card.Body>

                            <Card.Text>{blog.post}</Card.Text>

                            <div className="float-right">
                                <table>
                                    <tr>
                                        <td>
                                            <EditBlog indexNumber={index} editFunction={this.editBlog} blogPost={blog}/>
                                        </td>
                                        <td>
                                            <DeleteBlog indexNumber={index} deleteFunction={this.deleteBlog} blogPost={blog}/>
                                        </td>
                                    </tr>
                                </table>

                            </div>


                        </Card.Body>
                        <Card.Footer
                            className="text-muted">
                            Author&nbsp;:&nbsp;{blog.author}
                            <div className="float-right">
                                Created&nbsp;on&nbsp;{
                                blog.createdOn.getDate() + "/"
                                + (blog.createdOn.getMonth() + 1) + "/"
                                + blog.createdOn.getFullYear() + " @ "
                                + blog.createdOn.getHours() + ":"
                                + blog.createdOn.getMinutes() + ":"
                                + blog.createdOn.getSeconds()
                            }
                            </div>
                        </Card.Footer>
                    </Card>
                </Container>
                <hr/>
            </div>
        ));
    }


    render() {
        return (
            <div>
                <h1 className="text-center">Welcome to the Blog</h1>
                <div>
                    {this.createForm()}
                    <hr/>
                    {this.createTable()}
                </div>

            </div>
        );
    }


}

export default App;
