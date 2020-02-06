import React, {useState, useEffect} from 'react';
import { useSelector  } from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import ReactTimeAgo from 'react-time-ago'
import CommentItem from './CommentItem';

import './layout.css';
 

export default function Comments(props) {
    const [ comment, setComment] = useState('');
    const [ commentSize, setSize ] = useState('1');
    const [ commentList, setList ] = useState([]);
    const [ addedComment, addCom ] = useState(false);

    const currUser = useSelector(state => state.users.currentUser);
    const data = { init: {
        userName: currUser.name,
        userPic: currUser.img === undefined ? '' : currUser.img
    }};

    // Manage Comment text area
    //
    function commentUpdate(e) {
        // console.log("Comment Update", e.target.value);
        setComment(e.target.value);
        let val = Math.ceil(comment.length/35);
        setSize(val);
        // console.log('Get Row', val, comment.length);
    }
    // Submit Comment
    //
    function submitComment() {
        //console.log("Submit Comment", comment);
        data.operation = 'CREATE';
        data.init.message = comment;
        axios.put('/comments/' + props.itId, data).then(
            res => {
                //console.log('Update comment successful!', res);
                addCom(!addedComment);
            },
            error => {
                console.log('Update Comment failed...', error);
            }
        )
        setComment('');
        setSize(1);
    }
    const updateComment = (comment, message) => {
       // console.log("On Update Comment", comment);
       // console.log("With new message:", message);
       const data = {operation: 'UPDATE', id: comment._id, message: message }
       axios.put('/comments/'  + props.itId, data).then(
            res => {
                // console.log('Update comment successful!', res);
                addCom(!addedComment);
            },
            error => {
                console.log('Update Comment failed...', error);
            }
        )
    }

    const deleteComment = (comment) => {
        // console.log("On Delete Comment", comment);
        const data = {operation: 'DELETE', id: comment._id }
        axios.put('/comments/'  + props.itId, data).then(
            res => {
                // console.log('Delete comment successful!', res);
                addCom(!addedComment);
            },
            error => {
                console.log('Delete Comment failed...', error);
            }
        )
    }



    useEffect(() => {
        console.log('Comment Use Effect running...');

        axios.get('/comments/' + props.itId).then(
            comList => {
                comList.data.forEach(item => {
                    if (item.userPic.length === 0) {
                        item.userPic = require("../../assets/user-red-02.png");
                    }
                    // console.log("Comments Axios Response")
                })
                setList(comList.data);
                // console.log('Comment List', comList);
            },
            error => {
                console.log('Comment List Fetch error', error);
            }
        );
        //addCom(false);
    }, [props.itId, addedComment]);

    return (
        <div>
            <div className="row">
                <div className="col-11 pr-1">
                    <Form className="mt-2 w-100">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control 
                                as="textarea" 
                                size="sm" 
                                rows={ commentSize }
                                value={ comment }
                                onChange={ commentUpdate }
                                placeholder="Drop a comment..." />
                        </Form.Group>
                    </Form>
                </div>
                <div className="col-1 mt-2 p-0">
                    <button
                        onClick={  comment.length > 0 ? submitComment : null}
                        style={arrowBtnStyle}
                    >
                        <img style={imgCommentGo} src={require("../../assets/arrow-blue-r64.png")} alt="Comment Go" />
                    </button>
                </div>
            </div>
            {commentList.length > 0 ? commentList.map(( item, index ) => (
                <div className="toast-comment show fade" key={index}>
                    <div className="toast-comment-header">
                        <img src={item.userPic} className="rounded mr-2 img-comment" alt="" />
                        <strong className="mr-auto">{item.userName}</strong>
                        <small><ReactTimeAgo date={new Date(item.createdAt)} locale="en"/></small>
                    </div>
                    <CommentItem comment={item} onDelete={deleteComment} onUpdate={updateComment}></CommentItem>
                </div>

            )) : null}
        </div>

    )
}

const imgCommentGo = {
    width: '25px',
    height: '25px',
    overflow: 'hidden',
    backgroundColor: 'transparent'
}

const arrowBtnStyle = {
    width: '30px',
    height: '30px',
    background: 'transparent',
    border: 'none', //'1px solid grey',
    padding: '2px 2px',
    borderRadius: '20%',
    cursor: 'pointer',
  };
