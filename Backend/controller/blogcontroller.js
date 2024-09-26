const blogModel = require("../model/blogmodel");
const userModel = require("../model/usermodel");

const CreateBlog = async (req, res) => {
  const { title, snippet, body, tags } = req.body;
  const comment = req.body;
  if ((!title, !snippet, !body)) {
    res.status(400).json({
      message: "please provide title, snippet and body",
    });
    return;
  }

  try {
    // Ensure req.user._id is populated by JWT middleware
    if (!req.params || !req.params._id) {
      return res.status(401).json({ message: 'Unauthorized, user not found' });
    }

    const article = new blogModel({
      title,
      snippet,
      body,
      tags,
      createdBy: req.params._id, // Attach the current user's ID
    });

    await article.save();

    return res.status(201).json({
      message: "article created successfully",
      blogId: article._id,
    });


  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json({
      message: "All blogs retrieved successfully",
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).josn({
      message: "internal server error",
    });
  }
};

const getBlogById = async (req, res) => {
  const blogId = req.params.id;
  if (!blogId) {
    res.status(400).json({
      message: "please provide blogId",
    });
    return;
  }
  try {
    const blog = await blogModel.findById(blogId);

    if (!blog) {
      res.status(404).json({
        message: "blog not found",
      });
      return;
    }

    res.status(200).json({
      message: "Blog",
      blog: blog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const UpdateBlog = async (req, res) => {
  const blogId = req.params.id;
  const updatedFields = req.body; // Fields sent from Postman
  if (!blogId || !updatedFields) {
    res.status(400).json({
      message: "please provide blogId and updatedfields",
    });
    return;
  }
  try {
    const updatedBlog = await blogModel.findByIdAndUpdate(
      blogId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedBlog) {
      res.status(404).json({
        message: "blog not found",
      });
      return;
    }

    res.status(200).json({
      message: "blog updated successfully",
      updatedBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const DeleteBlog = async (req, res) => {
  const DeleteBlog = req.body.blogId;
  if (!DeleteBlog) {
    res.status(400).json({
      message: "please provide blogid",
    });
  }
  try {
    const DeletedBlog = await blogModel.findByIdAndDelete(DeleteBlog);
    if (!DeletedBlog) {
      res.status(404).json({
        message: "blog not found",
      });
      return;
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      DeletedBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const SearchBlog = async (req, res) => {
  try {
    const {
      tags,
      limit = 10,
      skip = 0,
      sortBy = "date",
      order = "desc",
      searchTerm,   
    } = req.query;
    let filter = {};

    if (tags) {
      const tagArray = tags.split(",");
      filter.tags = { $in: tagArray }; // This will match blogs that have any of the provided tags
    }

    if(searchTerm){
      filter.$or = [
        {title: {$regex: searchTerm, $options: i}},
        {snippet:{$regex: searchTerm, $options: i}},
        {body: {$regex: searchTerm, $options: i}}
      ]
    }

    // Convert limit and skip to integers
    const parsedLimit = parseInt(limit, 10);
    const parsedSkip = parseInt(skip, 10);
    if (isNaN(parsedLimit) || isNaN(parsedSkip)) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
    }

    console.log(req.query);

    //sorting logic
    const sorting = {};
    sorting[sortBy] = order === "asc" ? 1 : -1;

    //filter logic
    const article = await blogModel
      .find(filter)
      .sort(sorting)
      .limit(parsedLimit)
      .skip(parsedSkip);

    //total no.of documents
    const count = await blogModel.countDocuments(filter);

    res.status(200).json({
      message: "Blogs retrieved successfully",
      article,
      total: count,
      limit: parsedLimit,
      offset: parsedSkip,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const verifyUser = async(req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];//Authorization: Bearer <token>
  if(!token){
      res.status(401).json({
          message: "No token provided, unauthorized"
      })
      return
  }
  try{
      const secret_key = "123rtyuo"
      console.log("hi")
      const decode = await jwt.verify(token, secret_key);
      req.userId = decode.userId;
      console.log("Authorized: ", decode);
      res.status(200).json({
          message: "token verified successfully"
      });

      next();

  }catch(err){
      console.log(err);
      res.status(500).json({
          message: "internal server error"
      })
  }
}

module.exports = {
  CreateBlog,
  getAllBlog,
  getBlogById,
  UpdateBlog,
  DeleteBlog,
  SearchBlog,
};
