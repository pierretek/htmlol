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

function downloadContent(event,name) {
	const content = event.target.closest('details').querySelector('.code-snippet').innerText;
	const button = event.target;

	try {
		// Create a blob with the content
		const blob = new Blob([content], { type: 'text/plain' });

		// Create a temporary download link
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = name + '.sk';

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
