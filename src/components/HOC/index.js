import { connect } from "../../lib/helper";

function HOC({ prop1, prop2 }) {
	return (
		<div>
			<h3>HOC example demo</h3>
			<p>
				Its HOC with additional prop named {prop1} and {prop2}
			</p>
		</div>
	);
}

const mapStateToProps = () => ({
	prop1: "prop1",
	prop2: "prop2",
});

export default connect(mapStateToProps)(HOC);
