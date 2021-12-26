import React, { useState } from 'react';
import { Modal } from '../../components/modal/Modal';
import { MultiStepForm } from '../../components/multiStepForm/MultiStepForm';
import { PageTransition } from '../../helpers/animations';

export const Checkout = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <PageTransition>
        <div className='container'>
            <MultiStepForm />
        </div>



        
        <Modal modalClosed={() => setShowModal(!showModal)} show={showModal}>
            d
        </Modal>
        </PageTransition>
    )
}
