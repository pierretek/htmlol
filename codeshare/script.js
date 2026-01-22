async function copyContent(event) {

	const content = event.target.closest('details').querySelector('.code-snippet').innerText;
	const button = event.target;

	try {
		await navigator.clipboard.writeText(content);
		button.textContent = '✓';
		button.classList.add('copied');

		setTimeout(() => {
			button.textContent = 'Copy';
			button.classList.remove('copied');
		}, 2000);
	} catch (err) {
		console.error('Failed to copy:', err);
		alert('Failed to copy to clipboard');
	}
}

async function downloadContent(event) {
	const detailsElement = event.target.closest('details');
	const scriptPath = detailsElement.getAttribute('data-script');
	const button = event.target;

	try {
		// If there's a script path, fetch and download it directly
		const response = await fetch(scriptPath);
		const content = await response.text();

		// Extract filename from the script path
		const filename = scriptPath.split('/').pop();

		// Create a blob with the fetched content
		const blob = new Blob([content], { type: 'text/plain' });

		// Create a temporary download link
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;

		// Trigger the download
		document.body.appendChild(a);
		a.click();

		// Clean up
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		// Update button text
		button.textContent = '✓';

		setTimeout(() => {
			button.textContent = 'Download';
		}, 2000);
	} catch (err) {
		console.error('Failed to download:', err);
		alert('Failed to download file');
	}
}


// Load all script snippets on page load
document.addEventListener('DOMContentLoaded', async () => {
	const details = document.querySelectorAll('details[data-script]');

	for (const detail of details) {
		const scriptPath = detail.getAttribute('data-script');
		const codeElement = detail.querySelector('.code-snippet code');

		try {
			const response = await fetch(scriptPath);
			const content = await response.text();
			codeElement.textContent = content;
		} catch (error) {
			codeElement.textContent = 'Error loading script file';
			console.error('Failed to load:', scriptPath, error);
		}
	}
});
