import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import express from "express";
import multer from "multer";
import Images from "../Models/Images.js";

// Firebase konfigürasyon bilgilerini içe aktarın
import { firebaseConfig } from "../config/firebase.js";
import Banner from "../models/Banner.js";

// Express Router oluşturun
const router = express.Router();

// Firebase'i başlatın ve depolama referansını alın
const firebase = initializeApp(firebaseConfig);
const storage = getStorage();

// Multer middleware ile dosya yükleme yapılandırması
const upload = multer({ storage: multer.memoryStorage() });

// Resim yükleme endpoint'i
router.post("/add-banner", upload.single("filename"), async (req, res) => {
    try {
        const { title, description, url, category } = req.body;
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

        const createBanner = await Banner.create({
            title,
            description,
            url,
            category,
            image: addImage._id
        });

        return res.status(201).json({
            message: 'Banner eklendi',
            data: createBanner
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const { category, id, title, is_active } = req.query;
        const bannerFilters = [];
        if(id) {
            bannerFilters.push({_id: id})
        }
        if(title) {
            bannerFilters.push({title: title });
        }
        if(is_active) {
            bannerFilters.push({is_active: is_active });
        }

        if(bannerFilters.length > 0) {
            const banners = await Banner.find({$or: bannerFilters}).populate('image');
            return res.status(200).json({ message: 'OK', data: banners });
        } else {
            const banners = await Banner.find().populate('image')
            return res.status(200).json({ data: banners });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
       const { id } = req.params;
       const editData = req.body;
       const editBanner = await Banner.findByIdAndUpdate({_id: id}, editData);
       return res.status(200).json({success: true, msg: 'Güncelleme başarılı', data: editBanner}); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBanner = await Banner.findByIdAndDelete({_id: id});
        return res.status(200).json({success: true, msg: 'Silme başarılı', data: deleteBanner});
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
