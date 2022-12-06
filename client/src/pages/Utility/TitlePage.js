import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TitlePage = () => {
    const navigate = useNavigate();

    const location = useSelector((state) => state.cart.location);

    useEffect(() => {
        if(!location) {
            navigate('/location');
        } else {
            navigate(`/location/${location}`);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment></React.Fragment>
    );
};

export default TitlePage;