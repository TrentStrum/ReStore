import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { setBasket } from "../basket/basketSlice";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import LoadingComponent from "../../app/layout/LoadingComponent";


const stripePromise = loadStripe('pk_test_51NgsM2EMk6RqULCN57RhcG93pWrXSN36afqsPDHKlFPB4EEE1JifUYgBNPN3HULKVMyytyLR8rsMKVG2HiBUFDFg00o4qVMNYV');

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch])

    if (loading) return <LoadingComponent message='Loading checkout...'/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}