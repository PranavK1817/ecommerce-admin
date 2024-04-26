// app/api/products/route.js
import Product from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';


await mongooseConnect();


export async function POST(req,res){
  
  const {title,description,price} = await req.json();
  
  const newProduct = new Product({title,description,price});

  await newProduct.save();

  return NextResponse.json(newProduct);
}

export async function GET(req,res){

  if(req.query?.id){
    return NextResponse.json(await Product.findOne({_id:req.query.id}));
  }else{
    return NextResponse.json(await Product.find());
  }
  
}

export async function PUT(req,res){

  const {title,description,price,_id} = await req.json();

  await Product.updateOne({_id},{title,description,price});

  return NextResponse.json(true);
}

export async function DELETE(req,res){
  const path = req.url;
  const id = path.substring(path.lastIndexOf('=')+1,path.length);
  await Product.deleteOne({_id:id});
  return NextResponse.json(true);
}
