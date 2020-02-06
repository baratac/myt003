import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';


import './layout.css';

export default function CommentItem(props) {
    const [ comment, setComment] = useState('');
    const [ edit, setEdit ] = useState(false);

  //
    // Comment List Event Handlers
    //
    
    function editMode () {
        //console.log("EDIT MODE");
        setEdit(true);
    }
    
    function lockMode () {

        //console.log("LOCK MODE");
        setEdit(false);
    }
    
    function messageUpdate (e) {

        //console.log('Lets update');
        setComment(e.target.value);
    }

    function updateComment() {
        props.onUpdate(props.comment, comment);
    }

    function deleteComment() {
        props.onDelete(props.comment);
    }

    useEffect(() => {
        //console.log('Comment Item Use Effect running...');
        setComment(props.comment.message);
        
    }, [props.comment]);

    return (
        <div className="toast-comment-body">
            <div className="text-left">
                <textarea 
                readOnly={!edit}
                value={ comment }
                className="form-control" 
                rows="2"
                onSelect={editMode}
                onBlur={lockMode}
                onChange={messageUpdate}
                id={props.comment._id}></textarea>  
            </div>
            <div className="small"> 
                <Button 
                  className="float-left" 
                  size="sm"
                  onClick={updateComment}
                  variant="link"
                >
                  Update
                </Button>
                <Button 
                    className="float-right" 
                    size="sm"
                    onClick={deleteComment}
                    variant="link"
                >
                  Delete
                </Button>
            </div>
        </div>
    )
}
