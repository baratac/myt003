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
                        item.userPic = require("../../assets/user-gray-01.png");
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
        <div className="relative w-full">
            <div className="flex flex-wrap justify-start items-center border border-green-400">
                <div className="w-11/12">
                    <label className="block">
                            <textarea 
                                className="form-textarea resize-none mt-1 block w-full" 
                                rows="3"
                                resize="none"
                                value={ comment }
                                onChange={ commentUpdate }
                                placeholder="Drop a comment..."></textarea>
                    </label>
                </div>
                <div className="w-1/12 -ml-2">
                    <button
                        onClick={  comment.length > 0 ? submitComment : null}
                        style={arrowBtnStyle}
                        className="align-self"
                    >
                        <img style={imgCommentGo} src={require("../../assets/arrow-blue-r64.png")} alt="Comment Go" />
                    </button>
                </div>
            </div>
            {commentList.length > 0 ? commentList.map(( item, index ) => (
                <div className="toast-comment show fade mt-2" key={index}>
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
