const Card = require('../models/Card');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { title, category, points, description, email } = req.body;
        const  emailUser  = await User.findOne({email})
        if(emailUser){
            if (emailUser.email === email){
                const cards = await Card.create({
                    title,
                    category,
                    points,
                    description,
                    created_by: email,
                    members : []
                })
                return res.status(200).send({message : `Card ${title} inserido`})
            } else {
                return res.status(404).send({message : "Usuario não encontrado"})
            }
        }
    },
    async index (req, res){
        const { initial_number } = req.body;
        if (initial_number === 0) {
            const cardsList = await Card.find()
            return res.status(200).send(cardsList)
        }
        if (initial_number) {
            const cardsList = await Card.find().limit(initial_number)
            return res.status(200).send(cardsList)
        }
    },
    async delete(req, res) {
        const { idCard } = req.body;
        if ( idCard ) {
            const consultCard = await Card.findOne({"_id": idCard })
            if (consultCard) {
                const cardDeleted = await Card.deleteOne({"_id": idCard})
                return res.status(200).send({message : `card deletado!`})
            }
            return res.status(404).send({message: "Card não encontrado"})
        } else {
            return res.status(500).send({message: 'error body'})
        }
    },
    async update(req, res) {
        const { idCard, 
            title = oldCard.title,
            category = oldCard.category,
            description = oldCard.description,
            points = oldCard.points,
            members,
            email = oldCard.email} = req.body;
        const oldCard = await Card.findOne({"_id":idCard})
        if(oldCard) {
            members.map( member => oldCard.members.push(member))
            console.log(oldCard.members)
            if (oldCard.members.length !== 0){
                const newCard = Card.updateOne(
                    {_id:idCard}, {$set:{title:title,
                        category:category,
                        description:description,
                        points:points,
                        members:oldCard.members,
                        email:email}}, {new:true}, (err, doc)=> {
                        if (err) {
                            return res.status(500).send({err:err})
                        }
                        return res.status(200).send({message:"Sucesso ao editar."})
                    }
                )
            } else {
                const newCard = Card.updateOne(
                    {_id:idCard}, {$set:{title:title,
                        category:category,
                        description:description,
                        points:points,
                        members:members,
                        email:email}}, {new:true}, (err, doc)=> {
                        if (err) {
                            return res.status(500).send({err:err})
                        }
                        return res.status(200).send({message:"Sucesso ao editar."})
                    }
                )
            }
        } else {
            return res.status(404).send({message:'Card não encontrado.',card: oldCard})
        }
    },
    async show(req,res) {
        const { idCard } = req.body
        await Card.findOne({"_id":idCard}, (err, response) => {
            if(err) {
                return res.status(500).send({message:err})
            } 
            else {
                return res.status(200).send(response)
            }
        })
    }

}