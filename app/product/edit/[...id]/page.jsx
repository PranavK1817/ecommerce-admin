"use client"
import Layout from "@/app/components/Layout";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";
import axios from "axios";
import ProductForm from "@/app/components/ProductForm";

export default function EditProductPage(){
    const [productInfo, setProductInfo] = useState(null);
    const router = usePathname();
    const index = router.lastIndexOf('/');
    const id = router.substring(index+1,router.length);
    
    useEffect(()=>{
        axios.get('/api/products?id='+id).then(response =>{
           const responseArray = response.data;
           
            const product = responseArray.filter((product)=>{
                if(product._id == id){
                    return product;
                }
            })
           setProductInfo(product[0]);
        })
    },[id]);
    return(
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm {...productInfo}/>
            )}
        </Layout>
    )
}