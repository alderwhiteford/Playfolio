import { useEffect, useState } from "react";

export default function useCursor() {
    const [cursorOver, setCursorOver] = useState(false);
    const cursorEnter = () => setCursorOver(true);
    const cursorLeave = () => setCursorOver(false)

    // Handle circle cursor:
    useEffect(() => {
        const circleElement = document.getElementById('circle-cursor') as HTMLElement;
        const mouse = { x: 0, y: 0}
        const previousMouse = { x: 0, y: 0 }
        const circle = { x: 0, y: 0}
    
        window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        });
    
        const speed = 0.17;
    
        const tick = () => {
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;
    
        // Handle scaling:
        const deltaMouseX = mouse.x - previousMouse.x;
        const deltaMouseY = mouse.y - previousMouse.y;
        previousMouse.x = mouse.x
        previousMouse.y = mouse.y
    
        const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2), 150) * 4;
        const scaleVelocity = (mouseVelocity / 150);

        // Handle the rotation angle of the mouse:
        const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

        // Handle the transformations:
        const translateTransform = `translate(${circle.x}px, ${circle.y}px)`
        const scaleTransform = `scale(${1 + scaleVelocity}, ${1 - scaleVelocity})`
        const angleTransoform = `rotate(${angle}deg)`

        circleElement.style.transform = `${translateTransform} ${angleTransoform} ${scaleTransform}`
    
        window.requestAnimationFrame(tick)
        }
    
        tick();
    }, [])

    return { cursorOver, cursorEnter, cursorLeave}
}