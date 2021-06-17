const mongoose = require("mongoose");
const moment = require("moment");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.virtual("shortdesc").get(function () {
  const ans = this.description.slice(0, 100);
  return ans;
});

blogSchema.virtual("time").get(function () {
  return moment(this.createdAt).format("MMMM D,YYYY || h:m a");
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
