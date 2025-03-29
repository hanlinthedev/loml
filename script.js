const api = "https://lomlbe.onrender.com/images";
const getImages = async () => {
	const response = await fetch(api, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};

function createFullscreenViewer(url) {
	const viewer = document.createElement("div");
	viewer.style.position = "fixed";
	viewer.style.top = "0";
	viewer.style.left = "0";
	viewer.style.width = "100vw";
	viewer.style.height = "100vh";
	viewer.style.backgroundColor = "rgba(0,0,0,0.9)";
	viewer.style.display = "flex";
	viewer.style.alignItems = "center";
	viewer.style.justifyContent = "center";
	viewer.style.zIndex = "1000";
	viewer.style.cursor = "pointer";

	const closeBtn = document.createElement("button");
	closeBtn.textContent = "×";
	closeBtn.style.position = "absolute";
	closeBtn.style.top = "20px";
	closeBtn.style.right = "30px";
	closeBtn.style.background = "none";
	closeBtn.style.border = "none";
	closeBtn.style.color = "white";
	closeBtn.style.fontSize = "40px";
	closeBtn.style.cursor = "pointer";

	let mediaElement;
	if (url.endsWith(".MOV")) {
		mediaElement = document.createElement("video");
		mediaElement.controls = true;
		mediaElement.style.maxWidth = "90vw";
		mediaElement.style.maxHeight = "90vh";
		mediaElement.src = url;
	} else {
		mediaElement = document.createElement("img");
		mediaElement.style.maxWidth = "90vw";
		mediaElement.style.maxHeight = "90vh";
		mediaElement.style.objectFit = "contain";
		mediaElement.src = url;
	}

	const closeViewer = () => {
		document.body.removeChild(viewer);
		if (mediaElement.tagName === "VIDEO") {
			mediaElement.pause();
		}
	};

	viewer.appendChild(mediaElement);
	viewer.appendChild(closeBtn);
	document.body.appendChild(viewer);

	viewer.addEventListener("click", closeViewer);
	closeBtn.addEventListener("click", closeViewer);
}

function renderMedia(data) {
	const container = document.getElementsByClassName("timeline-container")[0];
	const placeholder = document.getElementsByClassName("placeholder")[0];
	placeholder.style.display = "none";
	// Loop through each date
	Object.entries(data).forEach(([date, urls]) => {
		const containerByDay = document.createElement("div");
		containerByDay.classList.add("byDay");
		// Create date heading

		const dateHeading = document.createElement("h2");
		dateHeading.classList.add("date");
		dateHeading.textContent = date;
		containerByDay.innerHTML += '<i class="fa-solid fa-heart"></i>';
		containerByDay.appendChild(dateHeading);

		const mediaGrid = document.createElement("div");
		mediaGrid.classList.add("media-grid");

		urls.slice(1).forEach((url) => {
			const mediaItem = document.createElement("div");
			mediaItem.style.overflow = "hidden";
			mediaItem.style.borderRadius = "8px";
			mediaItem.style.boxShadow = "0 2px 8px rgba(244, 113, 190, 0.8)";

			if (url.endsWith(".MOV")) {
				const video = document.createElement("video");
				video.controls = true;
				video.style.width = "100px";
				video.style.height = "auto";
				video.style.display = "block";
				video.src = url;
				mediaItem.appendChild(video);
			} else if (url.match(/\.(jpeg|jpg|png|gif)$/)) {
				const img = document.createElement("img");
				img.style.width = "100px";
				img.style.height = "auto";
				img.style.display = "block";
				img.src = url;
				img.loading = "lazy";
				mediaItem.appendChild(img);
			}

			mediaItem.addEventListener("click", (e) => {
				e.stopPropagation();
				createFullscreenViewer(url);
			});
			mediaGrid.appendChild(mediaItem);
			containerByDay.appendChild(mediaGrid);
		});

		container.appendChild(containerByDay);
	});
}
getImages().then((images) => {
	renderMedia(images);
});
