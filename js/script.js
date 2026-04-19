// Wait until the entire page (including images, scripts, etc.) is fully loaded
window.onload = () => {

    // Get the HTML element with the ID "projectContainer"
    const container = document.getElementById("projectContainer");

    // Convert all child elements of the container into an array
    const cards = Array.from(container.children);

    // Loop through each card element
    cards.forEach(card => {
        // Clone each card and append it to the container (duplicates content for seamless scrolling)
        container.appendChild(card.cloneNode(true));
    });

    // Calculate half of the total scrollable width (original + cloned content)
    const totalWidth = container.scrollWidth / 2;

    // Create a GSAP animation that moves the container horizontally
    const tween = gsap.to(container, {
        x: -totalWidth,              // Move container to the left by totalWidth
        duration: 20,                // Animation lasts 20 seconds
        ease: "none",                // Linear animation (constant speed)
        repeat: -1,                  // Repeat infinitely
        modifiers: {
            // Ensures the x value loops seamlessly using modulo
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
    });

    // Pause the animation when the mouse enters the container
    container.addEventListener("mouseenter", () => tween.pause());

    // Resume the animation when the mouse leaves the container
    container.addEventListener("mouseleave", () => tween.resume());

};