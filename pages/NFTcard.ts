import React from 'react';
import PropTypes from 'prop-types';
import './NFTCard.css';

const NFTCard = ({ name, price }) => {
  return (
    <div className="nft-card">
      <div className="nft-card-header">
        <h2>{name}</h2>
      </div>
      <div className="nft-card-body">
        <h3>{price} ETH</h3>
      </div>
    </div>
  );
};

NFTCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default NFTCard;
