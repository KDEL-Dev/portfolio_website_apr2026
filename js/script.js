window.onload = () => {
    const container = document.getElementById("projectContainer");

    const cards = Array.from(container.children);

    cards.forEach(card => {
        container.appendChild(card.cloneNode(true));
    });

    const totalWidth = container.scrollWidth / 2;

    const tween = gsap.to(container, {
        x: -totalWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
    });


    container.addEventListener("mouseenter", () => tween.pause());
    container.addEventListener("mouseleave", () => tween.resume());








};