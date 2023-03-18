var User = require("../models/user");

exports.getOwnDetails = (req, res) => {
  // extracting data saved by isVerified middleware
  const data = req.root._doc;
  return res.status(200).json({
    name: data.name,
    adhaar: data.adhaar,
    email: data.email,
    phone: data.phone,
    addr: data.addr,
    dob: data.dob,
    bloodGrp: data.bloodGrp,
    medHist: data.medHist,
  });
};

exports.editOwnDetails = (req, res) => {
  const { name, email, phone, addr, dob, bloodGrp } = req.body;

  User.findById(req.root._doc._id)
    .then((user) => {
      // if field is not present in request body it is undefined
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      if (phone !== undefined) user.phone = phone;
      if (dob !== undefined) user.dob = dob;
      if (bloodGrp !== undefined) user.bloodGrp = bloodGrp;
      if (addr !== undefined) user.addr = addr;

      user
        .save()
        .then((updatedUser) => {
          return res.status(200).json({ msg: "User Updated!", success: true });
        })
        .catch((err) => {
          return res.status(502).json({ error: err, success: false });
        });
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};
// getting medical history by a doctor
exports.getMedicalHistory = (req, res) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found!", success: false });
    } else {
      return res.status(200).json({ medHist: user.medHist, success: true });
    }
  });
};
// adding new medical record to a patient
exports.addMedicalRecord = (req, res) => {
  if (req.file === undefined) {
    return res
      .status(400)
      .json({ error: "Select a file record to add!", success: false });
  } else {
    User.findById(req.params.userId).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found!", success: false });
      } else {
        var medicalPath = req.file.path;
        var histLen = user.medHist.length;
        var currDate = Date.now();

        // giving an id to each record
        var pid = histLen === 0 ? 1 : user.medHist[histLen - 1].pid + 1;
        user.medHist.push({
          pid: pid,
          date: new Date(currDate),
          docId: medicalPath,
          desc: req.body.desc,
        });

        user
          .save()
          .then((savedUser) => {
            return res
              .status(200)
              .json({ msg: "Record Added!", success: true });
          })
          .catch((err) => {
            return res.status(400).json({ err: err, success: false });
          });
      }
    });
  }
};
// removing a medical record with a pid
exports.removeMedicalRecord = (req, res) => {
  if (req.body.pid === undefined) {
    return res
      .status(400)
      .json({ error: "Fill all the fields!", success: false });
  }
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found!", success: false });
      } else {
        var medRecord = user.medHist.find(
          (record) => record.pid === req.body.pid
        );
        if (medRecord === undefined) {
          return res
            .status(400)
            .json({ error: "Record cannot be found", success: false });
        } else {
          var index = user.medHist.indexOf(medRecord);
          user.medHist.splice(index, 1);
          user
            .save()
            .then((updatedUser) => {
              return res
                .status(200)
                .json({ msg: "Record removed!", success: true });
            })
            .catch((err) => {
              return res.status(400).json({ err: err, success: false });
            });
        }
      }
    })
    .catch((err) => {
      return res.status(400).json({ err: err, success: false });
    });
};
