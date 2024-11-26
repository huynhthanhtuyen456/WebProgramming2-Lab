const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

exports.list_all_words = (req, res) => {
    Vocab.find({}).sort({ english: 'asc', german: 'asc' }).exec((err, words) => {
        if (err) res.send(err);
        res.json(words);
    });
};

exports.search = async (req, res) => {
    var term = req.query.term;
    var query = {$text: { $search: term }};
    if (!term) query = {};
    Vocab.find(query).sort({ english: 'asc', german: 'asc' }).exec((err, words) => {
        if (err) res.send(err);
        res.json(words);
    });
};

exports.create_a_word = (req, res) => {
    const newWord = new Vocab(req.body);
    console.log(newWord);
    newWord.save((err, word) => {
        if (err) res.send(err);
        res.json(word);
    });
};

exports.read_a_word = (req, res) => {
    Vocab.findById(req.params.wordId, (err, word) => {
        if (err) res.send(err);
        res.json(word);
    });
};

exports.update_a_word = (req, res) => {
    Vocab.findOneAndUpdate(
        {_id: req.params.wordId},
        req.body,
        { new: true },
        (err, word) => {
            if(err) res.send(err);
            res.json(word);
        }
    );
};

exports.delete_a_word = (req, res) => {
    Vocab.deleteOne({_id: req.params.wordId}, err => {
        if (err) res.send(err);
        res.json({
            message: 'Word successfully deleted',
            _id: req.params.wordId
        });
    });
};