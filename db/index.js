const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pictamajig');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
console.log('Connected to Mongo...')
});

const picturesSchema = mongoose.Schema({
    path: String,
    username: String,
    date: Date,
    tags: Array,
    likes: Number
});

const Picture = mongoose.model('Picture', picturesSchema);

module.exports.savePicture = async (path, tags, username) => {
    try {
        const newPicture = new Picture({
            path: path,
            username: username,
            date: new Date(),
            tags: tags,
            likes: 0
        });
        await newPicture.save();
        return;
    } catch (e) {
        throw 'Error uploading picture!' + e;
    }
}

//default to 5 pics
module.exports.getPictures = async () => {
    try {
        const pictures = await Picture.find()
            .sort({ likes: -1}).lean();
        return pictures;
    } catch (e) {
        throw 'Error retrieving pictures!' + e;
    }
}

module.exports.likePicture = async (id) => {
    try {
        await Picture.findOneAndUpdate({_id: id}, {$inc: {likes: 1}});
        return;
    } catch (e) {
        throw 'Error liking picture' + e;
    }
}