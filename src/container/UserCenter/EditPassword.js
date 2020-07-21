import EditPasswordForm from '../../component/UserCenter/EditPassword';
import React from 'react';
import { Typography } from 'antd';
const Paragraph = Typography;

export const EditPassword = () => {
	return (
		<div>
			<Paragraph className='title-middle'>
				<h3>Edit Profile</h3>
			</Paragraph>
			<EditPasswordForm></EditPasswordForm>
		</div>
	);
};
