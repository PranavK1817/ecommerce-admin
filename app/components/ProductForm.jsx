import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

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

    async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            const data = new FormData();
            for(const file of files){
                data.append('file',file)
            }
            const response = await axios.post('/api/upload',data);
            console.log(response);
        }
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