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
import Button from '../../components/button/Button.es';
import {AppDeploymentContext} from './AppDeploymentContext.es';
import {updateItem, addItem} from '../../utils/client.es';

export default ({
	appId,
	currentStep,
	dataDefinitionId,
	onCancel,
	onCurrentStepChange
}) => {
	const {
		state: {app}
	} = useContext(AppDeploymentContext);

	const {
		dataLayoutId,
		dataListViewId,
		name: {en_US: appName}
	} = app;

	const onDeploy = () => {
		if (appId) {
			updateItem(`/o/app-builder/v1.0/apps/${appId}`, app).then(onCancel);
		} else {
			addItem(
				`/o/app-builder/v1.0/data-definitions/${dataDefinitionId}/apps`,
				app
			).then(onCancel);
		}
	};

	return (
		<div className="card-footer bg-transparent">
			<div className="autofit-row">
				<div className="col-md-4">
					<Button displayType="secondary" onClick={onCancel}>
						{Liferay.Language.get('cancel')}
					</Button>
				</div>
				<div className="col-md-4 offset-md-4 text-right">
					{currentStep > 0 && (
						<Button
							className="mr-3"
							displayType="secondary"
							onClick={() => onCurrentStepChange(currentStep - 1)}
						>
							{Liferay.Language.get('previous')}
						</Button>
					)}
					{currentStep < 2 && (
						<Button
							disabled={
								(currentStep === 0 && !dataLayoutId) ||
								(currentStep === 1 && !dataListViewId)
							}
							displayType="primary"
							onClick={() => onCurrentStepChange(currentStep + 1)}
						>
							{Liferay.Language.get('next')}
						</Button>
					)}
					{currentStep === 2 && (
						<Button
							disabled={!appName}
							displayType="primary"
							onClick={onDeploy}
						>
							{Liferay.Language.get('deploy')}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
