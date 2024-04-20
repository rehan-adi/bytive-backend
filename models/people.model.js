import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    password: {
        type: String,
    },
    gravatar: {
        type: String,
    },
    techStack: {
        type: Array,
    },
    location: {
        type: String,
    },
    fieldOfInterest: {
        type: Array,
    },
    seeking: {
      type: Array,
    },
    bio: {
        type: String,
    },
    githubURL:{
        type: String,
    },
    twitterURL:{
        type: String,
    },
    website_URL:{
        type: String,
    },
    linkedinURL:{
        type: String,
    }
},
{
    timestamps: true
})

const peopleModel = mongoose.model('people', peopleSchema);
export default peopleModel;