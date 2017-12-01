import React from 'react';
import PropTypes from 'prop-types';

import RentalDetails from 'components/RentalDetails';
import { RatingForm } from 'components/RatingForm';
import Loader from 'components/Loader';

const RentalConfirmation = ({
    content,
    rental,
    loader,
    actions
}) => {

    if (loader) return <Loader/>;

    const { cancelRental } = actions;
    const { sportingGood = {} } = rental;

    const rentalControls = () => {
      return (
        <button className="cancel btn btn-danger pull-right" onClick={ () => cancelRental(rental, history => {
          history.push('/owner/schedule');
        }) }>Cancel Rental</button>
      )
    }

    return (
      <div className="container reduce-margin-top rental-confirmation-wrapper">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <h3>{ content.rentals.confirmed_title }</h3>
            <h5>{ content.rentals.confirmed_details }</h5>
          </div>
          <div className="col-xs-12 col-md-6">
             { rental.isComplete ? <RatingForm title={ `How was ${ sportingGood.title }?` }/> : rentalControls() }
          </div>
        </div>
        <br/>
        <RentalDetails rental={ rental }/>
      </div>
    )

}

RentalConfirmation.propTypes = {
    rental: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    loader: PropTypes.bool.isRequired
}

export default RentalConfirmation;
