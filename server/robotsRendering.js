import fs from 'fs';
import path from 'path';
import api from './api';

const ROBOTS_TEMPLATE_PATH = 'public/robots.template';

const robotsRendering = async (req, res) => {
    const settingsResponse = await api.settings.getSettings();
	fs.readFile(path.resolve(ROBOTS_TEMPLATE_PATH), 'utf8', (err, data) => {
		if (err) {
			res.status(500).end();
		} else {
			const robots = data.replace(/{domain}/g, settingsResponse.data.domain);
			res.header('Content-Type', 'text/plain');
			res.send(robots);
		}
	});
};

export default robotsRendering;
