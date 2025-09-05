import express from "express";
import { posts } from "../data/posts.mjs";
const router = express.Router();

// @route GET /api/posts
// @desc Get all posts
// @access Public

router
  .route("/")
  .get((req, res) => {
    res.json(posts);
  })
  .post((req, res) => {
    const { userId, title, content } = req.body; // grabbing data the client entered through req.body
    let id = posts[posts.length - 1].id + 1; // creating a new id
    // let id = posts.length++;

    // creating a new object that will be pushed to the posts array
    if (userId && title && content) {
      const post = {
        id: id,
        userId: userId,
        title: title,
        content: content,
      };
      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else {
      res.json({ error: "Insufficient Data" });
    }
  });

//  @route GET /api/posts/:id
//  @desc Get ONE post
//  @access Public

router
  .route("/:id")
  .get((req, res) => {
    const post = posts.find((post) => post.id == req.params.id);

    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    // find the item that the client wants to update
    const id = req.params.id;
    const data = req.body;
    const post = posts.find((post, i) => {
      if (post.id == id) {
        for (const item in data) {
          // in the posts array grab the post that the client wants to change
          posts[i][item] = data[item]; // make the change
        }
        return true;
      }
    });

    // send a response
    if (post) {
      res.json(posts);
    } else next();
  })
  .delete((req, res, next) => {
    // find the post that the client wants to delete
    const id = req.params.id
    const post = posts.find((post,i) => {
      posts.splice(i, 1)// remove the post at index i
      return true;  
    });

    
    // send the client a response
    if(post){
      res.json(posts)
    } else next();
  });

export default router;


/*
.patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing user in the database.
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
 */

/*
.patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing post in the database.
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
 */