"use client"

import Layout from "@/app/components/Layout";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
export default function DeleteProduct(){
    const router = useRouter();
    const path = usePathname();
    const index = path.lastIndexOf('/');
    const id = path.substring(index+1,router.length);

    const [productInfo, setProductInfo] = useState({});

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response =>{
            const responseArray = response.data;
           
            const product = responseArray.filter((product)=>{
                if(product._id == id){
                    return product;
                }
            });
            setProductInfo(product[0]);
        })
    },[id]);

    function goBack(){
        router.push('/product');
    }

    async function deleteProduct(){
        await axios.delete('/api/products?id='+id)
        goBack();
    }

    return(
        <Layout>
            <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-center">Do you really want to delete &nbsp;&quot;{productInfo.title}&quot; ? </h1>
            <div className="flex gap-2 justify-center">
                <button 
                onClick={deleteProduct}
                className="btn-red">
                    YES 
                </button>
                <button 
                    onClick={goBack} 
                    className="btn-default">
                    NO 
                </button>
            </div>
            </div>
            
            
        </Layout>
    )
}