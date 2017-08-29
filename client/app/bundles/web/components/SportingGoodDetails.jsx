import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';
import Slider from 'react-slick';

// import EventCalendar from 'react-event-calendar';
import BigCalendar from 'react-big-calendar';

const SportingGoodDetails = ({
	sportingGood,
	selectRental,
	rent,
	rentals = [],
	rental = {},
}) => {

	const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

	const images = sportingGood.images || [];

	// Rentals
	rentals.push(rental)

    return (
        <section className="container">

            <Link to="/sporting_goods" className="pull-right">Go Back</Link>

			<div className="col-xs-7">
				<h3>{ sportingGood.title }</h3>
				<h4>{ sportingGood.model }</h4>
				<p>{ sportingGood.description }</p>
			</div>

			<div className="col-xs-5">
				 <Slider {...settings}>
				 	{
						images.map((image, index) => {
							if (image) {
								return <img key={ `${ sportingGood.slug }_image_${ index }` } src={ image.file.url }/>
							}
						})
					}
				 </Slider>
			</div>

			<div className="col-xs-12">
				<BigCalendar
					events={ rentals }
					selectable
					views={ ['month', 'agenda'] }
					onSelectSlot={ selectRental }
				/>
			</div>

			<div className="col-xs-12">
				<button className="btn btn-success" onClick={ rent }>Rent</button>
			</div>

        </section>
    );

}

SportingGoodDetails.propTypes = {
    sportingGood: PropTypes.object.isRequired,
	rent: PropTypes.func.isRequired,
	rental: PropTypes.object.isRequired,
	rentals: PropTypes.array.isRequired,
	selectRental: PropTypes.func
}

export default SportingGoodDetails;
