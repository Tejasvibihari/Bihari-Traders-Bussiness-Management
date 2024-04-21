import Wholesale from '../models/wholeSaleModel.js';

export const addWholesale = async (req, res) => {
    const { productName, name, category, brand, weight, quantity, cft, userId } = req.body
    try {
        const createWholesale = new Wholesale({
            productName,
            name,
            category,
            brand,
            weight,
            quantity,
            cft,
            userId
        })
        await createWholesale.save()
        res.status(200).json({ message: "Wholesale added successfully" })

    } catch (error) {
        console.log(error);
    }
}

export const updateWholesale = async (req, res) => {
    const { id, quantity, weight, cft } = req.body;
    try {
        const updatedWholesale = await Wholesale.findOneAndUpdate(
            { _id: id },
            { $set: { quantity, weight, cft } },
            { new: true } // This option returns the updated document
        );
        // console.log(updatedInventory);
        res.json({ message: "Wholesale updated successfully", data: updatedWholesale });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while updating the inventory" });
    }
};
