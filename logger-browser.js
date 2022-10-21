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

const getLevels = () => ({
	debug: "debug",
	error: "error",
	info: "info",
	warn: "warn",
});

class LoggerBrowser {
	constructor(level) {
		if (this.#browserDetector()) {
			this.#colors = browserColors;
		} else {
			this.#colors = nodeColor;
		}
		this.#level = level;
		this.levels = getLevels();
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
	static levels = getLevels();
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

	#canSend(level) {
		if (!this.#level || !level) return false;
		if (!this.levels[level]) return false;
		return this.#levels.indexOf(this.#level) >= this.#levels.indexOf(level);
	}

	clear() {
		console.clear();
		return this;
	}

	#format(level, ...messages) {
		if (messages.some((m) => typeof m === "object")) return messages;

		const uppercaseLevel = level.toUpperCase();
		const date = new Date().toISOString();
		const color = this.#colors[level];

		const messageBase = this.#messageFormat
			.replace("%t", date)
			.replace("%l", uppercaseLevel)
			.replace("%m", messages.join(" "));

		if (this.#browserDetector()) {
			return [this.#colors.start + messageBase, color];
		} else {
			return [color + messageBase + this.#colors.end];
		}
	}

	/**
	 * @param messages
	 */
	warn(...messages) {
		this.log(this.levels.warn, ...messages);
	}

	/**
	 * @param messages
	 */
	info(...messages) {
		this.log(this.levels.info, ...messages);
	}

	/**
	 * @param messages
	 */
	debug(...messages) {
		this.log(this.levels.debug, ...messages);
	}

	/**
	 * @param messages
	 */
	error(...messages) {
		this.log(this.levels.error, ...messages);
	}

	/**
	 * @param level {string}
	 * @param messages
	 * @param color {string}
	 */
	log(level, ...messages) {
		if (!this.#canSend(level)) {
			return;
		}

		const formattedMessage = this.#format(level, ...messages);

		console.log(...formattedMessage);
	}
}

module.exports = { LoggerBrowser };
