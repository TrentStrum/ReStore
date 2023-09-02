import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponents from "../../layout/LoadingComponents";
import { Order } from "../../models/order";
import { currencyFormat } from "../../util/util";
import OrderDetailed from "./OrderDetailed";

export default function Orders() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    useEffect(() => {
        agent.Orders.list()
            .then(orders=> setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);

    if (loading) return <LoadingComponents message='Loading orders...' />

    if (selectedOrderNumber > 0) return (
        <OrderDetailed
            order={orders?.find(o => o.id === selectedOrderNumber)!}
            setSelectedOrder={setSelectedOrderNumber}
        />
    )

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Order Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0} }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                            <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="right">{order.orderStatus}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => setSelectedOrderNumber(order.id)}>
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}