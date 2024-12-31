// Message model for handling database operations related to messages
module.exports = (db) => {
    const postMessagesCollection = db.collection('Post_Messages');
  
    const getAllMessages = async () => {
      return await postMessagesCollection.find().toArray();
    };
  
    const addMessage = async (messageData) => {
      await postMessagesCollection.insertOne(messageData);
    };
  
    return { getAllMessages, addMessage };
  };
  