import { useContext, useEffect, useState } from "react";
import CartService from "../../service/CartService";
import { PaginationContext } from "../../../context/PaginationContext";
import Pagination from "../../common/Pagination";

function ModuleCheckout() {
    const { noPage, setNoPage, totalPage, setTotalPage } = useContext(PaginationContext);
    const [checkoutResponse, setCheckoutResponse] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [orders, setOrders] = useState({
        fullName: "",
        shipping_id: null,
        payment_id: null,
        address: "",
        phone: "",
        cartID: "",

    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'shipping_id') {
            if (value !== 'Choose Shipment') {
                console.log(value)
                const selectedShipping = checkoutResponse.shippingResponseList.find((item) => item.id === parseInt(value));
                setShippingFee(selectedShipping.shippingFee);
            } else {
                setShippingFee(0);
            }
        }

        setOrders({ ...orders, [name]: value });
    };
    useEffect(() => {

        fetchSportswear();
    }, [noPage, totalPage]);

    const fetchSportswear = async () => {
        try {

            const token = localStorage.getItem('token');
            const response = await CartService.getCheckout(token, noPage)
            setNoPage(response.currentPage)
            setTotalPage(response.totalPage) // Assuming the list of users is under the key 'ourUsersList'

            setCheckoutResponse(response)
            setOrders({ ...orders, cartID: response.cartID });

        } catch (error) {
            console.log('Error fetching users:');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(orders)
        try {

            const token = localStorage.getItem('token');
            const response = await CartService.createOrders(token, orders)
            if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                window.alert("Đặt hàng thành công!");
            }
        } catch (error) {
            console.log('Error fetching users:');
        }
    }

    return (
        <div classNameName="" style={{ marginTop: '30px' }}>
            <div className="cart-total-page spad">
                <div className="container">
                    <h3>Your Information</h3>
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="row">
                            <div className="col-lg-12">

                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="form-group">
                                        <label for="email">Full name</label>
                                        <input type="name" className="form-control" id="name" name="fullName" onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label for="email">Address</label>
                                        <input type="name" className="form-control" id="name" name="address" onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label for="email">Phone</label>
                                        <input type="name" className="form-control" id="name" name="phone" onChange={handleChange}
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="form-group">
                                        <label for="categoryName">Shipment</label>
                                        <div className="input-select">
                                            <select className="form-select" name="shipping_id" onChange={handleChange}
                                            >
                                                <option >Choose Shipment</option>
                                                {checkoutResponse.shippingResponseList && checkoutResponse.shippingResponseList.map((item, index) => (
                                                    <option key={item.id} value={item.id}>{item.shippingMethod}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label for="categoryName">Payment</label>
                                        <div className="input-select">
                                            <select className="form-select" name="payment_id" onChange={handleChange}
                                            >
                                                <option >Choose Payment</option>
                                                {checkoutResponse.paymentResponseList && checkoutResponse.paymentResponseList.map((item, index) => (
                                                    <option key={item.id} value={item.id}>{item.paymentMethod}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="cart-detail">


                                            <ul>

                                                <h6 className="fw-semibold mb-1 text-warning">Total Cart</h6>
                                                <strong><li>Total Amount: ${checkoutResponse.totalAmount} ({checkoutResponse.totalQuantity} items)</li></strong>

                                            </ul>

                                            {checkoutResponse.cartItemResponseList && checkoutResponse.cartItemResponseList.map((item, index) => (
                                                <div className="card card-body" key={item.id} style={{ marginTop: '10px' }}>
                                                    <div className="media align-items-center align-items-lg-start  text-lg-left flex-column flex-lg-row">
                                                        <div className="mr-2 mb-3 mb-lg-0">

                                                            <img src={item.image} width="150" height="150" alt="" />

                                                        </div>

                                                        <div className="media-body">
                                                            <h6 className="media-title font-weight-semibold">
                                                                {item.sportswear_name}
                                                            </h6>

                                                            <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                                                <li className="list-inline-item text-secondary"><strong>Size :</strong></li>
                                                                <li className="list-inline-item">{item.size}</li>

                                                            </ul>
                                                            <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                                                <li className="list-inline-item text-secondary"><strong>Quantity :</strong></li>
                                                                <li className="list-inline-item">{item.quantity}</li>

                                                            </ul>

                                                            {/* <p className="mb-3 text-dark">{item.description} </p> */}

                                                            {/* <ul className="list-inline list-inline-dotted mb-0">
                                                                <li className="list-inline-item">All items from <a href="#" data-abc="true">Mobile point</a></li>
                                                                <li className="list-inline-item">Add to <a href="#" data-abc="true">wishlist</a></li>
                                                            </ul> */}
                                                        </div>

                                                        <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                                                            {/* <h4 className="mb-0 font-weight-semibold"><strong>${item.unitPrice} </strong> <span className="text-danger">x {item.quantity_ordered}</span></h4>

                                                            <div>
                                                                <i className="ti ti-star text-danger"></i>
                                                                <i className="ti ti-star text-warning"></i>
                                                                <i className="ti ti-star text-success"></i>
                                                                <i className="ti ti-star text-dark"></i>
                                                                <i className="fa fa-star"></i>

                                                            </div> */}

                                                            <div className="text-success">Total<h5><strong className="text-danger">${item.price} </strong> <span className="text-dark">x {item.quantity}</span></h5></div>

                                                            {/* <button type="button" onClick={() => handleViewAndEdit(item)} className="btn btn-warning mt-4 text-white" ><i className="icon-cart-add mr-2"></i>View and Edit</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <Pagination />

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div class="row">
                                <div class="col-lg-12">

                                    <div class="total-info">
                                        <div class="total-table">
                                            <table className="table text-nowrap mb-0 align-middle">
                                                <thead className="text-dark fs-4">
                                                    <tr>

                                                        <th className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">Total Cart</h6>
                                                        </th>
                                                        <th className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">Shipping Fee</h6>
                                                        </th>

                                                        <th className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0">Total Final</h6>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>

                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">${checkoutResponse.totalAmount}</h6>

                                                        </td>

                                                        <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="badge bg-primary rounded-3 fw-semibold">${shippingFee}</span>
                                                            </div>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-0 fs-4">${checkoutResponse.totalAmount + shippingFee}</h6>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>


                                    </div>
                                </div>
                                <div className="payment-method">

                                    <button type="submit">Place your order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} export default ModuleCheckout;