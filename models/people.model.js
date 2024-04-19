import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gravatar: {
        type: String,
        required: true
    },
    techStack: {
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    fieldOfInterest: {
        type: Array,
        required: true
    },
    seeking: {
      type: Array,
      required: true
    },
    bio: {
        type: String,
        required: true
    },
    githubURL:{
        type: String,
        required: true
    },
    twitterURL:{
        type: String,
        required: true
    },
    website_URL:{
        type: String,
        required: true
    },
    linkedinURL:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const peopleModel = mongoose.model('people', peopleSchema);
export default peopleModel;