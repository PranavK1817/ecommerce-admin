"use client"
import Layout from "@/app/components/Layout";
import ProductForm from "@/app/components/ProductForm";

export default function NewProduct(){
    return (
        <Layout>
            <h1 >New Product</h1>
            <ProductForm/>
        </Layout>
    )
}