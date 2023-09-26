import React, { useContext, useEffect, useState } from "react";
import { MyStore } from "../../context/myStore";
import axios from "axios";
import { useNavigate } from "react-router";

const Videos = () => {
  const navigate = useNavigate();
  const { userId, domaineURL } = useContext(MyStore);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${domaineURL}/videos/user/${userId}`)
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="videos">
      {videos.map((video) => (
        <div onClick={() => navigate(`/postes/${video._id}/video`)}>
          <video controls autoPlay>
            <source src={video.filePath} />
          </video>
        </div>
      ))}
    </div>
  );
};

export default Videos;
