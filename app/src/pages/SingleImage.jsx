import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { MyStore } from "../context/myStore";
import SinglePostCommentIm from "../constants/card/SinglePostCommentIm";

const SingleImage = () => {
    const { userId ,domaineURL} = useContext(MyStore);
    const { id } = useParams();
  
    const [image, setImage] = useState({});
    
  
    //recuperer image
    useEffect(() => {
      axios
        .get(`${domaineURL}/images/${id}`)
        .then((res) => {
          setImage(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
  
  
    //click pour donner un like
    const handleLike = () => {
      axios
        .post(
          `${domaineURL}/images/${image._id}/notations`,
          {
            userId: userId,
            likes: 1,
          }
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));
    };
  
    //click pour anuuler son jaime
    const handleAnnuler = () => {
      axios
        .post(`${domaineURL}/images/${image._id}/notations`, {
          userId: userId,
          likes: 0,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
    };

    const { description, photo, createdAt, commentaires, likes } = image;

  
        return (
        <div className="images-single" key={image._id}>

       <div className="co">
          <img className="img" src={photo && photo} alt='' />
       

        <div className="actions">
          <p>
            <ThumbUpIcon onClick={handleLike} />
            <span>{likes && likes}</span> <ThumbDownIcon onClick={handleAnnuler} />
          </p>
          <p >
            <ChatBubbleOutlineIcon /> <span>commenter</span>{" "}
            {commentaires && commentaires.length}
          </p>
        </div>
        </div>
         {/*zone affichage des commentaire*/}
      <div className="zone-commentaire">
      {commentaires &&
              commentaires.map((commit) => (
                <SinglePostCommentIm commit={commit} key={commit._id} objectId={image._id} />
              ))
      }
    </div>

      </div>
    );
}

export default SingleImage;
