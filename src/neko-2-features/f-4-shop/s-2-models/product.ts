import mongoose, {Schema, Document} from "mongoose";

export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    productName: string;
    price: number;

    productType: string;
    rating: number;

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const Product: Schema = new Schema(
    {
        productName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        productType: {
            type: String,
        },
        rating: {
            type: Number,
        }

    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
);

export default mongoose.model<IProduct>('product', Product);
