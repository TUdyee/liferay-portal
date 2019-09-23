/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import React, {useContext} from 'react';
import {AppDeploymentContext} from './AppDeploymentContext.es';
import ProductMenuSettings from './ProductMenuSettings.es';
import ToggleSwitch from '../../components/toggle-switch/ToggleSwitch.es';

export default () => {
	const {
		state: {
			app: {appDeployments}
		},
		dispatch
	} = useContext(AppDeploymentContext);

	const productMenu = appDeployments.find(
		deployment => deployment.type === 'productMenu'
	);

	return (
		<>
			<div className="autofit-row pl-4 pr-4 mb-4">
				<div className="autofit-col-expand">
					<h2>{`${Liferay.Language.get('deploy-as')}...`}</h2>
				</div>
			</div>

			<div className="autofit-row pl-4 pr-4 mb-4">
				<div className="autofit-col-expand">
					<section className="autofit-section">
						<p className="list-group-title">
							<h3>{Liferay.Language.get('product-menu')}</h3>
						</p>
						<p className="list-group-subtext">
							<small>
								{Liferay.Language.get(
									'deploy-to-the-control-panel-or-a-site-menu'
								)}
							</small>
						</p>
					</section>
				</div>

				<div className="autofit-col right">
					<ToggleSwitch
						checked={!!productMenu}
						onChange={checked => {
							if (checked) {
								dispatch({
									deploymentType: 'productMenu',
									type: 'ADD_DEPLOYMENT'
								});
							} else {
								dispatch({
									deploymentType: 'productMenu',
									type: 'REMOVE_DEPLOYMENT'
								});
							}
						}}
					/>
				</div>
			</div>

			<ProductMenuSettings />

			<div className="autofit-row pl-2 pr-2">
				<div className="col-md-12">
					<h4 className="card-divider"></h4>
				</div>
			</div>
		</>
	);
};
