const browserColors = {
	debug: "color : #00ffff",
	end: "",
	error: "color : #ff0000",
	info: "color : #ff00ff",
	start: "%c",
	warn: "color : #ffff00",
};

const nodeColor = {
	debug: "\x1b[36m",
	end: "\x1b[0m",
	error: "\x1b[31m",
	info: "\x1b[33m",
	start: "\x1b[2m",
	warn: "\x1b[35m",
};

class LoggerBrowser {
	constructor(level) {
		if (this.#browserDetector()) {
			this.#colors = browserColors;
		} else {
			this.#colors = nodeColor;
		}
		this.#level = level;
		this.levels = {
			debug: "debug",
			error: "error",
			info: "info",
			warn: "warn",
		};
	}
	#colors = {
		debug: "",
		end: "",
		error: "",
		info: "",
		start: "",
		warn: "",
	};
	#level = "";
	#levels = ["error", "warn", "info", "debug"];
	#messageFormat = "[%t] [%l] - [%m]";

	#browserDetector() {
		return (
			typeof process === "undefined" ||
			process.type === "renderer" ||
			process.browser === true ||
			process.__nwjs
		);
	}

	setLevel(level) {
		this.#level = level;
	}
	removeLevel() {
		this.setLevel("");
	}

	#canSend(level, message) {
		if (!this.#level || !message || !level) return false;
		if (!this.levels[level]) return false;
		return this.#levels.indexOf(this.#level) >= this.#levels.indexOf(level);
	}

	clear() {
		console.clear();
		return this;
	}

	#format(message, level) {
		if (typeof message === "object") return [message];

		const uppercaseLevel = level.toUpperCase();
		const date = new Date().toISOString();
		const color = this.#colors[level];

		const messageBase = this.#messageFormat
			.replace("%t", date)
			.replace("%l", uppercaseLevel)
			.replace("%m", message);

		if (this.#browserDetector()) {
			return [this.#colors.start + messageBase, color];
		} else {
			return [color + messageBase + this.#colors.end];
		}
	}

	/**
	 * @param message {string}
	 */
	warn(message) {
		this.log(this.levels.warn, message, this.#colors.warn);
	}

	/**
	 * @param message {string}
	 */
	info(message) {
		this.log(this.levels.info, message, this.#colors.info);
	}

	/**
	 * @param message {string}
	 */
	debug(message) {
		this.log(this.levels.debug, message, this.#colors.debug);
	}

	/**
	 * @param message {string}
	 */
	error(message) {
		this.log(this.levels.error, message, this.#colors.error);
	}

	/**
	 * @param level {string}
	 * @param message {string}
	 * @param color {string}
	 */
	log(level, message) {
		if (!this.#canSend(level, message)) {
			return;
		}

		const formattedMessage = this.#format(message, level);

		console.log(...formattedMessage);
	}
}

module.exports = { LoggerBrowser };
