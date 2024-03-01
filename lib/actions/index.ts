"use server";

import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { get } from "http";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { connect } from "http2";
import { IM_Fell_Double_Pica } from "next/font/google";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";
export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.urL });

    if (existingProduct) {
      const updatePriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatePriceHistory,
        lowestPrice: getLowestPrice(updatePriceHistory),
        highestPrice: getHighestPrice(updatePriceHistory),
        average: getAveragePrice(updatePriceHistory),
      };
    }
    console.log("old" + product)
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );
    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    console.log(error);
  }
}

export async function getProductById(productId: String) {
    try {
        connectToDB();

        const product = await Product.findOne({_id: productId});

        if(!product) return null;

      return product;
    } catch (error) {
      console.log(error);  
    }
}

export async function getAllproducts(){
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
    
  }
}
export async function getsimilarProducts(productId: string){
  try {
    connectToDB();

    const currentProduct = await Product.find();

    if(!currentProduct) return null;

    return similarProducts = await Product.find({
      _id:{ $ne: productId}
    }).limit(3);
  } catch (error) {
    console.log(error);
    
  }
} 
 

export async function addUserEmailToProduct(productId:string, userEmail: string) {
  try {
    const product = await Product.findById(productId);

    if(!product) return;

    const userExists = product.users.some((user:User) => user.email === userEmail);

    if(!userExists) {
        product.users.push({ email : userEmail})

        await product.save();
        
        const emailContent = await generateEmailBody(product, "WELCOME");

        await sendEmail(emailContent, [userEmail]);
        }
  } catch (error) {
    console.log(error);
  }
}

