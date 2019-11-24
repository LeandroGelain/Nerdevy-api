const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mysql = require('../../mysql');

exports.insert_user = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({error: err});
        } else {
            conn.query('select 1 from users where email = ?', [req.body.email], (err, results) => {
                if (err) {
                    return res.status(500).send({error: err})
                } else if (results.length > 0) {
                    res.status(500).send({error: "Usuario já cadastrado!"});
                } else {
                    bcrypt.hash(req.body.pwd, 10 , (errBcrypt, hash) => {
                        if (err) {
                            res.status(500).send({error: errBcrypt});
                        } else {
                            conn.query(
                                `insert into users (email, username, first_name, last_name, pwd, category, institution ,age, city, state, country, points_user)`
                                + `values(?,?,?,?,?,?,?,?,?,?,?,?)`, 
                                [
                                    req.body.email,
                                    req.body.username,
                                    req.body.first_name,
                                    req.body.last_name,
                                    hash,
                                    req.body.category,
                                    req.body.institution,
                                    req.body.age,
                                    req.body.city,
                                    req.body.state,
                                    req.body.country,
                                    0
                                ],
                                (error, results, fields) => {
                                    conn.release();
                                    if (error) {
                                        res.status(500).send({
                                            error: error
                                        });
                                    } else {
                                        let token = jwt.sign({
                                            email: req.body.email,
                                            pwd: req.body.pwd,
                                            id_user: req.body.id_user
                                        }, 'education_method',{});
                                        res.status(201).send({
                                            id_user: results.insertId,
                                            token: token
                                        });
                                    }
                                }
                            );
                        }
                    })
                }
            });
        }
    });
}

exports.login = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({error:err})
        }
        conn.query(`select * from users where email = ?`,[req.body.email], (error, results) => {
            conn.release();
            if (error) {
                return res.status(500).send({error:error})
            }
            if (results.length < 1) {
                return res.status(401).send({error: 'Usuario não exite no banco!'})
            }
            else {
                bcrypt.compare(req.body.pwd, results[0].pwd, (errBcrypt, result) => {
                    if (errBcrypt) {
                        return res.status(401).send({error: 'Erro senha'})
                    }
                    if (result) {
                        let token = jwt.sign({
                            email: results[0].email,
                            first_name: results[0].first_name,
                            id_user: results[0].id_user
                        }, 'education_method',{});
                        return res.status(200).send({
                                email: results[0].email,
                                first_name: results[0].first_name,
                                id_user: results[0].id_user,
                                token: token,
                                message: 'Success'
                        });
                    } else {
                        return res.status(401).send({error: 'Falha na autenticação'})
                    }
                });
            }
        }); 
    });
}