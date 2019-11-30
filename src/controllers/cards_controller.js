const mysql = require('../../mysql.js');

exports.insert_card_challenge = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({error: err})}
        conn.query(
            `insert into challenges(category_challenge, title, description_challenge, points)`
            + `values(?,?,?,?)`,
            [
                req.body.category,
                req.body.title,
                req.body.description,
                req.body.points,
            ],
            (error, results, fields) => {
                conn.release();
                if (error) {
                    res.status(500).send({
                        error: error
                    });
                } else {
                    res.status(201).send({
                        message: 'card inserted'
                    })
                }
            }
            )

    })
}

exports.delete_card_challenge = (req, res, next) => {
    mysql.getConnection((err, conn ) => {
        if (err) {
            return res.status(500).send({error: err})}
        conn.query(
            `delete challenges from education_project.challenges where idChallenges=`+req.body.idChallenge,
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
                if (error) {
                    res.status(500).send({error: error})
                } else {
                    res.status(201).send({message: "card updated"})
                }
            }
        )
    })
}

exports.get_cards_challage = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({error: err})}
        conn.query(
            `select * from education_project.challenges;`,
            (error, results) => {
                if (error) {
                    res.status(500).send({error: error})
                } else {
                    res.status(200).send(results)
                }
            }
            )
    })
}