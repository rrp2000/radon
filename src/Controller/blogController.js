const blogModel = require("../model/blogModel")
const authorModel = require("../model/authorModel")
const validator = require("../validator/validator")
const validate = require("../validator/validator")

//=====================create blogs========================


const createBlog = async function (req, res) {
    try {
        let data = req.body
       
        let val = validate.checkerBlog(data)
        
        if ( val) {
            return res.status(400).send({ status:false,msg: val })
        }
        if(!data.authorId||data.authorId===undefined){
            res.status(400).send({status:false,msg:"authorId cant be empty."})
        }
        const authorIdFromToken = req.authorId
        if(authorIdFromToken!= data.authorId.toString()){
            return res.status(403).send({status:false,msg:"You are not allowed to modify."})
        }
        
        let authorId = await authorModel.find({ _id: data.authorId })
        if(data.isPublished===true){
            data.publishedAt = new Date()
        }
        if (!authorId.length) {
            res.status(400).send({ status:false,msg: "authorid is not valid." })
        }
        else{
            let savedData = await blogModel.create(data)
            res.status(201).send({ status:true,data: savedData })
        }
    }
    catch (err) { res.status(500).send({status:false,msg:err.message}) }
}

//===========================getBlogs==============================

const getBlog = async function (req, res) {
    try {
        let filters = req.query
       
        Object.keys(filters).forEach(x => filters[x] = filters[x].trim())
       

        if (Object.keys(filters).length === 0) {

            let blogs = await blogModel.find({ isDeleted: false, isPublished: true })
            if (blogs.length == 0) res.status(404).send({ status: false, msg: "No result found" })
            res.status(200).send({ status: true, data: blogs })

        } else {

            filters.isDeleted = false
            filters.isPublished = true
            if (filters.tags) {
                if (filters.tags.includes(",")) {
                    let tagArray = filters.tags.split(",").map(String).map(x => x.trim())
                    filters.tags = { $all: tagArray }
                }
            }

            if (filters.subcategory) {
                if (filters.subcategory.includes(",")) {
                   let subcatArray = filters.subcategory.split(",").map(String).map(x => x.trim())
                    filters.subcategory = { $all: subcatArray }
                }
            }


            let filteredBlogs = await blogModel.find(filters)
            if (filteredBlogs.length === 0) return res.status(404).send({ status: false, msg: "No such data available" })
            else return res.status(200).send({ status: true, data: filteredBlogs })
        }

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

//============================Update blogs==============================

const updateBlog = async function (req, res) {

    try {
        
        let blogId = req.params.blogId;
        if (!validator.isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: `BlogId is invalid.` });
        }
        let user = await blogModel.findById(blogId);

        if (Object.keys(user) === 0 || user.isDeleted === true) {
            return res.status(404).send({ status: false, msg: " no such data found" });
        }
        const authorIdFromToken = req.authorId
        if(authorIdFromToken!= user.authorId.toString()){
            return res.status(403).send({status:false,msg:"You are not allowed to modify."})
        }

        let userData = req.body;
        if (Object.keys(userData).length === 0) return res.status(400).send({ status: false, msg: "no data to update" })

        if (userData.tags||userData.subcategory) {
            userData.$push = {}
            if(userData.tags){
                userData.$push.tags =  userData.tags.split(",") 
                delete userData.tags
            }
            if (userData.subcategory) {
                userData.$push.subcategory = userData.subcategory.split(",")
                delete userData.subcategory
            }
        }
        if(userData.isPublished===false){
            userData.publishedAt = null
        }
        else{
            userData.isPublished = true
            userData.publishedAt = new Date()
        }
        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, userData, { new: true });
        res.status(200).send({ status: true, data: updatedBlog });

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
};

//================================delete blog=================================

const deleteBlogById = async function (req, res) {

    try {

        let id = req.params.blogId;
        if (!validator.isValidObjectId(id)) {
            return res.status(400).send({ status: false, msg: `BlogId is invalid.` });
        }
        let blog = await blogModel.findOne({ _id: id });

        if (!blog) {
          return res.status(404).send({ status: false, msg: "No such blog found" });
        }

        const authorIdFromToken = req.authorId
        if(authorIdFromToken!= blog.authorId.toString()){
            return res.status(403).send({status:false,msg:"You are not allowed to modify."})
        }
    
        if (blog.isDeleted == false) {
          let Update = await blogModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: true, deletedAt: Date() },
            { new: true }
          );
          return res.status(200).send({status: true,data: Update,
          });
        } else {
          return res
            .status(404)
            .send({ status: false, msg: "Blog already deleted" });
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


//=============================delete blogs=================================


const deleteByQuery = async function (req, res) {

        try{
    
            const filterQuery = req.query
            filterQuery.isDeleted=false
            if (filterQuery.tags) {
                if (filterQuery.tags.includes(",")) {
                    let tagArray = filterQuery.tags.split(",").map(String).map(x => x.trim())
                    filterQuery.tags = { $all: tagArray }
                }
            }

            if (filterQuery.subcategory) {
                if (filterQuery.subcategory.includes(",")) {
                   let subcatArray = filterQuery.subcategory.split(",").map(String).map(x => x.trim())
                    filterQuery.subcategory = { $all: subcatArray }
                }
            }
            
            const authorIdFromToken = req.authorId

            const blogs = await blogModel.find(filterQuery);
            if(blogs.length===0) return res.status(404).send({status:false, msg: 'No matching blogs found'})
            const idsOfBlogsToDelete = []
            for(let i = 0;i<blogs.length;i++){
                if(blogs[i].authorId.toString() === authorIdFromToken){
                    idsOfBlogsToDelete.push(blogs[i]._id.toString())
                }
            }
            console.log(idsOfBlogsToDelete)
            if(idsOfBlogsToDelete.length===0){
                return res.status(400).send({status:false, message: 'No blogs found'})
            }
    
            const blog = await blogModel.updateMany({_id: {$in: idsOfBlogsToDelete}}, {$set: {isDeleted: false, deletedAt: new Date()}})
            res.status(200).send({status: true, message: blog})
            
        }catch(error){
            res.status(500).send({status:false,msg:error.message})
        }
    };



module.exports = { createBlog, createBlog, getBlog, deleteBlogById, deleteByQuery, updateBlog };
