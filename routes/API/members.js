const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");
const idFilter = req => member => member.id === parseInt(req.params.id);
// Routing using .get() to handle GET requests and specified with a callback function
//  GETs all members
router.get("/", (req, res) => {
  res.json(members);
});

// GETing a member when the id of the member is passed
router.get("/:id", (req, res) => {
  // const found = members.some((member) => member.id === parseInt(req.params.id));
  const found = members.some(idFilter(req));

  if (found) {
    res.json(
      // members.filter((members) => members.id === parseInt(req.params.id))
      members.filter(idFilter(req))
    );
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
  // req.params.id returns the id which is passed in the request
  // using req.params.id, we will search the member with the id
});

// Creating a member
router.post("/", (req, res) => {
  const newMember = {

    ...req.body,
    id: uuid.v4(),
    // name: req.body.name,
    // email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: "please include name and email" });
  }
  members.push(newMember);
  res.json(members); 
});

// Updating the member:
router.put("/:id", (req, res) => {
  // const found = members.some((member) => member.id === parseInt(req.params.id));
  const found = members.some(idFilter(req));
  if (found) {
    // const updateMember = req.body;
    // members.forEach((member) => {
    //   if (member.id == parseInt(req.params.id)) {
    //     member.name = updateMember.name ? updateMember.name : member.name;
    //     member.email = updateMember.email ? updateMember.email : member.email;
    //     res.json({ msg: "Member pdated", member });
      members.forEach((member, i) => {
        if(idFilter(req)(member)){
          const updateMember = {...member, ...req.body};
          members[i] = updateMember
          res.json({msg: 'Member Updated', updateMember});
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Deleting the member
router.delete("/:id", (req, res) => {
  // const found = members.some((member) => member.id === parseInt(req.params.id));
  const found = members.some(idFilter(req));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        // (members) => members.id !== parseInt(req.params.id)
        member => !idFilter(req)(member))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
  // req.params.id returns the id which is passed in the request
  // using req.params.id, we will search the member with the id
});

module.exports = router;
