//importation
const Profile = require("../models/collectionProfile");

// likes
// exports.usersNotations = (req, res, next) => {
//   const { userId, likes } = req.body;
//   const { id } = req.params;
//   console.log(userId, likes, id);
//   Profile.findOne({ userId: id })
//     .then((like) => {
//       if (!like.usersLikes.includes(userId) && likes === 1) {
//         Profile.updateOne(
//           { userId: id },
//           {
//             $inc: { likes: +1 },
//             $push: { usersLikes: userId },
//           }
//         )
//           .then(() => res.status(201).json({ msg: "plus 1 likes" }))
//           .catch((err) => res.status(400).json({ err }));
//       }

//       if (like.usersLikes.includes(userId) && likes === 0) {
//         Profile.updateOne(
//           { userId: id },
//           {
//             $inc: { likes: -1 },
//             $pull: { usersLikes: userId },
//           }
//         )
//           .then(() => res.status(201).json({ msg: "moins 1 like" }))
//           .catch((err) => res.status(400).json({ err }));
//       }

//       //  dislikes

//       if (!like.usersDisLikes.includes(userId) && likes === -1) {
//         Profile.updateOne(
//           { userId: id },
//           {
//             $inc: { disLikes: +1 },
//             $push: { usersDisLikes: userId },
//           }
//         )
//           .then(() => res.status(201).json({ msg: "plus 1 dislike " }))
//           .catch((err) => res.status(400).json({ err }));
//       }

//       if (like.usersDisLikes.includes(userId) && likes === 0) {
//         Profile.updateOne(
//           { userId: id },
//           {
//             $inc: { disLikes: -1 },
//             $pull: { usersDisLikes: userId },
//           }
//         )
//           .then(() => res.status(201).json({ msg: "moins 1 dislike " }))
//           .catch((err) => res.status(400).json({ err }));
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404).json({ err });
//     });
// };

exports.usersNotations = (req, res, next) => {
  const { userId, likes } = req.body;
  const { id } = req.params;
  

  Profile.findOne({ userId: id })
    .then((like) => {
      if (!like) {
        return res.status(404).json({ msg: "Profil non trouvé" });
      }

      let updateData = {};

      if (!like.usersLikes.includes(userId) && likes === 1) {
        updateData = {
          $inc: { likes: +1 },
          $push: { usersLikes: userId },
        };
      } else if (like.usersLikes.includes(userId) && likes === 0) {
        updateData = {
          $inc: { likes: -1 },
          $pull: { usersLikes: userId },
        };
      }

      if (!like.usersDisLikes.includes(userId) && likes === -1) {
        updateData = {
          $inc: { disLikes: +1 },
          $push: { usersDisLikes: userId },
        };
      } else if (like.usersDisLikes.includes(userId) && likes === 0) {
        updateData = {
          $inc: { disLikes: -1 },
          $pull: { usersDisLikes: userId },
        };
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(200).json({ msg: "Aucun changement" });
      }

      Profile.updateOne({ userId: id }, updateData)
        .then(() => res.status(201).json({ msg: "Mise à jour réussie" }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err });
    });
};
