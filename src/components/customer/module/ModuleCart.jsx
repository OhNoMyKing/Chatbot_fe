// import React, { useContext } from 'react';
// import { CartContext } from '../../../context/CartProvider';

import { useContext, useEffect, useState } from "react";
import CartService from "../../service/CartService";
import { PaginationContext } from "../../../context/PaginationContext";
import Pagination from "../../common/Pagination";
import { Link, useNavigate } from "react-router-dom";


function ModuleCart() {
    const { noPage, setNoPage, totalPage, setTotalPage } = useContext(PaginationContext);
    const navigate = useNavigate();
    const [cartResponse, setCartResponse] = useState([]);
    const [click, setClick] = useState(false);
    // const { cartItems } = useContext(CartContext);
    // console.log(cartItems.orderItemResponseList)

    useEffect(() => {
        // Fetch users data when the component mounts
        fetchSportswear();
    }, [noPage, totalPage]);

    // const [listOrderItemResponse, setListOrderItemResponse] = useState([]);
    const fetchSportswear = async () => {
        try {

            const token = localStorage.getItem('token');
            const data = await CartService.getCart(token, noPage) // Assuming the list of users is under the key 'ourUsersList'
            console.log(data)
            setCartResponse(data)

            setNoPage(data.currentPage)
            setTotalPage(data.totalPage)

        } catch (error) {
            console.log('Error fetching users:');
        }
    };
    // const [quantity, setQuantity] = useState(1);
    const clearCart = async () => {

        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            try {

                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await CartService.clearCart(token)
                console.log(response)
                if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                    window.alert("Đã thêm vào giỏ hàng!");
                    navigate("/cart-user")
                }


            } catch (error) {
                console.log("error")
            }

        }

        // Update the cart in the backend
        // ...
    };
    const deleteByID = async (index) => {

        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {

                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await CartService.deleteOrderItemByID(token, cartResponse.cartItemResponseList[index].id)
                console.log(response)
                if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                    window.alert("Đã xóa vào giỏ hàng!");
                }


            } catch (error) {
                console.log("error")
            }
        }
        // Update the cart in the backend
        // ...
    };
    const increaseQuantity = async (index) => {


        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await CartService.increaseQuantity(token, cartResponse.cartItemResponseList[index].id)
            // console.log(response)
            const updatedCart = [...cartResponse.cartItemResponseList];
            updatedCart[index].quantity = updatedCart[index].quantity + 1;
            updatedCart[index].totalAmount = updatedCart[index].totalAmount + updatedCart[index].price;
            setCartResponse({
                ...cartResponse,
                cartItemResponseList: updatedCart,
                totalAmount: cartResponse.totalAmount + updatedCart[index].price
            });

        } catch (error) {
            console.log("error")
        }
        // Update the cart in the backend
        // ...
    };

    const decreaseQuantity = async (index) => {


        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await CartService.decreaseQuantity(token, cartResponse.cartItemResponseList[index].id)
            // console.log(response)
            const updatedCart = [...cartResponse.cartItemResponseList];
            updatedCart[index].quantity = updatedCart[index].quantity - 1;
            updatedCart[index].totalAmount = updatedCart[index].totalAmount - updatedCart[index].price;

            setCartResponse({
                ...cartResponse,
                cartItemResponseList: updatedCart,
                totalAmount: cartResponse.totalAmount - updatedCart[index].price
            });
        } catch (error) {
            console.log("error")
        }
    };
    return (
        <div style={{ marginTop: '30px' }}>
            <div class="cart-page">
                <div class="container">
                    <div class="cart-table">
                        <table>
                            <thead>
                                <tr>
                                    <th class="product-h">Product</th>
                                    <th>Price</th>
                                    <th class="quan">Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartResponse.cartItemResponseList && cartResponse.cartItemResponseList.map((item, index) => (
                                    <tr key={index}>
                                        <td class="product-col">
                                            <img src={item.image} alt="" />
                                            <div class="p-title">
                                                <h5>{item.sportswear_name}</h5>
                                            </div>
                                        </td>
                                        <td class="price-col">${item.price}</td>
                                        <td class="quantity-col">

                                            <div class="pro-qty">
                                                <button className='btn btn-white  px-3' onClick={() => decreaseQuantity(index)} disabled={item.quantity === 1}>
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <input type="text" value={item.quantity} />
                                                <button className='btn btn-white px-3' onClick={() => increaseQuantity(index)}>
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>

                                        </td>
                                        <td class="total">${item.totalAmount}</td>
                                        <td class="product-close"><button className='btn btn-white px-3' onClick={() => deleteByID(index)}>
                                            <i class="fa-solid fa-trash"></i>
                                        </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <div className="cart-btn">
                        <div class="row">
                            <div class="col-lg-6">
                                {/* <div class="coupon-input">
                                    <input type="text" placeholder="Enter cupone code" />
                                </div> */}

                            </div>
                            <div class="col-lg-5 offset-lg-1 text-left text-lg-right">
                                <div class="site-btn clear-btn" onClick={clearCart}>Clear Cart</div>
                                <Link to={"/checkout"} class="site-btn update-btn btn-warning" >Proceed to checkout</Link>
                            </div>
                        </div>
                        <Pagination />
                    </div>




                </div>


            </div>
        </div>
    );
}

export default ModuleCart;