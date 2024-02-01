import express from "express";
import Settings from "../models/Settings.js";
import Banks from "../models/Banks.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { 
            phone, 
            email, 
            instagram, 
            facebook,
            company_mails,
            twitter, 
            address, 
            city, 
            district, 
            tax_administration, 
            tax_no } = req.body;
        const createSetttings= await Settings.create({
            phone, 
            email, 
            instagram, 
            company_mails,
            facebook, 
            twitter, 
            tax_informations: {
                address, 
                city, 
                district, 
                tax_administration, 
                tax_no
            }
        });
        return res.status(201).json({success:true, msg:'Düzenlemeler başarılı', data: createSetttings});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/bank-accounts', async (req, res) => {
    try {
        const bankData = req.body;
        const createBankData = await Banks.create(bankData);
        return res.status(201).json({success:true, msg:'Hesap başarıyla oluşturuldu.', data: createBankData});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const findSettings = await Settings.find();
        return res.status(200).json({success:true, msg:'Düzenlemeler getirildi.', data: findSettings});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Settings.findByIdAndUpdate({_id: id}, req.body);
        return res.status(200).json({success:true, msg:'Güncelleme başarılı'});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/bank-accounts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Banks.findByIdAndUpdate({_id: id}, req.body);
        return res.status(200).json({success:true, msg:'Güncelleme başarılı'});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/bank-accounts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBank = await Banks.findByIdAndDelete({_id: id});
        return res.status(200).json({success:true, msg:'Silme başarılı', data: deleteBank});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;