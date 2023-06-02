const mongoose =  require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        country:{
            type: String,
            required:true,
        },
        image:{
            type:String,
            required:false,
        },
        comment:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
