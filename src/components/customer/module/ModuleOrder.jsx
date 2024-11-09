import { useContext, useEffect, useState } from "react";
import { PaginationContext } from "../../../context/PaginationContext";
import OrderService from "../../service/OrderService";

function ModuleOrder() {
    const { noPage, setNoPage, totalPage, setTotalPage } = useContext(PaginationContext);
    const [orderResponse, setOrderResponse] = useState([]);

    const [status, setStatus] = useState(1);

    const statusOne = () => {
        setStatus(1) // Navigate to the details page
    };
    const statusTwo = () => {
        setStatus(2) // Navigate to the details page
    };
    useEffect(() => {

        fetchSportswear();
    }, [noPage, totalPage, status]);
    const fetchSportswear = async () => {
        try {

            const token = localStorage.getItem('token');
            const response = await OrderService.getAllOrderForCustomerByStatus(token, status, noPage)
            setOrderResponse(response)
            console.log(response)

        } catch (error) {
            console.log('Error fetching users:');
        }
    };
    return (
        <div classNameName="" style={{ marginTop: '20px' }}>
            <div className="container">
                <article className="card">
                    <header className="card-header">  <button className="btn" >My orders</button> / <button className={`btn ${status === 1 ? 'text-danger' : ''}`} onClick={statusOne} >Pending Orders</button> / <button className={`btn ${status === 2 ? 'text-danger' : ''}`} onClick={statusTwo} >Completed Orders</button></header>
                    <div className="card-body">
                        {orderResponse.ordersResponseList && orderResponse.ordersResponseList.map((item, index) => (
                            <div className="">
                                <h6>Order ID: {item.id}</h6>
                                <article className="card">
                                    <div className="card-body row">
                                        <div className="col"> <strong>Creation time:</strong> <br />{item.createDate} </div>
                                        <div className="col"> <strong>Shipping BY:</strong> <br /> BLUEDART, | <i className="fa fa-phone"></i> +1598675986 </div>
                                        <div className="col"> <strong>Status:</strong> <br /> Picked by the courier </div>
                                        <div className="col"> <strong>Tracking #:</strong> <br /> BD045903594059 </div>
                                    </div>
                                </article>
                                <div className="track">
                                    <div className={`step ${item.status >= 1 ? 'active' : ''}`}> <span className="icon"> <i className="fa fa-check"></i> </span> <span className="text">Order confirmed</span> </div>
                                    <div className={`step ${item.status >= 2 ? 'active' : ''}`}> <span className="icon"> <i className="fa fa-user"></i> </span> <span className="text"> Picked by courier</span> </div>
                                    <div className={`step ${item.status >= 3 ? 'active' : ''}`}> <span className="icon"> <i className="fa fa-truck"></i> </span> <span className="text"> On the way </span> </div>
                                    <div className={`step ${item.status >= 4 ? 'active' : ''}`}> <span className="icon"> <i className="fa fa-box"></i> </span> <span className="text">Ready for pickup</span> </div>
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
export default ModuleOrder;