import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';

const ProductGrid = (props) => {
    return (
        <div className={styles.shop__grid}>
            {
                props.products.map((product) => (
                    <ProductCard product={product} key={product.id}/>
                ) )
            }
        </div>
    );
}

export default ProductGrid;