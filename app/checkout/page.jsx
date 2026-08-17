import CheckoutForm from "@/components/CheckoutForm";
import { getPaymentMethods } from "@/lib/api";

export const metadata = {
  title: "Checkout",
  description: "Pay for your one-time-use licenses. No account required.",
};

export default async function CheckoutPage() {
  const paymentMethods = await getPaymentMethods();

  return <CheckoutForm paymentMethods={paymentMethods} />;
}
