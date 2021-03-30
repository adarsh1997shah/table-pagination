export const connect = (callback) => {
	const props = callback();

	return (Component) => {
		return () => <Component {...props} />;
	};
};
