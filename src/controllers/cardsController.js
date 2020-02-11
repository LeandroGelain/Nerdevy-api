const mysql = require('../../mysql.js');

module.exports = {
    insert_card (req, res, next) {
        mysql.getConnection((err, conn) => {
            if (err) {
                return res.status(500).send({error: err})
            }
            conn.query(`select * from users where username=?`,[req.body.username],
            (erro, results, fields) => {
                if (erro) {
                    conn.release();
                    return res.status(500).send({ err:err })
                } 
                if (results.length < 1) {
                    return res.status(401).send({error: 'Usuario não exite no banco!'})
                } else {
                    conn.query(
                        `insert into cards(category, title, description, points, created_by)`
                        + `values(?,?,?,?,?)`,
                        [
                            req.body.category,
                            req.body.title,
                            req.body.description,
                            req.body.points,
                            req.body.username
                        ],
                        (error, results, fields) => {
                            conn.release();
                            if (error) {
                                return res.status(500).send({
                                    error: error
                                });
                            } else {
                                return res.status(201).send({
                                    message: 'card inserted'
                                })
                            }
                        }
                    )
                }
            })        
        })
    },
    delete_card (req, res, next) {
        const { idCard } = req.body;
        mysql.getConnection((err, conn ) => {
            if (err) {
                return res.status(500).send({error: err})}
            conn.query(
                ` delete from membersCard where Cards_idCard=?`,idCard, (err, callback) => {
                    if (err) {
                        conn.release();
                        return res.status(500).send({error:err})
                    }
                    conn.query(
                        `delete cards from cards where idCard=`+idCard,
                        (error, results,fields) =>{
                            conn.release();
                            if (error) {
                                return res.status(500).send({error: error})
                            }
                            return res.status(201).send({message: 'card delete'})
                        }
                    )
                }
            )
        })
    },
    update_card (req, res ,next) {
        const { category, title, description, points, idCard } = req.body;
        mysql.getConnection((err, conn) => {
            if (err) {
                return res.status(500).send({error: err})}
            conn.query(
                `update cards 
                    set category=?, 
                    title= ?, 
                    description=?,
                    points=?
                    where idCard=?; `,
                [
                    category,
                    title,
                    description,
                    points,
                    idCard
                ],
                (error, results) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({error: error})
                    } else {
                        return res.status(201).send({message: "card updated"})
                    }
                }
            )
        })
    },
    get_cards (req, res, next) {
        mysql.getConnection((err, conn) => {
            if (err) {
                return res.status(500).send({error: err})
            }
            if (req.body.initial_number) {
                conn.query(
                    `select * from cards limit ?;`,[req.body.initial_number],
                    (error, results) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({error: error})
                        } else {
                            return res.status(200).send(results)
                        }
                    }
                )
            }
            if (req.body.initial_number === 0){
                conn.query(
                    `select * from cards;`,
                    (error, results) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({error: error})
                        } else {
                            return res.status(200).send(results)
                        }
                    }
                    )
                }
        })
    },
    // revisar
    get_card_by_id (req, res, next) {
        mysql.getConnection((err,conn) => {
            if (err) {
                return res.status(500).send({err:err})
            } else {
                conn.query(
                    `select * from cards where idCard=?`,[req.body.idCard],
                    (error, results, fields) => {
                        conn.release();
                        if (error) {
                            res.status(500).send({error: error})
                        } else {
                            res.status(200).send(results[0])
                        }
                    }
                )
            }
        })
    },
    insert_member_on_card (req, res) {
        const { username, idCard } = req.body;
        mysql.getConnection((err, conn) => {
            if(err){
                return res.status(500).send({error:err})
            } conn.query(`select idUsers from users where username=?`,[username],(err, response) =>{
                if (err) {
                    conn.release();
                    return res.status(500).send({error:err})                    
                }
                if (response[0] !== undefined ) {
                    const idUser = response[0]["idUsers"]
                    conn.query(`insert into membersCard(Users_idUsers, Cards_idCard) values(?,?)`,
                        [idUser, idCard], (error, responseInsert) => {
                            conn.release();
                            if (error) {
                                console.log(error)
                                if (error["errno"] === 1062) {
                                    return res.status(500).send({message:"Usuario já faz parte do card."})
                                }
                                if (error["errno"] === 1452){
                                    return res.status(404).send({message:"Card não encontrado"})
                                }
                            } return res.status(200).send({message:`${username} inserido no card.`})
                        } 
                    )
                } else {
                    return res.status(404).send({message:"Usuario não encontrado"})
                }
            })
        })
    },
    removeMember(req, res) {
        const { username , idCard } = req.body;
        mysql.getConnection((err, conn) => {
            if (err) {
                return res.status(500).send({error:err})
            }
            conn.query(`select idUsers from users where username=?`,[username], (err, response)=> {
                if (err) {
                    return res.status(500).send({error:err})
                }
                if (response.length > 0 ){
                    const idUser = response[0]["idUsers"]
                    conn.query(`select * from membersCard where Users_idUsers=? and Cards_idCard=?`, [idUser, idCard], (err, resp) => {
                        if (err) {
                            return res.status(500).send({error: err})
                        }
                        if (resp.length > 0) {
                            conn.query(`delete from membersCard where Users_idUsers=? and Cards_idCard=?`, [idUser, idCard], (err, callback) => {
                                conn.release();
                                if(err){
                                    return res.status(500).send({error: err})
                                } return res.status(200).send({message: "Membro removido"})
                            })
                        } else {
                            return res.status(200).send({message:"Membro não estava no card."})
                        }
                    })     
                } else {
                    return res.status(404).send({message:"Membro não encontrado."})
                }
            })
        })
    }
}