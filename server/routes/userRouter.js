import User from "../models/User.js";
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const router = express.Router();

// Create User

router.post('/register', async (req, res) => {
try {
    const { fullname, email, password, role } = req.body;
    const userExist = await User.findOne({email: email});

    if (userExist) return res.send({ message: 'Bu maile sahip başka bir kullanıcı var. Lütfen başka bir mail ile kayıt olmayı deneyiniz.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
        fullname,
        email,
        role,
        password: hashedPassword
    });

    const userWithoutPassword = {...createUser.toObject(), password: undefined }
    return res.status(201).json({ success: true, message:'Kullanıcı Oluşturuldu.', data: userWithoutPassword});
} catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Login Api

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});

        if(!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });

        const verifyPass = await bcrypt.compare(password, user.password);

        if( !verifyPass ) {
            return res.status(400).json({ message: 'Parola hatalı' });
        } else {
            const userId = user.id;
            const accessToken = jwt.sign({userId}, accessTokenSecret, { expiresIn: '1h'} );
            const refreshToken = jwt.sign({userId}, refreshTokenSecret, { expiresIn: '1h'} );

            return res.status(200).json({ message: 'Giriş Yapıldı', access: accessToken, refresh: refreshToken });
        }

    } catch (error) {
        return res.sendStatus(500).json({ error: error.message });
    }
});

// User Info api

router.get('/get-me', async (req, res) => {
    try {
        const { id } = req.query;
        const findUser = await User.findOne({ _id: id }, { password: 0 });
        console.log(findUser);
        
        if( !findUser) return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });

        return res.status(200).json({ message: 'Bilgiler getirildi', data: findUser });

    } catch (error) {
        return res.sendStatus(500).json({ error: error.message });
    }
});
export default router;