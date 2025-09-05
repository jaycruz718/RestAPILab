export const comments = [];

/* router.get("/", (req, res) => {
  const { userId, postId } = req.query;

  let filtered = comments;

  if (userId) {
    filtered = filtered.filter((c) => c.userId == userId);
  }

  if (postId) {
    filtered = filtered.filter((c) => c.postId == postId);
  }

  res.json(filtered);
}); */

router.post("/", (req, res) => {
  const { user, post, body } = req.body;

  if (!user && !post && !body) {
    return res.status(400).json({ error: "Missing data" });
  }

  const newComment = {
   id: comments[comments.length - 1].id + 1, //find the last users id number and add one to it.
    name,
    username,
    email,
  };

  comments.push(newComment);
  res.status(201).json(newComment);
});

router
.get("/:id", (req, res, next) => {
  const comment = comments.find((comment) => comment.id == req.params.id);
  if (comment) res.json(comment);
  else next();
})

.patch("/:id", (req, res, next) => {
  const comment = comments.find((comment, i) => {
    if (comment.id == req.params.id) {
      comments[i].body = req.body.body;
      return true;
    }
  });

  if(comment) res.json(comments);
  else next();
})

.delete("/:id", (req, res, next) => {
  const index = comments.find((comment) => comments.id == req.params.id);

  if (index !== -1) {
    const deleted = comments.splice(index, 1);
    res.json(deleted[0]);
  } else next();
});

router.get("/posts/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  const postComments = comments.filter((comment) => comments.postId === postId);
  res.json(postComments);
});

router.get("/users/:id/comments", (req, res) => {
  const userId = parseInt(req.params.id);
  const userComments = comments.filter((comment) => comments.userId === userId);
  res.json(userComments);
});

router.get("/posts/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.query.userId;

  let filtered = comments.filter((c) => c.postId === postId);

  if (userId) {
    filtered = filtered.filter((c) => c.userId == userId);
  }

  res.json(filtered);
});

router.get("/users/:id/comments", (req, res) => {
  const userId = parseInt(req.params.id);
  const postId = req.query.postId;

  let filtered = comments.filter((comment) => comments.userId === userId);

  if (postId) {
    filtered = filtered.filter((comment) => comments.postId == postId);
  }

  res.json(filtered);
});


export default router;