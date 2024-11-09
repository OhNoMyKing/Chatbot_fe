import { useContext, useEffect, useState } from "react";
import { PaginationContext } from "../../../context/PaginationContext";
import OrderService from "../../service/OrderService";

function ModuleOrderAdmin() {
    const { noPage, setNoPage, totalPage, setTotalPage } = useContext(PaginationContext);
    const [orderResponse, setOrderResponse] = useState([]);
    const [status, setStatus] = useState(1);
    const statusOne = () => {
        setStatus(1) // Navigate to the details page
    };
    const statusTwo = () => {
        setStatus(2) // Navigate to the details page
    };
    const statusThree = () => {
        setStatus(3) // Navigate to the details page
    };
    const statusFour = () => {
        setStatus(4) // Navigate to the details page
    };
    useEffect(() => {

        fetchSportswear();
    }, [noPage, totalPage, status]);
    const fetchSportswear = async () => {
        try {

            const token = localStorage.getItem('token');
            const response = await OrderService.getAllOrderForAdminByStatus(token, status, noPage)
            setOrderResponse(response)

            console.log(response)

        } catch (error) {
            console.log('Error fetching users:');
        }
    };
    const setStatusOrderOneByIndex = async (index) => {

        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            try {

                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await OrderService.setOrderStatus(token, 1, orderResponse.ordersResponseList[index].id)
                console.log(response)
                const updatedOrders = [...orderResponse.ordersResponseList];
                updatedOrders[index].status = 1;
                setOrderResponse({ ...orderResponse, ordersResponseList: updatedOrders });

            } catch (error) {
                console.log("error")
            }
        }
        // Update the cart in the backend
        // ...
    };
    const setStatusOrderTwoByIndex = async (index) => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {

            try {

                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await OrderService.setOrderStatus(token, 2, orderResponse.ordersResponseList[index].id)
                console.log(response)
                const updatedOrders = [...orderResponse.ordersResponseList];
                updatedOrders[index].status = 2;
                setOrderResponse({ ...orderResponse, ordersResponseList: updatedOrders });

            } catch (error) {
                console.log("error")
            }
        }
        // Update the cart in the backend
        // ...
    };
    const setStatusOrderThreeByIndex = async (index) => {

        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            try {

                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await OrderService.setOrderStatus(token, 3, orderResponse.ordersResponseList[index].id)
                console.log(response)
                const updatedOrders = [...orderResponse.ordersResponseList];
                updatedOrders[index].status = 3;
                setOrderResponse({ ...orderResponse, ordersResponseList: updatedOrders });

            } catch (error) {
                console.log("error")
            }
        }
        // Update the cart in the backend
        // ...
    };
    const setStatusOrderFourByIndex = async (index) => {

        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            try {

                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await OrderService.setOrderStatus(token, 4, orderResponse.ordersResponseList[index].id)
                console.log(response)
                const updatedOrders = [...orderResponse.ordersResponseList];
                updatedOrders[index].status = 4;
                setOrderResponse({ ...orderResponse, ordersResponseList: updatedOrders });

            } catch (error) {
                console.log("error")
            }
        }
        // Update the cart in the backend
        // ...
    };

    return (
        <div classNameName="" style={{ marginTop: '20px' }}>
            <div className="container">
                <article className="card">
                    <header className="card-header"> <button className={`btn ${status === 0 ? 'text-danger' : ''}`} >Manager Orders</button> / <button className={`btn ${status === 1 ? 'text-danger' : ''}`} onClick={statusOne}>Order confirmed</button> / <button className={`btn ${status === 2 ? 'text-danger' : ''}`} onClick={statusTwo}>Picked by courier</button> / <button className={`btn ${status === 3 ? 'text-danger' : ''}`} onClick={statusThree}>On the way</button> / <button className={`btn ${status === 4 ? 'text-danger' : ''}`} onClick={statusFour}>Ready for pickup</button> </header>
                    <div className="card-body">
                        {orderResponse.ordersResponseList && orderResponse.ordersResponseList.map((item, index) => (
                            <div className="">
                                <h6>Order ID: {item.id}</h6>
                                <article className="card">
                                    <div className="card-body row">
                                        <div className="col"> <strong>Creation time:</strong> <br />{item.createDate} </div>
                                        <div className="col"> <strong>Shipping address:</strong> <br />  {item.shippingAddress} </div>
                                        <div className="col"> <strong>Receiver:</strong> <br /> {item.receiver}, | <i className="fa fa-phone"></i>{item.phone} </div>
                                        <div className="col"> <strong>Shipment #:</strong> <br /> {item.shippingResponse.shippingMethod} (${item.shippingResponse.shippingFee}) </div>
                                        <div className="col"> <strong>Total order #:</strong> <br /> ${item.totalOrder} </div>
                                        <div className="col"> <strong>Total final #:</strong> <br /> ${item.totalOrder + item.shippingResponse.shippingFee} </div>

                                    </div>
                                </article>
                                <div className="track">
                                    <div className={`step ${item.status >= 1 ? 'active' : ''}`} onClick={() => setStatusOrderOneByIndex(index)}> <span className="icon"> <i className="fa fa-check"></i> </span> <span className="text">Order confirmed</span> </div>
                                    <div className={`step ${item.status >= 2 ? 'active' : ''}`} onClick={() => setStatusOrderTwoByIndex(index)} > <span className="icon"> <i className="fa fa-user"></i> </span> <span className="text"> Picked by courier</span> </div>
                                    <div className={`step ${item.status >= 3 ? 'active' : ''}`} onClick={() => setStatusOrderThreeByIndex(index)} > <span className="icon"> <i className="fa fa-truck"></i> </span> <span className="text"> On the way </span> </div>
                                    <div className={`step ${item.status >= 4 ? 'active' : ''}`} onClick={() => setStatusOrderFourByIndex(index)} > <span className="icon"> <i className="fa fa-box"></i> </span> <span className="text">Ready for pickup</span> </div>
                                </div>
                                <hr />
                                <ul className="row">
                                    {item.orderItemResponseList && item.orderItemResponseList.map((item1, index) => (
                                        <li className="col-md-4">
                                            <figure className="itemside mb-3">
                                                <div className="aside"><img src={item1.image} className="img-sm border" /></div>
                                                <figcaption className="info align-self-center">
                                                    <p className="title">{item1.sportswear_name} <strong className="text-danger">x{item1.quantity_ordered}</strong><br /> Size: {item1.size}</p> <span className="text-muted">${item1.totalAmount} </span>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                            </div>
                        ))}
                        <a href="#" className="btn btn-warning" data-abc="true"> <i className="fa fa-chevron-left"></i> Back to orders</a>

                    </div>
                </article>
            </div>
        </div>
    )
}
export default ModuleOrderAdmin;