import React from 'react'

function Timeslots(props) {
	const timeslots = props.timeslotdata
	return (
		<div className="container" style={{ maxWidth: '720px' }}>
			{timeslots.map((time) => (
				<button id={time.id} type="button" className="btn btn-block timeButton">
					<p>
						{time.time}
						<br />
						{time.booked}
					</p>
				</button>
			))}
		</div>
	)
}

export default Timeslots
