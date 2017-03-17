import React, {PropTypes} from 'react';
import TermsOfUseModal from '../components/TermsOfUse/TermsOfUseModal';

const App = (props) => (
	<div>
		{props.children}
		<TermsOfUseModal />
	</div>
);

App.propTypes = {
	children: PropTypes.object
};

export default App;
