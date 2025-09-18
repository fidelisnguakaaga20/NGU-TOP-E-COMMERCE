import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import products from "../../data/products.json"
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
    const {categoryName} = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() =>{
        const filtered = products.filter((product) => product.category === categoryName.toLowerCase
        ());

        setFilteredProducts(filtered);
    } , [categoryName])

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    
  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p>Makeup, skincare, and beauty tools—curated for every glow.</p>
    </section>

    {/* products card */}
    <div className='section__container'>
        <ProductCards products={filteredProducts}/>
    </div>
    </>
  )
}

export default CategoryPage