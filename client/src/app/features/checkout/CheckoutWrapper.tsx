import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponents from "../../layout/LoadingComponents";

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

    if (loading) return <LoadingComponents message='Loading checkout...'/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}