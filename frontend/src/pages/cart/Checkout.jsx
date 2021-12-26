import React, { useState } from 'react';
import { Login, Signup } from '..';
import { Modal } from '../../components/modal/Modal';
import { MultiStepForm } from '../../components/multiStepForm/MultiStepForm';
import { PageTransition } from '../../helpers/animations';
import classes from './checkout.module.css';

export const Checkout = (props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <PageTransition>
        <div className='container'>
        <h1>Shopping Cart</h1>
            <MultiStepForm cart={props.cart} deleteItemFromCart={props.deleteItemFromCart} login={() => setShowModal(true) }/>
            <div className={classes.delivery}>
                <h1>Estimated delivery time</h1>
            </div>
        </div>

        <Modal modalClosed={() => setShowModal(!showModal)} show={showModal}>
            <Login />
        </Modal>
        </PageTransition>
    )
}
