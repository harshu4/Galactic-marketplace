import React from 'react';
import PropTypes from 'prop-types';

const NFTCard = ({ name, price, currency }) => {
    return ( <
        div className = "nft-card" >
        <
        div className = "nft-card-header" >
        <
        h2 > { name } < /h2> < /
        div > <
        div className = "nft-card-body" >
        <
        h3 > { price } { currency } < /h3> < /
        div > <
        div className = "nft-card-footer" >
        <
        /
        div > <
        /div>
    );
};

NFTCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default NFTCard;