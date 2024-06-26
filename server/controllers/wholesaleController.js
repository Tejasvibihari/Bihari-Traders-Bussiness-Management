import Wholesale from '../models/wholeSaleModel.js';

export const addWholesale = async (req, res) => {
    const { name, clientName, category, brand, weight, quantity, cft, userId } = req.body
    try {
        const createWholesale = new Wholesale({
            name,
            clientName,
            category,
            brand,
            weight,
            quantity,
            cft,
            userId
        })
        await createWholesale.save()
        res.status(200).json({ createWholesale, message: "Client added successfully" })

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
export const getWholesale = async (req, res) => {
    const { userId } = req.body;
    try {
        const wholesale = await Wholesale.find({ userId });
        res.status(200).json(wholesale);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
