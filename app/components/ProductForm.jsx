import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useRef } from 'react';

export default function ProductForm({
    _id,
    title:existingTitle,
    description: existingDescription,
    price:existingPrice,
    images,
})
    {
    const router = useRouter();
    const [title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');
    const [goToProduct,setGoToProduct] = useState(false);
    
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title,description,price};
        if(_id){
            await axios.put('/api/products',{...data,_id});
        }else{
            await axios.post("/api/products",{...data,_id:null});
            setTitle("");
            setDescription("");
            setPrice("");
        }
        setGoToProduct(true);  
    }
    if(goToProduct){
        return router.push('/product');
    }

    async function uploadImages(event){
        event.preventDefault();

        const file = inputFileRef.current.files;

        const response = await fetch(
          `/api/upload?filename=${file.name}`,
          {
            method: 'POST',
            body: file,
          },
        );

        const newBlob = (await response.json());

        setBlob(newBlob);
      }
    return(
        <>
            <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input 
            type="text" 
            placeholder="product name" 
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            />

            <label>
                Photos 
            </label>
                <div className="mb-2">
                    <label className="w-24 h-24 cursor-pointer text-center flex text-sm  gap-1 text-gray-500 font-bold items-center justify-center rounded-lg bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                        <div>
                            Upload 
                        </div>
                        <input type="file" className="hidden" onChange={uploadImages} />
                    </label>
                    {!images && (
                        <div>No photos in this product</div>
                    )}
                </div>
            <label >Product Description</label>
            <textarea 
            placeholder="description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            />

            <label >Product Price (in USD)</label>
            <input type="text" placeholder="price"
            value={price}
            onChange={ev => setPrice(ev.target.value)}
            />

            <button className="btn-primary" 
            type="submit"
            >Save</button>

            </form>
        </>
    )
}