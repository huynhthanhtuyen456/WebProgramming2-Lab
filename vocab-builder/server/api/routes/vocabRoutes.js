const vocabBuilder = require('../controllers/vocabController');
const verify = require('../middlewares/verify');

module.exports = app => {
    app
        .route('/words')
        .get(vocabBuilder.list_all_words)
        .post(vocabBuilder.create_a_word);
    
    app
        .route('/words/:wordId', verify.Verify)
        .get(verify.Verify, vocabBuilder.read_a_word)
        .put(verify.Verify, vocabBuilder.update_a_word)
        .delete(verify.Verify, vocabBuilder.delete_a_word)
};