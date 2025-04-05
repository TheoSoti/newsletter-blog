export default function Card() {
	return (
		<section className="card-container">
			<div className="card">
				<div className="card__avatar">
					<img
						src="https://doodleipsum.com/240x240/avatar?i=8ea4626088daa443e5a3d13e1658f832"
						alt="Avatar"
						width="120"
						height="120"
					/>
				</div>
				<div className="card__info">
					<p className="card__name">John Doe</p>
					<p className="card__tagline">Web Developer</p>
				</div>
				<div className="card__actions">
					<a href="#" className="card__button button">
						View Profile
					</a>
					<a href="#" className="card__button button button--reverse">
						Message
					</a>
				</div>
			</div>
		</section>
	);
}
