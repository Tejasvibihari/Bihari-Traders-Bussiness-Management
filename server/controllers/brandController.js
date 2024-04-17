import Brand from "../models/brandModel.js";

export const createBrand = async (req, res) => {
    const { brandName, brandCategory } = req.body;
    try {
        const existingBrand = await Brand.findOne({ brandName });
        if (existingBrand) return res.status(400).json({ message: "Brand already exists" });

        const createBrand = new Brand({
            brandName,
            brandCategory
        });

        await createBrand.save();
        res.json({ message: "Brand Created Successfully" })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message });
    }
}

export const getBrand = async (req, res) => {
    const { category } = req.body;
    try {
        const brandData = await Brand.find({ brandCategory: category });
        res.json(brandData)
    } catch (error) {
        console.log(error)
    }
}
