import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import express from "express";
import multer from "multer";
import Images from "../Models/Images.js";

// Firebase konfigürasyon bilgilerini içe aktarın
import { firebaseConfig } from "../config/firebase.js";
import Partner from "../Models/Partner.js";

// Express Router oluşturun
const router = express.Router();

// Firebase'i başlatın ve depolama referansını alın
const firebase = initializeApp(firebaseConfig);
const storage = getStorage();

// Multer middleware ile dosya yükleme yapılandırması
const upload = multer({ storage: multer.memoryStorage() });

// Resim yükleme endpoint'i
router.post("/", upload.single("filename"), async (req, res) => {
    try {
        const { label, url } = req.body;
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `${req.file.originalname}`);
        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const addImage = await Images.create({
            name: req.file.originalname,
            url: downloadURL,
        });

        const createPartner = await Partner.create({
            label,
            url,
            logo: addImage._id
        });

        return res.status(201).json({
            message: 'Partner eklendi',
            data: createPartner
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const partners = await Partner.find().populate('logo');
        return res.status(200).json({success: true, data: partners});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}
// Router'ı dışa aktarın
export default router;
