import { useState, useEffect } from 'react'
/* import { getProductos, getProductosPorCategoria } from '../../asyncmock' */
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import './ItemListContainer.css'
//Importamos nuevas funciones:
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../services/firebase/config';

const ItemListContainer = ({ greeting }) => {
    const [products, setProductos] = useState([]);

    const { idCategoria } = useParams();

    useEffect(() => {
        const misProductos = idCategoria ? query(collection(db, "productos"), where("idCat", "==", idCategoria)) : collection(db, "productos");

        getDocs(misProductos)
            .then(res => {
                const nuevosProductos = res.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setProductos(nuevosProductos);
            })
            .catch(error => console.log(error))
    }, [idCategoria])


    return (
        <>
            <h2 style={{ textAlign: "center" }}> {greeting} </h2>
            <ItemList products={products} />
        </>
    )
}

export default ItemListContainer