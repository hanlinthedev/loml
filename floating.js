function createHeart() {
	const container = document.querySelector(".floating-hearts-container");

	const heart = {
		size: Math.random() * 20 + 10, // 10-30px
		duration: Math.random() * 3 + 6, // 2-5 seconds
		left: Math.random() * 100,
		opacity: Math.random() * 0.7 + 0.3,
	};

	const heartEl = document.createElement("div");
	heartEl.className = "floating-heart";
	Object.assign(heartEl.style, {
		width: `${heart.size}px`,
		height: `${heart.size}px`,
		left: `${heart.left}%`,
		animationDuration: `${heart.duration}s`,
		opacity: heart.opacity,
		fontSize: `${heart.size * 0.7}px`,
	});
	heartEl.textContent = "♥";

	// Remove element after animation
	heartEl.addEventListener("animationend", () => {
		heartEl.remove();
	});

	container.appendChild(heartEl);
}

// Start creating hearts immediately and continuously
window.addEventListener("load", () => {
	// Create hearts more frequently
	setInterval(createHeart, 300);

	// Create initial burst of hearts
	for (let i = 0; i < 15; i++) {
		createHeart();
	}
});
