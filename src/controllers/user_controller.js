const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    async store (req, res, next) {
        const {email, username, first_name, last_name, pwd, category, institution, born_date, state, city, country, points_user = 0 } = req.body;
        let user = await User.findOne({ email });
        if(!user){
            await bcrypt.hash(pwd, 10 , (errBcrypt, hash) => {
                if (errBcrypt) {
                    res.status(500).send({error: errBcrypt});
                } else {
                    user =  User.create({
                        email,
                        username:`@${username}`,
                        first_name,
                        last_name,
                        pwd: hash,
                        category,
                        institution,
                        born_date,
                        city,
                        state,
                        country,
                        points_user
                    })
                    let token = jwt.sign({
                        email: req.body.email,
                        pwd: req.body.pwd,
                        date: born_date
                    }, 'NerdevyTokenCode',{});
                    return res.status(201).send({
                        username,
                        token: token
                    });
                }
            })
        } else {
            return res.status(500).send({message: 'Usuário já cadastrado'})
        }
    },
    async login (req, res, next) {
        const { email , pwd } = req.body;
        const userData = await User.findOne({email})
        if (!userData) {
            return res.status(500).send({message : 'usuario não existente'})
        } else {
            await bcrypt.compare(pwd, userData.pwd, (errBcrypt, response) => {
                if(errBcrypt){
                    return res.status(500).send({error: "Erro senha."})
                } if (response) {
                    let token = jwt.sign({
                        email: req.body.email,
                        pwd: req.body.pwd,
                        date: userData.born_date
                    }, 'NerdevyTokenCode',{});
                    return res.status(200).send({
                            email: userData.email,
                            username: userData.username,
                            token: token,
                            message: 'Success'
                    });
                } else {
                    return res.status(401).send({error: 'Falha na autenticação'})
                }
            })
        }
    },
    async index (req, res) {
        const Users = await User.find({})
        return res.status(200).json(Users)
    },
    async show (req, res) {
        const { email } = req.body;
        const userData = await User.findOne({email})
        if (!userData) {
            return res.status(404).send({message : 'usuario não existente'})
        } else {
            return res.status(201).send(userData)
        }
    },
}