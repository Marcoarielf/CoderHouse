import React, {useState,useContext, useEffect} from 'react';
import DatosForm from './datos_form'
import './formBuy.css'
import {CartContext} from '../../Context/CartContext'
import {getFirestore} from '../../Firebase/index'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function FormBuy() {

    const[send,setSend] = useState(false);
    const [cart,setCart] = useContext(CartContext);
    const [processOrder,setProcessOrder] = useState(false);
    const [banderaCart, setBanderaCart] = useState(true);

    const[datos, setDatos] = useState({
        fullName: null, 
        phone: null, 
        mail: null, 
        dir: null, 
        cp: null, 
        card: null, 
        expireCart: null, 
        securityCode: null, 
    })

    function handleSubmit(e){
        e.preventDefault();
        setSend(true);
        
        }

        useEffect( () => {
            if(datos.fullName != null &&
                datos.phone != null &&
                datos.mail != null &&
                datos.dir != null &&
                datos.cp != null &&
                datos.card != null &&
                datos.expireCart != null &&
                datos.securityCode != null){
                    const db = getFirestore();
                    const order = db.collection("Ordenes");
                    cart.map( (itemCurrent,i) => {
                        const dataOrden = {
                            buyer:datos,
                            idItem: cart[i]
                        }
                        // Add a new document in collection
                        order.add(dataOrden).then(({id}) => {
                            cart.splice(0, 1);
                            banderaCart ?  setBanderaCart(false) : setBanderaCart(true);
                            console.log(cart);
                            alert("Se genero tu órden. Número de seguimiento: " + id);
                        });
                    });
                }
        }, [send]);

    function handleChange(e){
        e.persist();
        setDatos((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        
    }

    return (
        <div className="conteinerForm">
            <form onSubmit={handleSubmit}>
                <div className="conteinerInfo">
                    <div className="flex">
                        <div className="datosPersonales">
                            <h2>Datos personales</h2>
                            <DatosForm onChange={handleChange} type="text" placeholder="Nombre y apellido" datos={datos.fullName} send={send} setSend={setSend} name="fullName" />
                            <DatosForm onChange={handleChange} type="number" placeholder="Telefono de contacto" datos={datos.phone} send={send} setSend={setSend} name="phone"/>
                            <DatosForm onChange={handleChange} type="mail" placeholder="Ingresa tu email" datos={datos.mail} send={send} setSend={setSend} name="mail"/>
                            <DatosForm onChange={handleChange} type="text" placeholder="Domicilio" datos={datos.dir} send={send} setSend={setSend} name="dir"/>
                            <DatosForm onChange={handleChange} type="number" placeholder="Código postal" datos={datos.cp} send={send} setSend={setSend} name="cp"/>
                        </div>
                        <div className="datosCompra">
                            <h2>Datos de la compra</h2>
                            <DatosForm onChange={handleChange} type="number" placeholder="Tarjeta NRO" datos={datos.card} send={send} setSend={setSend} name="card"/>
                            <DatosForm onChange={handleChange} type="number" placeholder="Fecha vencimiento" datos={datos.expireCart} send={send} setSend={setSend} name="expireCart"/>
                            <DatosForm onChange={handleChange} type="number" placeholder="Código seguridad" datos={datos.securityCode} send={send} setSend={setSend} name="securityCode"/>
                        </div>
                    </div>

                    <input className="enviar" type="submit" value="Enviar" />
                    <Link to='/cart'><button className="cancelar">Cancelar</button></Link>
                </div>
            </form>
            <img src="https://cdn.pixabay.com/photo/2017/09/18/08/56/credit-card-2761073_960_720.png"></img>
        </div>
      )
  
  }
  
  export default FormBuy;