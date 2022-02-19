import React from 'react';
import { HousingItemProps } from './housing-item.types';
import './housing-item.styles.scss';
import noImage from '../../assets/no-image.png';
import { HeartIcon } from "@heroicons/react/outline";

const HousingItemComponent: React.FC<HousingItemProps> = ({ ...props }) => {
    const { item } = props;
    return (
        <div className="card-component">
            <div className='image-container'>
                <img src={item && item.images ? item.images[0] : noImage} alt="Apartment" />
            </div>

            <div className="info-component">
                <div className='location-container'>
                    <p>{item.city}</p>
                    <HeartIcon className="heart-icon" />
                </div>

                <h4 className="title-heading">{item.title}</h4>

                <div className="border-line"/>

                <p className="description-container">{item.description}</p>

                <div>
                    <p style={{fontSize: "large"}}>{item.price}lv/night</p>
                </div>
            </div>
        </div>
    )
}

export default HousingItemComponent;