import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import express from "express";
import multer from "multer";
import Images from "../Models/Images.js";
// Firebase konfigürasyon bilgilerini içe aktarın
import { firebaseConfig } from "../config/firebase.js";
import Policies from "../Models/Policies.js";

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
        const policieData = req.body;
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

        const createPolicie = await Policies.create({
            ...policieData,
            image: addImage._id
        });

        return res.send({
            message: 'Partner eklendi',
            data: createPolicie
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const policies = await Policies.find().populate('image');
        return res.status(200).json({success: true, data: policies});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const policyData = req.body;
        const editedPolicy = await Policies.findByIdAndUpdate({_id: id}, policyData);
        return res.status(200).json({success: true, data: editedPolicy});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const policies = await Policies.findByIdAndDelete({_id: id});
        return res.status(200).json({success: true, data: policies});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}
// Router'ı dışa aktarın
export default router;
