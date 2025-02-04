const { default: mongoose } = require('mongoose');
const Resource = require('../models/Resource');

const createResource = async ({ title, url, description, user_id, tags }) => {
    const resourceExist = await Resource.findOne({ url, user_id }).select('_id');
    if (resourceExist) {
        throw new Error('Resouce already exists for this user');
    }
    const newResource = new Resource({
        user_id,
        title,
        url,
        description,
        tags,
    });
    try {
        await newResource.save();
        return newResource;
    } catch (err) {
        throw new Error("Error saving resource: ", err);
    }
}

const getResources = async ({ user_id, page, limit }) => {
    const resourceExist = await Resource.find({ user_id });
    if (resourceExist.length === 0) {
        return [];
    }
    try {
        const resources = await Resource.find({ user_id })
            .skip((page - 1) * limit)
            .limit(limit)
        // .toArray();

        const total = await Resource.countDocuments({ user_id });
        return {
            currentPage: page,
            resources,
            totalPages: Math.ceil(total / limit),
            totalResources: total
        };
    } catch (err) {
        throw new Error("Error fetching resources: ", err);
    }
}

const updateResource = async ({ _id, updates }) => {
    if (Object.keys(updates).length === 0) {
        throw new Error("No updates provided");
    }
    const updateResource = await Resource.findByIdAndUpdate(_id, { $set: updates }, { new: true });
    if (!updateResource) {
        throw new Error("Resource does not exist");
    }
    return updateResource;
}

const deleteResource = async ({ _id }) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error("Invalid resource id");
    }
    const resourceToDelete = await Resource.findByIdAndDelete(_id);
    if (!resourceToDelete) {
        throw new Error("Resource does not exist");
    }
    return true;
}

const searchResources = async ({ user_id, topic, search }) => {
    const query = { user_id, tags: topic };
    if (search) {
        query.$text = { $search: search };
    }
    try {
        const results = await Resource.find(query)
            .sort({ createdAt: -1 })
            .limit(10);
        return results;
    } catch (err) {
        throw new Error("Error searching resources: ", err);
    }
}

module.exports = { createResource, getResources, updateResource, deleteResource, searchResources };