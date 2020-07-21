import { Divider, Typography } from 'antd';

import React from 'react';
import RequestCenter from '../../component/Forms/MyRequestCenter';
import { connect } from 'react-redux';
const { Title } = Typography;

// @connect(state => state)
class MyRequest extends React.Component {
	onCollapse = collapsed => {
		this.setState({ collapsed });
	};

	render () {
		return (
			<Typography style={{ padding: '15px' }}>
				<Title level={3} style={{ textAlign: 'center' }}>
					My Request Center
				</Title>
				<Divider />
				<RequestCenter></RequestCenter>
			</Typography>
		);
	}
}

export default connect(state => state)(MyRequest);
