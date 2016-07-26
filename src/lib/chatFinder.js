import firebase from '../firebase'

function getOtherParty(party) {
    return party == 'democrat' ? 'republican' : 'democrat';
}

function getChatandAdd(user,profile,cb) {
    const {uid} = user;
    const {party} = profile;
    const otherParty = getOtherParty(party);
    console.log('Checking if ' + otherParty + ' has people waiting')
    firebase.fetch(otherParty, {
        context: this,
        asArray: true,
        queries: {
            orderByChild: 'createdAt',
            limitToFirst: 1
        },
        then(data){
            if (data.length){
                const target = data[0]
                console.log('Person found waiting in room ' + data.target)
                firebase.push('chats/'+target.chatId+'/users', {
                    data: uid,
                    then() {
                        console.log('Added to room')
                        cb(target.chatId)
                    }
                });
                firebase.post('chats/'+target.chatId+'/state', {
                    data: 'matched',
                });
                firebase.post(otherParty+'/'+target.key, {
                    data: null
                });
            } else {
                console.log('No one found, creating room')
                createChat(user,profile,cb)
            }
        }
    });
}

function createChat(user,profile, cb){
    const {uid} = user;
    const {party} = profile;

    const chatRef = firebase.push('chats', {
        data: {
            users: [uid],
            messages: [],
            state: 'waiting',
            createdAt: new Date()
        }
    });

    console.log('Chat created, id: '+chatRef.key)
    const waitlistRef = firebase.push(party, {
        data: {
            chatId: chatRef.key,
            createdAt: new Date()
        },
        then(){
            console.log('Pushed to waitlist')
            cb(chatRef.key)
        }
    })

    waitlistRef.onDisconnect().remove();
}





export { getChatandAdd };