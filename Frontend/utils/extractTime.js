export function extractTime(dateString) {
	const dateobj = new Date(dateString);
    const year= dateobj.getFullYear()
    const month=padZero(dateobj.getMonth())
    const date=padZero(dateobj.getDate())
	const hours = padZero(dateobj.getHours());
	const minutes = padZero(dateobj.getMinutes());
	return `${date}-${month}-${year}, ${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}