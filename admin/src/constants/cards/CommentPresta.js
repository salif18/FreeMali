import React, { useContext } from 'react';
import { MyStore } from '../../context/myStore';

const CommentPresta = ({item}) => {
    const {defaultImage, users} =useContext(MyStore);
    const auteur = users.filter((user) => user._id === item.userId);
    const auteurImg = auteur[0]
    return (
        <div>
        <div className="com">
        <img
          className="comment-img"
          src={auteurImg? auteurImg.profile.photo :defaultImage}
          alt=""
        />
        <div
          style={{
           
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <p style={{ fontWeight: 600 }}></p>
            <p className='comments'>{item.comments}</p>
           
            
           
        </div>
      </div>
        </div>
    );
}

export default CommentPresta;
