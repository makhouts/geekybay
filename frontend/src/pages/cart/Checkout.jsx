import React, { useState } from 'react';
import { Signup } from '..';
import { Modal } from '../../components/modal/Modal';
import { MultiStepForm } from '../../components/multiStepForm/MultiStepForm';
import { PageTransition } from '../../helpers/animations';

export const Checkout = (props) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <PageTransition>
        <div className='container'>
        <h1>Shopping Cart</h1>
            <MultiStepForm cart={props.cart}/>
        </div>




        <Modal modalClosed={() => setShowModal(!showModal)} show={showModal}>
            <Signup />
        </Modal>
        </PageTransition>
    )
}
