import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "./productSlice"
import loader from "../../assects/images/loader.gif"
import ProductList from "./ProductList"
import "./Product.css"

const Product = () => {
    const loading = useSelector((state) => state.product.loading)
    const data = useSelector((state) => state.product.data)
    console.log(loading, data);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

  
    return(
        <>
            <h1>All Products</h1>
            <div className="listing-section">

                {loading ?
                    <img src={loader}/> 
                 : 
                 data?.products?.length > 0 ?
                 <ProductList
                  data={data?.products}
                /> 
                :
                 <div>
                     <p>No products found</p>
                 </div>

                }
            </div>
        </>
    )
}

 

export default Product