const HomeworkModel = require("../models/homeworkModel");
const CourseModel = require("../models/courseModel");
const { nullError, isEmptyId, nullVariable } = require("../utils/Errors");

const creatNewHomework = async (req, res) => {
  try {
    isEmptyId(req.body.id);
    const { subject, description, id } = req.body;
    const course = await CourseModel.findById(id);
    const newHomework = new HomeworkModel({
      subject: subject,
      description: description,
      courseId: course._id,
    });

    await newHomework.save();
    course.homeworks.push(newHomework);
    await course.save();
    res
      .status(201)
      .json({
         success:true,
         message: "create new homework success",
         data: newHomework 
      });
  } catch (err) {
    res
    res
    .status(400)
    .json({
      success:false,
      message: "create new homework filed",
      error: err.message 
    });
  }
};

const getHomeworkById = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    await HomeworkModel.findOne({courseId:req.params.id}, (err, result) => {
      if (err) throw err;
      nullError(result, res);
    });
  } catch (err) {
    res
    .status(500)
    .json({
      success:false,
      massage: "delete by id homework filed",
      error: err.message 
    });
  }
};

const updateHomeworkById = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    await HomeworkModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      (err, result) => {
        if (err) throw err;
        nullError(result, res);
      }
    );
  } catch (err) {
    res
    .status(500)
    .json({
      success:false,
      massage: "update by id homework filed",
      error: err.message 
    });
  }
};

const deleteHomeworkById = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    const homework = await HomeworkModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      nullVariable(result);
    });
    
    await CourseModel.findByIdAndUpdate(
      homework.courseId,
      { $pull: { homeworks: homework._id } },
      (err, result) => {
        if (err) throw err;
        homework.remove({});
        res
        .status(201)
        .json({
          success:true,
           massage: "delete by id homework success!",
        });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success:false,
        massage: "delete by id homework filed",
        error: err.message 
    });
  }
};

module.exports = {
  creatNewHomework,
  getHomeworkById,
  updateHomeworkById,
  deleteHomeworkById,
};