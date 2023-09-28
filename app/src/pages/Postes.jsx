import React, { useContext, useEffect, useState } from "react";
import Navbar from "../constants/Navbar";
import { MyStore } from "../context/myStore";
import axios from "axios";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CardVideoPost from "../constants/card/CardVideoPost";
import CardImagePost from "../constants/card/CardImagePost";
import {ClipLoader} from 'react-spinners';
import SidebarLeft from "../constants/blogs/SidebarLeft";



const Postes = () => {
  const { myProfile, defaultImage, userId, token, setAdmin, admin,domaineURL } = useContext(MyStore);

  const { photo } = myProfile;

  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [dataPublic, setDataPublic] = useState([]);

  //configuration de lentete
  const Headers = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  //recuperer donne de administrateur
  useEffect(() => {
    axios
      .get(`${domaineURL}/profils/admin`, Headers)
      .then((res) => setAdmin(res.data))
      .catch((err) => console.log(err));
  }, []);

  const adm = admin[0];

  //configuration de lentete
  const Header = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  //envoyer notification pour poste de video
  const sendNotifyVideo = () => {
    axios
      .post(`${domaineURL}/notifications`, {
        adminId: adm?.userId,
        senderId: userId,
        type: "newVideo",
        description: "a poster une nouvelle video",
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  //envoyer notification pou poste image
  const sendNotifyImg = () => {
    axios
      .post(`${domaineURL}/notifications`, {
        adminId: adm?.userId,
        senderId: userId,
        type: "newVideo",
        description: "a poster une nouvelle photo",
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  //post video
  const [videoFile, setVideoFile] = useState({
    userId: "",
    filePath: null,
    description: "",
  });

  const handleChangeVideo = (e) => {
    const { name, value } = e.target;
    setVideoFile({ ...videoFile, [name]: value });
  };

  const handleChangeFileVideo = (e) => {
    const file = e.target.files[0];
    setVideoFile({ ...videoFile, filePath: file });
  };

  const sendVideos = (e) => {
    e.preventDefault();
    if (videoFile) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("filePath", videoFile.filePath);
      formData.append("description", videoFile.description);
      console.log(formData);
      axios
        .post(`${domaineURL}/videos`, formData, Header)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setVideoFile({
        userId: "",
        filePath: null,
        description: "",
      });
      sendNotifyVideo();
    } else {
      console.log("donnees vide");
    }
  };

  //post images
  const [imagesFile, setImagesFile] = useState({
    userId: "",
    photo: null,
    description: "",
  });

  const handleChangeImage = (e) => {
    const { name, value } = e.target;
    setImagesFile({ ...imagesFile, [name]: value });
  };

  const handleChangeFileImage = (e) => {
    const file = e.target.files[0];
    setImagesFile({ ...imagesFile, photo: file });
  };

  const sendImages = (e) => {
    e.preventDefault();
    if (videoFile) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("photo", imagesFile.photo);
      formData.append("description", imagesFile.description);
      console.log(formData);
      axios
        .post(`${domaineURL}/images`, formData, Header)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setImagesFile({
        userId: "",
        photo: null,
        description: "",
      });
      sendNotifyImg();
    } else {
      console.log("donnees vide");
    }
  };

  //recuperer les videos
  useEffect(() => {
    axios
      .get(`${domaineURL}/videos`, Headers)
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err));
  }, []);

  //recuperer les images
  useEffect(() => {
    axios
      .get(`${domaineURL}/images`, Headers)
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  //condition d'affichage des champ de post video et image
  const [viewVideoPost, setViewVideoPost] = useState(false);
  const [viewPhotoPost, setViewPhotoPost] = useState(false);

  //fusionner les videos et les images dans un seul tableau
  useEffect(() => {
    const newArray = [...images, ...videos];
    setDataPublic(newArray);
  }, [videos, images]);

  const handleViewVideo =()=>{
    setViewVideoPost(!viewVideoPost)
    
  }
  
  const handleViewImage =()=>{
   
    setViewPhotoPost(!viewPhotoPost)
  }
  //trier les donnees par ordre recents 
   const data = dataPublic.sort((a, b) => new Date(b.createdAt)-new Date(a.createdAt))
   
  //spinner
  const [loading,setloading]=useState(false)

useEffect(()=>{
  setloading(true)
  setTimeout(()=>{
    setloading(false)
  },1000)
},[])

// const [content, setContent] = useState([]); // État pour stocker le contenu
// const [load, setLoad] = useState(false);

// const loadMoreContent = () => {
//   // Effectuez une requête AJAX ou une action pour obtenir plus de contenu
//   // Ajoutez le contenu au tableau content
//   setLoad(true);
//   setTimeout(() => {
//     // Exemple : ajout de contenu factice pour l'illustration
//     const newContent = Array.from({ length: 5 }, (_, index) => (
//       <div key={dataPublic.length + index}>Contenu {dataPublic.length + index}</div>
//     ));
//     setDataPublic((prevContent) => [...prevContent, ...newContent]);
//     setLoad(false);
//   }, 1000);
// };

// useEffect(() => {
//   // Ajoutez un gestionnaire d'événement pour le défilement de la fenêtre
//   const handleScroll = () => {
//     if (
//       window.innerHeight + window.scrollY >=
//       document.documentElement.scrollHeight - 100
//     ) {
//       // Si l'utilisateur fait défiler jusqu'en bas de la page, chargez plus de contenu
//       loadMoreContent();
//     }
//   };

//   window.addEventListener('scroll', handleScroll);

//   return () => {
//     // Nettoyez le gestionnaire d'événements lorsque le composant est démonté
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, []);

  return (
    <>
      <Navbar />
      {
        loading ? <div className='clip-card'>
                     <ClipLoader  />
                     <p>Chargement  en  cours...</p>
                   </div> 
                :
        <div className="postes-conta">      
        <main className="postes">
        <div>
          <div className="container-postes">
            <img
              className="img-poste"
              src={myProfile ? photo : defaultImage}
              alt=""
            />
            <div>
            <p>Exposez vos travaux pour les visiteurs</p>
            </div>
          </div>
          <div className="post-videos">
            <div className="video-image">
              <VideoCameraFrontIcon
                className="icon-video"
                onClick={handleViewVideo}
              />
              <span>Videos /</span>
              <PermMediaIcon
                className="icon-image"
                onClick={handleViewImage}
              />
              <span>Photos</span>
            </div>

            {viewVideoPost && (
              <form className="form-post-videos">
                <input
                  className="champ-text-video"
                  type="text"
                  name="description"
                  value={videoFile.description}
                  onChange={handleChangeVideo}
                  placeholder="Description...."
                />
                <div>
                  <label htmlFor="fieldVideo">
                    <VideoCallIcon className="icon-v" /> Videos
                  </label>
                  <input
                    className="video-input"
                    id="fieldVideo"
                    type="file"
                    name="filePath"
                    accept="videos/*"
                    onChange={handleChangeFileVideo}
                  />
                </div>
                <button className="post-video" onClick={sendVideos}>
                  Poster la video
                </button>
              </form>
            )}

            {viewPhotoPost && (
              <form className="form-post-videos">
                <input
                  className="champ-image-text"
                  type="text"
                  name="description"
                  value={imagesFile.description}
                  onChange={handleChangeImage}
                  placeholder="Description...."
                />
                <div>
                  <label htmlFor="fieldImage">
                    <AddAPhotoIcon className="icon-i" /> Photos
                  </label>
                  <input
                    className="champ-images"
                    id="fieldImage"
                    type="file"
                    name="filePath"
                    accept="images/*"
                    onChange={handleChangeFileImage}
                  />
                </div>
                <button onClick={sendImages} className="post-images">
                  Poster la photo
                </button>
              </form>
            )}
          </div>
        </div>
        <div>
          {data
            .map((item) =>
              item.type === "video" ? (
                <CardVideoPost video={item} key={item._id} />
                
              ) : (
                <CardImagePost image={item} key={item._id} />
              )
              
            )}
            
        </div>
      </main>
      <div className="side">
      <SidebarLeft/>
      </div>
      </div>
     }
     
    </>
  );
};

export default Postes;
