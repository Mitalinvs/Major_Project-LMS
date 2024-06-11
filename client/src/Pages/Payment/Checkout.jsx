import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import HomeLayout from "../../Layouts/HomeLayout";

function Checkout()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }
    async function handleSubscription(e) {
        e.preventDefault();
        if(!razorpayKey || !subscription_id) {
            toast.error("Something went wrong");
            return;
        }
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
            theme: {
                color: '#F37254'
            },
            
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment successfull");

                const res = await dispatch(verifyUserPayment(paymentDetails));
                // console.log(res);
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }
    useEffect(() => {
        load();
    }, []);
    return(
        <HomeLayout>
            

        </HomeLayout>

    )


}

export default Checkout;