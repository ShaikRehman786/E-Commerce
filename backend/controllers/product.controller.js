import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

// ---------------- GET ALL PRODUCTS ----------------
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------- GET FEATURED PRODUCTS ----------------
export const getFeaturedProducts = async (req, res) => {
    try {
        let featured = await redis.get("featured_products");

        if (featured) {
            return res.json(JSON.parse(featured));
        }

        featured = await Product.find({ isFeatured: true }).lean();

        await redis.set("featured_products", JSON.stringify(featured));

        res.json(featured);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------- CREATE PRODUCT ----------------
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, imageUrl, category } = req.body;

        let cloudinaryUrl = "";

        // If admin uploaded an image
        if (image) {
            const uploaded = await cloudinary.uploader.upload(image, {
                folder: "products",
            });
            cloudinaryUrl = uploaded.secure_url;
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryUrl, // cloudinary upload
            imageUrl,             // pasted URL
            category,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// ---------------- DELETE PRODUCT ----------------
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // delete cloudinary image if exists
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`products/${publicId}`);
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------- RECOMMENDED PRODUCTS ----------------
export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 4 } },
            { $project: { name: 1, description: 1, image: 1, price: 1 } },
        ]);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------- GET BY CATEGORY ----------------
export const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------- TOGGLE FEATURED ----------------
export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isFeatured = !product.isFeatured;

        const updated = await product.save();
        await updateFeaturedProductsCache();

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------- UPDATE REDIS CACHE ----------------
async function updateFeaturedProductsCache() {
    const featured = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featured));
}
