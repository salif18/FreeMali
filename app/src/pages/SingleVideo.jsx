import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { MyStore } from "../context/myStore";
import SinglepostCommentV from "../constants/card/SinglepostCommentV";

const SingleVideo = () => {
  const { userId,domaineURL } = useContext(MyStore);
  const { id } = useParams();


  const [video, setVideo] = useState({});
 

  

  //recuperer video
  useEffect(() => {
    axios
      .get(`${domaineURL}/videos/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //click pour donner un like
  const handleLike = () => {
    axios
      .post(
        `${domaineURL}/videos/${video._id}/notations`,
        {
          userId: userId,
          likes: 1,
        },
        
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  //click pour anuuler son jaime
  const handleAnnuler = () => {
    axios
      .post(`${domaineURL}/videos/${video._id}/notations`, {
        userId: userId,
        likes: 0,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };


  const { description, filePath, createdAt, commentaires, likes } = video;


      return (
      <div className="videos-single" key={video._id}>
        <div className="co">
        <video controls autoPlay>
          <source type="video/mp4" src={filePath && filePath} />
        </video>

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
      {
        commentaires &&
              commentaires.map((commit) => (
                <SinglepostCommentV commit={commit} key={commit._id} objectId={video._id} />
              ))
              }
    </div>

      </div>
    );
  }


export default SingleVideo;
