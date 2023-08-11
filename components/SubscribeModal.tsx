'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Price, ProductWithPrice } from '@/types';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useUser } from '@/hooks/useUser';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';

interface Props {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0,
    }).format((price?.unit_amount ?? 0) / 100);

const SubscribeModal: React.FC<Props> = ({ products }) => {
    const subscribeModal = useSubscribeModal();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const { user, isLoading, subscription } = useUser();

    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModal.onClose();
        }
    };

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('You must be logged in to subscribe.');
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            return toast.error('You are already subscribed.');
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price },
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    let content = <div className="text-center">No products available.</div>;

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return <div key={product.id}>No prices available.</div>;
                    }

                    return product.prices.map((price) => (
                        <Button
                            className="mb-4"
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            key={price.id}
                        >{`Subscribe for ${formatPrice(price)} a ${price.interval}`}</Button>
                    ));
                })}
            </div>
        );
    }

    if (subscription) {
        content = <div className="text-center">You are already subscribed.</div>;
    }

    return (
        <Modal
            title="Only for premium users"
            description="Listen to music with Spotify Premium"
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    );
};

export default SubscribeModal;
