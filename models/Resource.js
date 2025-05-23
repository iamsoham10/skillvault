const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        index: true
    },
    user_id: {
        type: String,
        required: true,
    },
    collection_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    },
    domain: {
        type: String,
        trim: true,
    },
    tags: [{
        type: String,
        trim: true,
        index: true,
    }],
    favicon: {
        type: String,
        trim: true,
    },
    thumbnail: {
        type: String,
        trim: true
    }
}, {
    strict: true
}
);

resourceSchema.index({ title: "text", description: "text", tags: "text" });


const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;