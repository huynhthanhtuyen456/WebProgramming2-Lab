const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VocabSchema = new Schema(
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            required: 'German word cannot be blank'
        },
        french: {
            type: String,
        }
    },
    { collection: 'vocab3' }
);

VocabSchema.index({ english: "text", german: "text", french: "text" });
module.exports = mongoose.model('Vocab', VocabSchema);