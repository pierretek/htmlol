// Load all script snippets on page load
document.addEventListener('DOMContentLoaded', async () => {

	showStartScreen();

	const input = document.getElementById("input");
	const output = document.getElementById("output");

	const commandHistory = [];
	let historyIndex = -1;
	let tempCommand = "";

	input.addEventListener("keydown", function (e) {


		if (e.key === "Enter" && input.value != "") {

			const command = input.value;

			handleInput(command);

			commandHistory.unshift(command);

			if (commandHistory.length > 50) {
				commandHistory.pop();
			}

			historyIndex = -1;
			tempCommand = "";

		} else if (e.key == "ArrowUp") {

			e.preventDefault();

			if (historyIndex < commandHistory.length - 1) {

				if (historyIndex === -1) {
					tempCommand = input.value;
				}

				historyIndex++;

				input.value = commandHistory[historyIndex];
			}

		} else if (e.key == "ArrowDown") {

			e.preventDefault();

			if (historyIndex > -1) {

				historyIndex--;

				if (historyIndex === -1) {
					input.value = tempCommand;
				} else {
					input.value = commandHistory[historyIndex];
				}
			}

		}

	});

});


function handleInput(command) {

	switch (command.toLowerCase()) {
		case "clear":
			showStartScreen();
			break;

		case "help":
			output.innerHTML += helpCommand;
			break;

		default:
			sendCommand(command);
			output.innerHTML += "> " + command + "<br>";
			break;
	}

	input.value = "";
	output.scrollTop = output.scrollHeight;

}

function showStartScreen() {
	output.innerHTML = logoArt +
		"Welcome to the Terminal! Enter your commands below:\n";
}

const logoArt =
	"        _                    _       _          \n" +
	"  _ __ (_) ___ _ __ _ __ ___| |_ ___| | __      \n" +
	" | '_ \\| |/ _ \\ '__| '__/ _ \\ __/ _ \\ |/ /  \n" +
	" | |_) | |  __/ |  | | |  __/ ||  __/   <       \n" +
	" | .__/|_|\\___|_|  |_|  \\___|\\__\\___|_|\\_\\\n" +
	" |_|                                            \n";

const helpCommand =
	"\nFull List of Commands: \n" +
	"\'clear\' ➜ clears the terminal \n";


async function sendCommand(command) {

	try {
		const response = await fetch('/command?cmd=' + encodeURIComponent(command), {
			method: 'POST'
		});

		const data = await response.text();

		if (response.ok) {
			output.innerHTML += `${data}<br>`;
		} else {
			output.innerHTML += `Error: ${response.status}<br>`;
		}

	} catch (error) {
		output.innerHTML += `Connection failed<br>`;
		console.error('Error:', error);
	}

}
