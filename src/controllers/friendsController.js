const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { emailUser, emailToSendFriendship } = req.body;
    
        const oldFriendListA = await User.findOne({email:emailUser});
        const oldFriendListB = await User.findOne({email:emailToSendFriendship});
        
        if(oldFriendListA && oldFriendListB) {
            for (const x in oldFriendListA.friends){
                if (emailToSendFriendship === oldFriendListA.friends[parseInt(x)]) {
                return res.status(200).send({message: "Usuario já é amigo"})
            }
        }
            for (const x in oldFriendListB.friends){
                if (emailUser === oldFriendListB.friends[parseInt(x)]) {
                    return res.status(200).send({message: "Usuario já é amigo"})
                }
            }
        }
        oldFriendListA.friends.push(emailToSendFriendship);
        oldFriendListB.friends.push(emailUser);
        await User.updateOne(
            { email:emailUser }, {
            $set:{
                friends: oldFriendListA.friends
            }}, (err, response) => {
                if (err) {
                    return res.status(500).send({error: err})
                }
            });
            await User.updateOne(
                { email:emailToSendFriendship }, {
            $set:{
                    friends: oldFriendListB.friends
                }}, (err, doc) => {
                    if (err) {
                        return res.status(500).send({error: err})
                    }
                }
            );
            return res.status(200).send({message: "Exito ao adicionar"})
    },
    async delete (req, res) {
        const { emailUser , emailToRemoveFriendship } = req.body;
        
        const oldListA = await User.findOne({email:emailUser})
        const oldListB = await User.findOne({email:emailToRemoveFriendship})
        
        if (oldListA.friends.length !== 0 && oldListB.friends.length !== 0){    
            const oldListFriendsA = oldListA.friends.slice()
            const oldListFriendsB = oldListB.friends.slice()
            if (oldListA && oldListB) {
                for ( const x in oldListA.friends){
                    if (emailToRemoveFriendship === oldListA.friends[parseInt(x)]){
                        oldListA.friends.splice(oldListA.friends.indexOf(emailToRemoveFriendship));
                    }
                }
                for ( const x in oldListB.friends){
                    if (emailUser === oldListB.friends[parseInt(x)]){
                        oldListB.friends.splice(oldListB.friends.indexOf(emailUser));
                    }
                }
                if (oldListFriendsA.length === oldListA.friends.length ) {
                    return res.status(404).send({message : " Membros não são amigos"})
                }
                if (oldListFriendsA.length !== 0 && oldListFriendsB.length !== 0 ){
                    await User.updateOne({email:emailUser},{
                        $set: {
                            friends: oldListA.friends
                        } 
                    }, (err, doc) => {
                        if (err) {
                            return res.status(500).send({error: err})
                        }
                    })
                    await User.updateOne({email:emailToRemoveFriendship},{
                        $set: {
                            friends: oldListB.friends
                        } 
                    }, (err, doc) => {
                        if (err) {
                            return res.status(500).send({error: err})
                        }
                    })
                    return res.status(200).send({message: "amizade desfeita"})
                } else{
                    await User.updateOne({email:emailUser},{
                        $set: {
                            friends: []
                        } 
                    }, (err, doc) => {
                        if (err) {
                            return res.status(500).send({error: err})
                        }
                    })
                    await User.updateOne({email:emailToRemoveFriendship},{
                        $set: {
                            friends: []
                        } 
                    }, (err, doc) => {
                        if (err) {
                            return res.status(500).send({error: err})
                        }
                    })
                    return res.status(200).send({message: "sem amizades"})
                }
            }   
            return res.status(500).send({error: "documentos null"})   
        }
        return res.status(500).send({error:"Não possuem amizades"})
    },
    async show (req, res) {
        const { email } = req.body;
        const { friends } = await User.findOne({email}, (err, response) =>{
            if(err) {
                return res.status(500).send({error:err})
            }
        });
        const friendsData = []
        for (const x in friends){
            friendsData.push(await User.findOne({email:friends[parseInt(x)]}))   
        }
        return res.status(200).send(friendsData)
    },
}