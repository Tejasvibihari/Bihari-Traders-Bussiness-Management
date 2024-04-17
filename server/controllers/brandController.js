import Brand from "../models/brandModel.js";

export const createBrand = async (req, res) => {
    const { brandName } = req.body;
    try {
        const existingBrand = await Brand.findOne({ brandName });
        if (existingBrand) return res.status(400).json({ message: "Brand already exists" });

        const createBrand = new Brand({
            brandName
        });

        await createBrand.save();
        res.json({ message: "Brand Created Successfully" })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message });
    }
}

export const getBrand = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands)
    } catch (error) {
        console.log(error)
    }
}
