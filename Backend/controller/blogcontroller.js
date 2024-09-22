const blogModel = require("../model/blogmodel");

const CreateBlog = async (req, res) => {
  const { title, snippet, body } = req.body;
  const comment = req.body;
  if ((!title, !snippet, !body)) {
    res.status(400).json({
      message: "please provide title, snippet and body",
    });
    return;
  }

  try {
    const article = new blogModel({
      title,
      snippet,
      body,
    });

    await article.save();

    res.status(200).json({
      message: "article create successfully",
      blogId: article._id,
    });
  } catch (err) {
    console.log(err);
    req.status(500).json({
      message: "internal server error",
    });
    return;
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
    if(!blogId){
        res.status(400).json({
            message : "please provide blogId"
        })
        return
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
    if(!blogId || !updatedFields){
        res.status(400).json({
            message : "please provide blogId and updatedfields"
        })
        return
    }
    try{
        const updatedBlog = await blogModel.findByIdAndUpdate(
            blogId,
            {$set : updatedFields},
            {new : true}
        )

        if (!updatedBlog){
            res.status(404).json({
                message : "blog not found"
            })
            return
        }

        res.status(200).json({
            message : "blog updated successfully",
            updatedBlog
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
          message: "internal server error",
        });
    }
};

const DeleteBlog = async (req, res) => {
    const DeleteBlog = req.body.blogId;
    if(!DeleteBlog){
        res.status(400).json({
            message: "please provide blogid"
        })
    }
    try{
        const DeletedBlog = await blogModel.findByIdAndDelete(DeleteBlog);
        if (!DeletedBlog) {
            res.status(404).json({
              message: "blog not found",
            });
            return;
          }
      
        res.status(200).json({
            message: "Blog deleted successfully",
            DeletedBlog
          });

    }catch(err){
        console.log(err);
        res.status(500).json({
          message: "internal server error",
        });
    }
};

const SearchBlog = async (req, res) => {
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({
          message: "internal server error",
        });
    }
};

module.exports = {
  CreateBlog,
  getAllBlog,
  getBlogById,
  UpdateBlog,
  DeleteBlog,
  SearchBlog,
};
