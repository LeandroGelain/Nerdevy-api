const mysql = require('../../mysql.js');

exports.insert_card_challenge = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({error: err})
        }
        conn.query(`select * from users where email=?`,[req.body.email],
        (erro, results, fields) => {
            if (erro) {
                return res.status(500).send({ err:err })
            } 
            if (results.length < 1) {
                return res.status(401).send({error: 'Usuario não exite no banco!'})
            } else {
                conn.query(
                    `insert into challenges(category_challenge, title, description_challenge, points, created_by)`
                    + `values(?,?,?,?,?)`,
                    [
                        req.body.category,
                        req.body.title,
                        req.body.description,
                        req.body.points,
                        req.body.email
                    ],
                    (error, results, fields) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({
                                error: error
                            });
                        } else {
                            res.status(201).send({
                                message: 'card inserted'
                            })
                        }
                    }
                )
            }
        })        
    })
}

exports.delete_card_challenge = (req, res, next) => {
    mysql.getConnection((err, conn ) => {
        if (err) {
            return res.status(500).send({error: err})}
        conn.query(
            `delete challenges from challenges where idChallenges=`+req.body.idChallenge,
        (error, results,fields) =>{
            conn.release();
            if (error) {
                res.status(500).send({error: error})
            } else {
                res.status(201).send({message: 'card delete'})
            }
        }
        )
    })
}

exports.update_card_challenge = (req, res ,next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({error: err})}
        conn.query(
            `update education_project.challenges 
                set category_challenge=?, 
                title= ?, 
                description_challenge=?,
                points=?
                where idChallenges=?; `,
            [
                req.body.category,
                req.body.title,
                req.body.description,
                req.body.points,
                req.body.idChallenge
            ],
            (error, results) => {
                conn.release();
                if (error) {
                    res.status(500).send({error: error})
                } else {
                    res.status(201).send({message: "card updated"})
                }
            }
        )
    })
}

exports.get_cards_challenge = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({error: err})
        }
        if (req.body.initial_number) {
            conn.query(
                `select * from challenges limit ?;`,[req.body.initial_number],
                (error, results) => {
                    conn.release();
                    if (error) {
                        res.status(500).send({error: error})
                    } else {
                        res.status(200).send(results)
                    }
                }
            )
        }
        if (req.body.initial_number === 0){
            conn.query(
                `select * from challenges;`,
                (error, results) => {
                    conn.release();
                    if (error) {
                        res.status(500).send({error: error})
                    } else {
                        res.status(200).send(results)
                    }
                }
                )
            }
    })
}

exports.get_card_by_id = (req, res, next) => {
    mysql.getConnection((err,conn) => {
        if (err) {
            return res.status(500).send({err:err})
        } else {
            conn.query(
                `select * from challenges where idChallenges=?`,[req.body.idCard],
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
}